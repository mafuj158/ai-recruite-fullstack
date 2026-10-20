import { NextRequest } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role, fullName, hrName, companyName } = body;

    // 1. Common input validation
    if (!email || !password || !role) {
      return errorResponse("Email, password, and role are required.", 400);
    }

    if (password.length < 6) {
      return errorResponse("Password must be at least 6 characters long.", 400);
    }

    if (role !== "CANDIDATE" && role !== "EMPLOYER") {
      return errorResponse("Role must be either CANDIDATE or EMPLOYER.", 400);
    }

    // 2. Role-specific validation
    if (role === "EMPLOYER" && (!hrName?.trim() || !companyName?.trim())) {
      return errorResponse("HR Name and Company Name are required for employers.", 400);
    }

    if (role === "CANDIDATE" && !fullName?.trim()) {
      return errorResponse("Full Name is required for candidates.", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 3. Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return errorResponse("An account with this email already exists.", 409);
    }

    // 4. Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 5. Generate secure email verification token (valid for 24 hours)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const displayName =
      role === "EMPLOYER" ? hrName.trim() : fullName.trim();

    // 6. Create User and Role-specific Profile in Neon PostgreSQL
    let user;
    if (role === "EMPLOYER") {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: "EMPLOYER",
          isEmailVerified: false,
          emailVerifyToken: verificationToken,
          emailVerifyExpires: verificationExpires,
          employerProfile: {
            create: {
              hrName: hrName.trim(),
              companyName: companyName.trim(),
            },
          },
        },
        select: {
          id: true,
          email: true,
          role: true,
          isEmailVerified: true,
          isOnboarded: true,
          createdAt: true,
          employerProfile: {
            select: {
              id: true,
              hrName: true,
              companyName: true,
            },
          },
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: "CANDIDATE",
          isEmailVerified: false,
          emailVerifyToken: verificationToken,
          emailVerifyExpires: verificationExpires,
          candidateProfile: {
            create: {
              fullName: fullName.trim(),
            },
          },
        },
        select: {
          id: true,
          email: true,
          role: true,
          isEmailVerified: true,
          isOnboarded: true,
          createdAt: true,
          candidateProfile: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      });
    }

    // 7. Dispatch verification email
    await sendVerificationEmail({
      to: normalizedEmail,
      name: displayName,
      token: verificationToken,
    });

    return successResponse(
      user,
      "Account created successfully! Please check your email to verify your account.",
      201
    );
  } catch (err: unknown) {
    console.error("[POST /api/auth/register] Error:", err);
    return errorResponse("Internal server error. Please try again later.", 500);
  }
}
