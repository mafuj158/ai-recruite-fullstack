import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/login?error=missing_token", baseUrl)
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        emailVerifyToken: token,
        emailVerifyExpires: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL(
          "/login?error=verification_failed&message=Invalid+or+expired+verification+link",
          baseUrl
        )
      );
    }

    // Activate user email verification
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      },
    });

    // Redirect to login page with verified parameter
    return NextResponse.redirect(
      new URL("/login?verified=true", baseUrl)
    );
  } catch (err: unknown) {
    console.error("[GET /api/auth/verify-email] Error:", err);
    return NextResponse.redirect(
      new URL(
        "/login?error=verification_failed&message=An+unexpected+error+occurred",
        baseUrl
      )
    );
  }
}
