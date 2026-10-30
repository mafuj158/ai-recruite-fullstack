import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { generateAccessToken, safeVerifyRefreshToken } from "@/lib/jwt";
import { AUTH_COOKIES } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    // 1. Get refresh token from cookie or request body (support both browser and server/Postman callers)
    const body = (await req.json().catch(() => null)) as { refreshToken?: string } | null;
    const refreshToken =
      req.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value ||
      body?.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Refresh token is missing",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // 2. Safely verify the refresh token
    const payload = safeVerifyRefreshToken(refreshToken);
    if (!payload || !payload.user_id) {
      const response = NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Refresh token is expired or invalid",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );

      // Clear cookies on invalid refresh token
      response.cookies.delete(AUTH_COOKIES.ACCESS_TOKEN);
      response.cookies.delete(AUTH_COOKIES.REFRESH_TOKEN);
      response.cookies.delete(AUTH_COOKIES.IS_LOGGED_IN);

      return response;
    }

    // 3. Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: payload.user_id },
      select: {
        id: true,
        email: true,
        role: true,
        isOnboarded: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: User not found",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // 4. Generate new access token
    const newAccessToken = generateAccessToken({
      user_id: user.id,
      email: user.email,
      role: user.role,
      isOnboarded: user.isOnboarded,
    });

    // 5. Build success response
    const response = NextResponse.json(
      {
        success: true,
        message: "Token refreshed successfully",
        data: {
          tokens: {
            access_token: newAccessToken,
          },
        },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );

    // 6. Set new access token cookie
    const isProduction = process.env.NODE_ENV === "production";
    const accessTokenMaxAge = process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE
      ? parseInt(process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE, 10)
      : 15 * 60; // 15 mins default

    response.cookies.set({
      name: AUTH_COOKIES.ACCESS_TOKEN,
      value: newAccessToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenMaxAge,
    });

    // Keep session flag active
    response.cookies.set({
      name: AUTH_COOKIES.IS_LOGGED_IN,
      value: "true",
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("[POST /api/auth/refresh] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during token refresh",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

