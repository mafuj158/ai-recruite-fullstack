import { NextRequest } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { USER_ROLES } from "@/constants";

export async function POST(req: NextRequest) {
  
  
}
