import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validation
    if (!email || !password) {
      return errorResponse("Email and password are required.", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Find user in Neon DB
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      return errorResponse("Invalid email or password.", 401);
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return errorResponse("Invalid email or password.", 401);
    }

    // 4. Check email verification status
    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_NOT_VERIFIED",
          message: "Please verify your email address before logging in.",
        },
        { status: 403 }
      );
    }

    // 5. Successful login payload
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      isOnboarded: user.isOnboarded,
      name:
        user.role === "EMPLOYER"
          ? user.employerProfile?.hrName
          : user.candidateProfile?.fullName,
      companyName: user.employerProfile?.companyName,
    };

    return successResponse(userData, "Logged in successfully!", 200);
  } catch (err: unknown) {
    console.error("[POST /api/auth/login] Error:", err);
    return errorResponse("Internal server error. Please try again later.", 500);
  }
}
