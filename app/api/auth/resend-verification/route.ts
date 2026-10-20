import { NextRequest } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return errorResponse("Email address is required.", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      return errorResponse("No account found with this email address.", 404);
    }

    if (user.isEmailVerified) {
      return errorResponse("This email is already verified. You can log in directly.", 400);
    }

    // Generate new token & 24h expiration
    const newToken = crypto.randomBytes(32).toString("hex");
    const newExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifyToken: newToken,
        emailVerifyExpires: newExpires,
      },
    });

    const displayName =
      user.role === "EMPLOYER"
        ? user.employerProfile?.hrName || "Recruiter"
        : user.candidateProfile?.fullName || "Candidate";

    await sendVerificationEmail({
      to: normalizedEmail,
      name: displayName,
      token: newToken,
    });

    return successResponse(
      null,
      "Verification email resent successfully! Please check your inbox.",
      200
    );
  } catch (err: unknown) {
    console.error("[POST /api/auth/resend-verification] Error:", err);
    return errorResponse("Failed to resend verification email. Please try again.", 500);
  }
}
