import { NextResponse } from "next/server";
import httpStatus from "http-status";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );

    const isProduction = process.env.NODE_ENV === "production";
    const accessTokenCookieName =
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "ai_recruite_access_token";
    const refreshTokenCookieName =
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "ai_recruite_refresh_token";

    // Expire access token cookie
    response.cookies.set({
      name: accessTokenCookieName,
      value: "",
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    // Expire refresh token cookie
    response.cookies.set({
      name: refreshTokenCookieName,
      value: "",
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("[POST /api/auth/logout] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
