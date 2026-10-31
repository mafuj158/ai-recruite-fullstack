import { AUTH_COOKIES, USER_ROLES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import { safeVerifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { CreateJobPayload, ValidationErrorItem } from "@/types";




export async function POST(req: NextRequest) {


  try {

    // ১. কুকি বা হেডার থেকে টোকেন নেওয়া
    const token = req.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value || req.headers.get("authorization")?.replace("Bearer ", "")

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

    // ২. রোল ভ্যালিডেশন (শুধুমাত্র EMPLOYER জব পোস্ট করতে পারবে)

    const payload = safeVerifyToken(token)
    if (!payload || payload.role !== USER_ROLES.EMPLOYER) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only employers can post jobs",
          status: httpStatus.FORBIDDEN,
        },
        { status: httpStatus.FORBIDDEN }
      )
    }
    // ৩. ইউজারের EmployerProfile খুঁজে বের করা
    const employer = await prisma.employerProfile.findUnique({
      where: { userId: payload.user_id },
    });
    if (!employer) {
      return NextResponse.json(
        {
          success: false,
          message: "Employer profile not found",
          status: httpStatus.NOT_FOUND
        },
        { status: httpStatus.NOT_FOUND }
      )
    }
    const body = (await req.json().catch(() => null)) as CreateJobPayload | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload",
          status: httpStatus.BAD_REQUEST
        },
        { status: httpStatus.BAD_REQUEST }
      )
    }
    // ৪. প্রয়োজনীয় ফিল্ড ভ্যালিডেশন সব ভ্যালিডেশন এরর Array হিসেবে কালেক্ট করা
    const errors: ValidationErrorItem[] = [];
    

  } catch (err) {
    console.error("[POST /api/employer/jobs] Error:", err)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job posting",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    )
  }



}