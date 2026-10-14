import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}

/**
 * Creates a standard JSON success response
 */
export function successResponse<T>(
  data: T,
  message: string = "Success",
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * Creates a standard JSON error response
 */
export function errorResponse(
  message: string = "An error occurred",
  status: number = 400,
  errors?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}
