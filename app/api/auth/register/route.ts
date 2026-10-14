import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role, fullName, hrName, companyName } = body;

    console.log(body)
    if (!email || !role) {
      return errorResponse("Email and role are required", 400);
    }



  } catch (err: unknown) {

  }
}
