import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";

export async function GET() {
  try {
    const [jobRoles, industries, skills] = await Promise.all([
      prisma.jobRole.findMany({
        where: { isActive: true },
        select: { id: true, label: true, value: true },
        orderBy: { label: "asc" },
      }),
      prisma.industry.findMany({
        where: { isActive: true },
        select: { id: true, label: true, value: true },
        orderBy: { label: "asc" },
      }),
      prisma.skill.findMany({
        where: { isActive: true },
        select: { id: true, label: true, value: true, isPopular: true },
        orderBy: [{ isPopular: "desc" }, { label: "asc" }],
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          jobRoles,
          industries,
          skills,
        },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );
  } catch (error) {
    console.error("[GET /api/lookup/options] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lookup options",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
