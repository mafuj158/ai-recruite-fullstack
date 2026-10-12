import { NextResponse } from "next/server";

export function successResponse<T>(data: T, message?: string, status = 200) {
  const body: { success: true; data: T; message?: string } = {
    success: true,
    data,
  };

  if (message !== undefined) {
    body.message = message;
  }

  return NextResponse.json(body, { status });
}

export function errorResponse(error: string, status = 400, details?: unknown) {
  const body: { success: false; error: string; details?: unknown } = {
    success: false,
    error,
  };

  if (details !== undefined) {
    body.details = details;
  }

  return NextResponse.json(body, { status });
}

