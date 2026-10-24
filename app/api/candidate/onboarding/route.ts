import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { safeVerifyToken, generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { USER_ROLES } from "@/constants";
import { CandidateOnboardingRequestPayload } from "@/types/candidate/onboarding.types";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user from cookie or Authorization header
    const cookieName =
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "ai_recruite_access_token";
    const token =
      req.cookies.get(cookieName)?.value ||
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

    // Role check: Only CANDIDATE can onboard here
    if (payload.role !== USER_ROLES.CANDIDATE) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only candidates can access candidate onboarding",
          status: httpStatus.FORBIDDEN,
        },
        { status: httpStatus.FORBIDDEN }
      );
    }

    // 2. Parse and validate request body
    const body = (await req.json().catch(() => null)) as CandidateOnboardingRequestPayload | null;
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

    const {
      jobRoleId,
      skills,
      experienceLevel,
      preferredLocation,
      workType,
      salaryExpectation,
      industryId,
      bio,
      cvOption,
      cvFileName,
      cvFileSize,
      cvUrl,
    } = body;

    // Field validations
    if (!jobRoleId || typeof jobRoleId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please select your primary job title",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please add at least one skill",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!experienceLevel) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select your experience level",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!workType) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select your preferred work type",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!preferredLocation) {
      return NextResponse.json(
        {
          success: false,
          message: "Preferred location is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!salaryExpectation) {
      return NextResponse.json(
        {
          success: false,
          message: "Salary expectation is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    // 3. Resolve all skill IDs:
    // Check which skills exist in DB and auto-create any new typed skills in the Skill table
    const resolvedSkillIds: string[] = [];

    for (const s of skills) {
      if (!s || !s.label || !s.label.trim()) continue;

      const trimmedLabel = s.label.trim();
      const slug = (s.value || trimmedLabel)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // If valid ID provided, check if it exists in DB
      let existingSkill = s.id
        ? await prisma.skill.findUnique({ where: { id: s.id } })
        : null;

      // If no skill found by ID, check by slug or label (case-insensitive)
      if (!existingSkill) {
        existingSkill = await prisma.skill.findFirst({
          where: {
            OR: [
              { value: slug },
              { label: { equals: trimmedLabel, mode: "insensitive" } },
            ],
          },
        });
      }

      // If it's a completely new skill, insert it into the Skill table!
      if (!existingSkill) {
        existingSkill = await prisma.skill.create({
          data: {
            label: trimmedLabel,
            value: slug || `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            isPopular: false,
            isActive: true,
          },
        });
        console.log(`[Onboarding] New skill created in database: "${trimmedLabel}" (ID: ${existingSkill.id})`);
      }

      if (existingSkill && !resolvedSkillIds.includes(existingSkill.id)) {
        resolvedSkillIds.push(existingSkill.id);
      }
    }

    // 4. Update CandidateProfile and User.isOnboarded in transaction
    const [updatedProfile] = await prisma.$transaction([
      prisma.candidateProfile.update({
        where: { userId: payload.user_id },
        data: {
          jobRoleId,
          industryId: industryId || null,
          experienceLevel,
          workType,
          preferredLocation,
          salaryExpectation,
          bio: bio?.trim() || null,
          cvOption: cvOption || "upload",
          cvFileName: cvFileName || null,
          cvFileSize: cvFileSize || null,
          cvUrl: cvUrl || null,
          skills: {
            set: resolvedSkillIds.map((id) => ({ id })),
          },
        },
        include: {
          jobRole: { select: { id: true, label: true, value: true } },
          industry: { select: { id: true, label: true, value: true } },
          skills: { select: { id: true, label: true, value: true } },
        },
      }),
      prisma.user.update({
        where: { id: payload.user_id },
        data: { isOnboarded: true },
      }),
    ]);

    // 5. Issue updated JWT tokens reflecting isOnboarded: true
    const updatedTokenPayload = {
      user_id: payload.user_id,
      email: payload.email,
      role: payload.role,
      isOnboarded: true,
    };

    const newAccessToken = generateAccessToken(updatedTokenPayload);
    const newRefreshToken = generateRefreshToken(updatedTokenPayload);

    // 6. Build response and set cookies
    const response = NextResponse.json(
      {
        success: true,
        message: "Profile setup completed successfully!",
        data: {
          id: updatedProfile.id,
          userId: updatedProfile.userId,
          fullName: updatedProfile.fullName,
          isOnboarded: true,
          jobRole: updatedProfile.jobRole,
          industry: updatedProfile.industry,
          skills: updatedProfile.skills,
        },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );

    const isProduction = process.env.NODE_ENV === "production";
    const refreshTokenCookieName =
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "ai_recruite_refresh_token";

    const accessTokenMaxAge = process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE
      ? parseInt(process.env.AI_RECRUITE_ACCESS_TOKEN_MAX_AGE, 10)
      : 15 * 60;

    const refreshTokenMaxAge = process.env.AI_RECRUITE_REFRESH_TOKEN_MAX_AGE
      ? parseInt(process.env.AI_RECRUITE_REFRESH_TOKEN_MAX_AGE, 10)
      : 7 * 24 * 60 * 60;

    response.cookies.set({
      name: cookieName,
      value: newAccessToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenMaxAge,
    });

    response.cookies.set({
      name: refreshTokenCookieName,
      value: newRefreshToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });

    return response;
  } catch (error) {
    console.error("[POST /api/candidate/onboarding] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while saving onboarding data",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
