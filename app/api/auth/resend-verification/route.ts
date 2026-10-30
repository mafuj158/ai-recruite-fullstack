import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as { email?: string } | null;
    const email = body?.email?.toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email address",
          status: httpStatus.NOT_FOUND,
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "This email address is already verified. You can log in.",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    // Generate new token & 24h expiry
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifyToken: verificationToken,
        emailVerifyExpires: verificationExpires,
      },
    });

    const displayName =
      user.candidateProfile?.fullName ||
      user.employerProfile?.fullName ||
      user.employerProfile?.companyName ||
      "User";

    await sendVerificationEmail({
      to: user.email,
      name: displayName,
      token: verificationToken,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Verification email resent successfully. Please check your inbox.",
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );
  } catch (error) {
    console.error("[POST /api/auth/resend-verification] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to resend verification email. Please try again later.",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
