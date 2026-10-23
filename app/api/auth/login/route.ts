import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import {
  AuthUser,
  LoginRequestPayload,
  LoginResponseData,
  ValidationErrorItem,
} from "@/types";
import { USER_ROLES } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as LoginRequestPayload | null;
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

    const { email, password } = body;

    // ১. সব ভ্যালিডেশন এরর Array হিসেবে কালেক্ট করা
    const errors: ValidationErrorItem[] = [];

    // Email Validation (Presence, Type & Format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === undefined || email === null || email === "") {
      errors.push({ field: "email", message: "Email is required" });
    } else if (typeof email !== "string") {
      errors.push({ field: "email", message: "Email must be a string" });
    } else if (!emailRegex.test(email.trim())) {
      errors.push({ field: "email", message: "Please provide a valid email address" });
    }

    // Password Validation (Presence, Type & Length check)
    if (password === undefined || password === null || password === "") {
      errors.push({ field: "password", message: "Password is required" });
    } else if (typeof password !== "string") {
      errors.push({ field: "password", message: "Password must be a string" });
    }

    // ২. কোনো এরর থাকলে 400 রিটার্ন করা
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errorCode: "VALIDATION_FAILED",
          errors,
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    // ৩. ডাটাবেসে ইউজার এবং সংশ্লিষ্ট প্রোফাইল আছে কি না যাচাই
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
          message: "Invalid email or password",
          errorCode: "INVALID_CREDENTIALS",
          errors: [{ field: "email", message: "Invalid email or password" }],
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ৪. ইমেল ভেরিফিকেশন হয়েছে কিনা চেক করা (অ্যাকাউন্ট অ্যাক্টিভ কিনা)
    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not verified. Please verify your email address.",
          errorCode: "EMAIL_NOT_VERIFIED",
          isEmailVerified: false,
          data: {
            email: user.email,
            isEmailVerified: false,
          },
          errors: [{ field: "email", message: "Email not verified" }],
          status: httpStatus.FORBIDDEN,
        },
        { status: httpStatus.FORBIDDEN }
      );
    }

    // ৫. পাসওয়ার্ড সঠিক কিনা যাচাই করা (bcrypt.compare ব্যবহার করে)
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
          errorCode: "INVALID_CREDENTIALS",
          errors: [{ field: "password", message: "Invalid email or password" }],
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ৬. রোল এবং অনবোর্ডিং স্ট্যাটাস অনুযায়ী রিডাইরেক্ট ইউআরএল নির্ধারণ
    let redirectTo = "/";
    if (!user.isOnboarded) {
      if (user.role === USER_ROLES.EMPLOYER) {
        redirectTo = "/onboarding/employer";
      } else if (user.role === USER_ROLES.ADMIN) {
        redirectTo = "/admin/dashboard";
      } else {
        redirectTo = "/onboarding/candidate";
      }
    } else {
      if (user.role === USER_ROLES.EMPLOYER) {
        redirectTo = "/employer/dashboard";
      } else if (user.role === USER_ROLES.ADMIN) {
        redirectTo = "/admin/dashboard";
      } else {
        redirectTo = "/candidate/dashboard";
      }
    }

    // ৭. JWT Access Token এবং Refresh Token জেনারেট করা
    const tokenPayload = {
      user_id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // ৮. রেসপন্সের জন্য নিরাপদ ইউজার ডাটা প্রস্তুত করা (পাসওয়ার্ড ও ভেরিফিকেশন টোকেন বাদ দিয়ে)
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

    const responseData: LoginResponseData = {
      user: sanitizedUser,
      redirectTo,
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };

    // ৯. সাকসেস রেসপন্স অবজেক্ট তৈরি করা
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: responseData,
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );

    // ১০. সিকিউর HTTP-only কুকি সেট করা
    const accessTokenCookieName =
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "ai_recruite_access_token";
    const refreshTokenCookieName =
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "ai_recruite_refresh_token";

    const isProduction = process.env.NODE_ENV === "production";

    const accessTokenMaxAge = process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE
      ? parseInt(process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE, 10)
      : 15 * 60; // 15 মিনিট (ডিফল্ট)

    const refreshTokenMaxAge = process.env.AI_RECRUITE_REFRESH_TOKEN_MAX_AGE
      ? parseInt(process.env.AI_RECRUITE_REFRESH_TOKEN_MAX_AGE, 10)
      : 7 * 24 * 60 * 60; // ৭ দিন (ডিফল্ট)

    response.cookies.set({
      name: accessTokenCookieName,
      value: accessToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenMaxAge,
    });

    response.cookies.set({
      name: refreshTokenCookieName,
      value: refreshToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });

    return response;
  } catch (err: unknown) {
    console.error("[POST /api/auth/login] Error:", err);
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
