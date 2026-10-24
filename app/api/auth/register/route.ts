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

    const { email, password } = body;

    // ১. সব ভ্যালিডেশন এরর Array হিসেবে কালেক্ট করা
    const errors: ValidationErrorItem[] = [];

  } catch (err: unknown) {
    console.error("[POST /api/auth/register] Error:", err);

  }
}
