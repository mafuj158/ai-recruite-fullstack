import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { sendVerificationEmail } from "@/lib/mail";
import { USER_ROLES } from "@/constants";
import { ValidationErrorItem, RegisterRequestPayload } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as RegisterRequestPayload | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const { fullName, email, password, role, companyName } = body;

    // ১. সব ভ্যালিডেশন এরর Array হিসেবে কালেক্ট করা
    const errors: ValidationErrorItem[] = [];

    // Full Name Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
      errors.push({ field: "fullName", message: "Full Name is required" });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || email.trim() === "") {
      errors.push({ field: "email", message: "Email is required" });
    } else if (!emailRegex.test(email.trim())) {
      errors.push({ field: "email", message: "Please provide a valid email address" });
    }

    // Password Validation
    if (!password || typeof password !== "string" || password === "") {
      errors.push({ field: "password", message: "Password is required" });
    } else if (password.length < 6) {
      errors.push({ field: "password", message: "Password must be at least 6 characters long" });
    }

    // Role Validation
    if (!role || (role !== USER_ROLES.CANDIDATE && role !== USER_ROLES.EMPLOYER)) {
      errors.push({ field: "role", message: "Role must be either CANDIDATE or EMPLOYER" });
    }

    // কোনো ভ্যালিডেশন এরর থাকলে 400 Bad Request রিটার্ন করা
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ২. ডাটাবেসে এই ইমেইলে আগে থেকেই কোনো ইউজার আছে কি না চেক করা
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
          errors: [{ field: "email", message: "An account with this email already exists." }],
          status: httpStatus.CONFLICT,
        },
        { status: httpStatus.CONFLICT }
      );
    }

    // ৩. পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // ৪. ইমেল ভেরিফিকেশন টোকেন জেনারেট করা (২৪ ঘণ্টার মেয়াদ)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const displayName = fullName.trim();

    // ৫. ডাটাবেসে ইউজার এবং রোল ভিত্তিক প্রোফাইল তৈরি করা
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        role,
        isEmailVerified: false,
        emailVerifyToken: verificationToken,
        emailVerifyExpires: verificationExpires,
        ...(role === USER_ROLES.EMPLOYER
          ? {
              employerProfile: {
                create: {
                  fullName: displayName,
                  companyName: companyName?.trim() || null,
                },
              },
            }
          : {
              candidateProfile: {
                create: {
                  fullName: displayName,
                },
              },
            }),
      },
      select: {
        id: true,
        email: true,
        role: true,
        isEmailVerified: true,
        isOnboarded: true,
        createdAt: true,
      },
    });

    // ৬. ভেরিফিকেশন ইমেল পাঠানো
    try {
      await sendVerificationEmail({
        to: normalizedEmail,
        name: displayName,
        token: verificationToken,
      });
    } catch (mailError) {
      console.error("[POST /api/auth/register] Mail delivery error:", mailError);
      // ইমেল ডেলিভারি ফেইল করলেও একাউন্ট তৈরি হয়ে গেছে, ইউজার পরবর্তীতে resend করতে পারবেন
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully! Please check your email to verify your account.",
        data: user,
        status: httpStatus.CREATED,
      },
      { status: httpStatus.CREATED }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
        error:
          process.env.NODE_ENV === "development" && err instanceof Error
            ? err.message
            : undefined,
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
