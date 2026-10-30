import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { safeVerifyToken } from "@/lib/jwt";
import { AuthUser } from "@/types";
import { AUTH_COOKIES } from "@/constants";

export async function GET(req: NextRequest) {
  try {
    // 1. Get access token from cookie or Authorization header
    const token =
      req.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Missing authentication token",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // 2. Verify token
    const payload = safeVerifyToken(token);
    if (!payload || !payload.user_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Invalid or expired token",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // 3. Fetch user with profiles from database
    const user = await prisma.user.findUnique({
      where: { id: payload.user_id },
      include: {
        candidateProfile: {
          include: {
            jobRole: { select: { id: true, label: true, value: true } },
            industry: { select: { id: true, label: true, value: true } },
            skills: { select: { id: true, label: true, value: true } },
          },
        },
        employerProfile: {
          include: {
            industry: { select: { id: true, label: true, value: true } },
            rolesHiringFor: { select: { id: true, label: true, value: true } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          status: httpStatus.NOT_FOUND,
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    // 4. Sanitize user data
    const sanitizedUser: AuthUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isOnboarded: user.isOnboarded,
      candidateProfile: user.candidateProfile,
      employerProfile: user.employerProfile,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: "User profile fetched successfully",
        data: sanitizedUser,
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );
  } catch (error) {
    console.error("[GET /api/auth/me] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
