import { NextRequest, NextResponse } from "next/server";
import { safeVerifyToken } from "@/lib/jwt";
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

  // 1. Get access token from HTTP-only cookie
  const cookieName =
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "ai_recruite_access_token";
  const token = request.cookies.get(cookieName)?.value;

  // 2. Safely verify token payload
  const payload = token ? safeVerifyToken(token) : null;
  const isAuthenticated = !!payload;

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
      return NextResponse.redirect(new URL(destination, baseUrl));
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
      return NextResponse.redirect(new URL(properPath, baseUrl));
    }

    // Onboarding check: If not onboarded, redirect to candidate onboarding
    if (!payload.isOnboarded) {
      return NextResponse.redirect(new URL("/onboarding/candidate", baseUrl));
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
      return NextResponse.redirect(new URL(properPath, baseUrl));
    }

    // Onboarding check: If not onboarded, redirect to employer onboarding
    if (!payload.isOnboarded) {
      return NextResponse.redirect(new URL("/onboarding/employer", baseUrl));
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
      return NextResponse.redirect(new URL("/onboarding/candidate", baseUrl));
    }

    // If employer visits candidate onboarding
    if (
      pathname.startsWith("/onboarding/candidate") &&
      payload.role !== USER_ROLES.CANDIDATE
    ) {
      return NextResponse.redirect(new URL("/onboarding/employer", baseUrl));
    }

    // If already onboarded, send to their active dashboard
    if (payload.isOnboarded) {
      const dashboardPath =
        payload.role === USER_ROLES.EMPLOYER
          ? "/employer/dashboard"
          : "/candidate/dashboard";
      return NextResponse.redirect(new URL(dashboardPath, baseUrl));
    }
  }

  // Forward user headers for authenticated requests
  const response = NextResponse.next();
  if (isAuthenticated && payload) {
    response.headers.set("x-user-id", payload.user_id);
    response.headers.set("x-user-email", payload.email);
    response.headers.set("x-user-role", payload.role);
  }

  return response;
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
