import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";
import { safeVerifyToken, generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { USER_ROLES } from "@/constants";
import { EmployerOnboardingRequestPayload } from "@/types/employer/onboarding.types";

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

    // Role check: Only EMPLOYER can access employer onboarding
    if (payload.role !== USER_ROLES.EMPLOYER) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only employers can access employer onboarding",
          status: httpStatus.FORBIDDEN,
        },
        { status: httpStatus.FORBIDDEN }
      );
    }

    // 2. Parse and validate request body
    const body = (await req.json().catch(() => null)) as EmployerOnboardingRequestPayload | null;
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
      companyName,
      companyLogo,
      website,
      industryId,
      companySize,
      location,
      aboutCompany,
      rolesHiringFor,
      preferredExpLevels,
      budgetRange,
    } = body;

    // Field validations
    if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!website || typeof website !== "string" || !website.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Company website is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!industryId || typeof industryId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an industry",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!companySize) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select company size",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!location || !location.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Headquarters location is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!aboutCompany || !aboutCompany.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "About company description is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!Array.isArray(rolesHiringFor) || rolesHiringFor.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select at least one role you are hiring for",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!Array.isArray(preferredExpLevels) || preferredExpLevels.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select preferred experience levels",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    if (!budgetRange) {
      return NextResponse.json(
        {
          success: false,
          message: "Budget range is required",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    // 3. Resolve all roles hiring for: check existing or auto-create custom typed role
    const resolvedRoleIds: string[] = [];

    for (const r of rolesHiringFor) {
      if (!r || !r.label || !r.label.trim()) continue;

      const trimmedLabel = r.label.trim();
      const slug = (r.value || trimmedLabel)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      let existingRole = r.id
        ? await prisma.jobRole.findUnique({ where: { id: r.id } })
        : null;

      if (!existingRole) {
        existingRole = await prisma.jobRole.findFirst({
          where: {
            OR: [
              { value: slug },
              { label: { equals: trimmedLabel, mode: "insensitive" } },
            ],
          },
        });
      }

      if (!existingRole) {
        existingRole = await prisma.jobRole.create({
          data: {
            label: trimmedLabel,
            value: slug || `role-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            isActive: true,
          },
        });
        console.log(`[Employer Onboarding] New Job Role created in database: "${trimmedLabel}"`);
      }

      if (existingRole && !resolvedRoleIds.includes(existingRole.id)) {
        resolvedRoleIds.push(existingRole.id);
      }
    }

    // 4. Update EmployerProfile and User.isOnboarded in transaction
    const [updatedProfile] = await prisma.$transaction([
      prisma.employerProfile.update({
        where: { userId: payload.user_id },
        data: {
          companyName: companyName.trim(),
          logoUrl: companyLogo || null,
          website: website.trim(),
          industryId,
          companySize,
          location: location.trim(),
          aboutCompany: aboutCompany.trim(),
          preferredExpLevels,
          budgetRange,
          rolesHiringFor: {
            set: resolvedRoleIds.map((id) => ({ id })),
          },
        },
        include: {
          industry: { select: { id: true, label: true, value: true } },
          rolesHiringFor: { select: { id: true, label: true, value: true } },
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
        message: "Company profile setup completed successfully!",
        data: {
          id: updatedProfile.id,
          userId: updatedProfile.userId,
          fullName: updatedProfile.fullName,
          companyName: updatedProfile.companyName,
          logoUrl: updatedProfile.logoUrl,
          website: updatedProfile.website,
          isOnboarded: true,
          industry: updatedProfile.industry,
          rolesHiringFor: updatedProfile.rolesHiringFor,
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
    console.error("[POST /api/employer/onboarding] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while saving employer onboarding data",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
