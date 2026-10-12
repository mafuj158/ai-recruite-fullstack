import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    // Starter template: in live flow, create User and Profile in DB via Prisma
    const mockCreatedUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email,
      password,
      isOnboarded: false,
      createdAt: new Date().toISOString(),
    };

    return successResponse(mockCreatedUser, "User login successfully", 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "login failed";
    return errorResponse(message, 500);
  }
}
