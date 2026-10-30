import { NextRequest, NextResponse } from "next/server";
import { safeVerifyToken, safeVerifyRefreshToken, generateAccessToken } from "@/lib/jwt";
import { USER_ROLES } from "@/constants";

// Routes accessible only when NOT logged in
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/register/candidate",
  "/register/employer",
  "/forgot-password",
];

// Routes requiring CANDIDATE role
const CANDIDATE_PROTECTED_PREFIX = "/candidate";

// Routes requiring EMPLOYER role
const EMPLOYER_PROTECTED_PREFIX = "/employer";

// Onboarding route prefixes
const ONBOARDING_PREFIX = "/onboarding";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const baseUrl = request.nextUrl.origin;

  // 1. Get access token & refresh token from HTTP-only cookies
  const cookieName =
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "ai_recruite_access_token";
  const refreshCookieName =
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "ai_recruite_refresh_token";

  const token = request.cookies.get(cookieName)?.value;
  const refreshToken = request.cookies.get(refreshCookieName)?.value;

  // 2. Safely verify access token payload
  let payload = token ? safeVerifyToken(token) : null;
  let newAccessToken: string | null = null;

  // 3. If access token is expired or invalid, attempt silent refresh using refresh token
  if (!payload && refreshToken) {
    const refreshPayload = safeVerifyRefreshToken(refreshToken);
    if (refreshPayload && refreshPayload.user_id) {
      payload = refreshPayload;
      newAccessToken = generateAccessToken({
        user_id: refreshPayload.user_id,
        email: refreshPayload.email,
        role: refreshPayload.role,
        isOnboarded: refreshPayload.isOnboarded,
      });
    }
  }

  // User is authenticated ONLY if either access token or refresh token was valid
  const isAuthenticated = !!payload;

  // Helper to attach renewed access token cookie to responses
  const attachCookieIfRenewed = (res: NextResponse) => {
    if (newAccessToken) {
      const isProduction = process.env.NODE_ENV === "production";
      const accessTokenMaxAge = process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE
        ? parseInt(process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE, 10)
        : 15 * 60; // 15 mins default

      res.cookies.set({
        name: cookieName,
        value: newAccessToken,
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: accessTokenMaxAge,
      });
    }
    return res;
  };

  // Helper to determine destination based on user role and onboarding status
  const getRoleDefaultPath = (role: string, isOnboarded?: boolean) => {
    if (!isOnboarded) {
      if (role === USER_ROLES.EMPLOYER) return "/onboarding/employer";
      if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
      return "/onboarding/candidate";
    }

    if (role === USER_ROLES.EMPLOYER) return "/employer/dashboard";
    if (role === USER_ROLES.ADMIN) return "/admin/dashboard";
    return "/candidate/dashboard";
  };

  // -------------------------------------------------------------
  // CASE 1: Logged-in user trying to access Auth Pages (/login, /register, etc.)
  // -------------------------------------------------------------
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute) {
    if (isAuthenticated && payload) {
      const destination = getRoleDefaultPath(payload.role, payload.isOnboarded);
      return attachCookieIfRenewed(NextResponse.redirect(new URL(destination, baseUrl)));
    }
    return NextResponse.next();
  }

  // -------------------------------------------------------------
  // CASE 2: Candidate Portal Protection (/candidate/*)
  // -------------------------------------------------------------
  if (pathname.startsWith(CANDIDATE_PROTECTED_PREFIX)) {
    if (!isAuthenticated || !payload) {
      const redirectUrl = new URL("/login", baseUrl);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Role check: If not Candidate, redirect to user's own portal
    if (payload.role !== USER_ROLES.CANDIDATE) {
      const properPath = getRoleDefaultPath(payload.role, payload.isOnboarded);
      return attachCookieIfRenewed(NextResponse.redirect(new URL(properPath, baseUrl)));
    }

    // Onboarding check: If not onboarded, redirect to candidate onboarding
    if (!payload.isOnboarded) {
      return attachCookieIfRenewed(NextResponse.redirect(new URL("/onboarding/candidate", baseUrl)));
    }
  }

  // -------------------------------------------------------------
  // CASE 3: Employer Portal Protection (/employer/*)
  // -------------------------------------------------------------
  if (pathname.startsWith(EMPLOYER_PROTECTED_PREFIX)) {
    if (!isAuthenticated || !payload) {
      const redirectUrl = new URL("/login", baseUrl);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Role check: If not Employer, redirect to user's own portal
    if (payload.role !== USER_ROLES.EMPLOYER) {
      const properPath = getRoleDefaultPath(payload.role, payload.isOnboarded);
      return attachCookieIfRenewed(NextResponse.redirect(new URL(properPath, baseUrl)));
    }

    // Onboarding check: If not onboarded, redirect to employer onboarding
    if (!payload.isOnboarded) {
      return attachCookieIfRenewed(NextResponse.redirect(new URL("/onboarding/employer", baseUrl)));
    }
  }

  // -------------------------------------------------------------
  // CASE 4: Onboarding Routes Protection (/onboarding/*)
  // -------------------------------------------------------------
  if (pathname.startsWith(ONBOARDING_PREFIX)) {
    if (!isAuthenticated || !payload) {
      const redirectUrl = new URL("/login", baseUrl);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If candidate visits employer onboarding
    if (
      pathname.startsWith("/onboarding/employer") &&
      payload.role !== USER_ROLES.EMPLOYER
    ) {
      return attachCookieIfRenewed(NextResponse.redirect(new URL("/onboarding/candidate", baseUrl)));
    }

    // If employer visits candidate onboarding
    if (
      pathname.startsWith("/onboarding/candidate") &&
      payload.role !== USER_ROLES.CANDIDATE
    ) {
      return attachCookieIfRenewed(NextResponse.redirect(new URL("/onboarding/employer", baseUrl)));
    }

    // If already onboarded, send to their active dashboard
    if (payload.isOnboarded) {
      const dashboardPath =
        payload.role === USER_ROLES.EMPLOYER
          ? "/employer/dashboard"
          : "/candidate/dashboard";
      return attachCookieIfRenewed(NextResponse.redirect(new URL(dashboardPath, baseUrl)));
    }
  }

  // -------------------------------------------------------------
  // Forward request with updated headers/cookies for downstream RSC
  // -------------------------------------------------------------
  const requestHeaders = new Headers(request.headers);
  if (newAccessToken) {
    request.cookies.set(cookieName, newAccessToken);
    requestHeaders.set("cookie", request.cookies.toString());
  }

  if (isAuthenticated && payload) {
    requestHeaders.set("x-user-id", payload.user_id);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return attachCookieIfRenewed(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API route handlers)
     * - _next/static (static build assets)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - static image/font extensions (.svg, .png, .jpg, .jpeg, .gif, .webp, .woff, .woff2)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)",
  ],
};
