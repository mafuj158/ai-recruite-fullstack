import { NextRequest, NextResponse } from "next/server";
import { authService, AuthError } from "@/server/services/auth.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export const authController = {
  /**
   * Handles user registration request
   */
  async register(req: NextRequest) {
    try {
      const body = await req.json();
      const { email, password, role, fullName, hrName, companyName } = body;

      // 1. Common validation
      if (!email || !password || !role) {
        return errorResponse("Email, password, and role are required.", 400);
      }

      if (password.length < 6) {
        return errorResponse("Password must be at least 6 characters long.", 400);
      }

      if (role !== "CANDIDATE" && role !== "EMPLOYER") {
        return errorResponse("Role must be either CANDIDATE or EMPLOYER.", 400);
      }

      // 2. Role-specific validation
      if (role === "EMPLOYER" && (!hrName?.trim() || !companyName?.trim())) {
        return errorResponse("HR Name and Company Name are required for employers.", 400);
      }

      if (role === "CANDIDATE" && !fullName?.trim()) {
        return errorResponse("Full Name is required for candidates.", 400);
      }

      // 3. Call backend service to persist user & profile in Neon and send email
      const user = await authService.register({
        email,
        password,
        role,
        fullName,
        hrName,
        companyName,
      });

      return successResponse(
        user,
        "Account created successfully! Please check your email to verify your account.",
        201
      );
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        return errorResponse(err.message, err.statusCode);
      }

      console.error("[AuthController:register] Error:", err);
      return errorResponse("Internal server error. Please try again later.", 500);
    }
  },

  /**
   * Handles email verification link click (GET /api/auth/verify-email?token=...)
   */
  async verifyEmail(req: NextRequest) {
    const baseUrl = req.nextUrl.origin;
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/login?error=missing_token", baseUrl)
      );
    }

    try {
      await authService.verifyEmail(token);
      // Redirect to login with verified flag
      return NextResponse.redirect(
        new URL("/login?verified=true", baseUrl)
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Verification link is invalid or expired.";
      return NextResponse.redirect(
        new URL(`/login?error=verification_failed&message=${encodeURIComponent(message)}`, baseUrl)
      );
    }
  },

  /**
   * Resends verification email
   */
  async resendVerification(req: NextRequest) {
    try {
      const body = await req.json();
      const { email } = body;

      if (!email) {
        return errorResponse("Email address is required.", 400);
      }

      const result = await authService.resendVerification(email);
      return successResponse(null, result.message, 200);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        return errorResponse(err.message, err.statusCode);
      }

      console.error("[AuthController:resendVerification] Error:", err);
      return errorResponse("Failed to resend verification email. Please try again.", 500);
    }
  },

  /**
   * Handles user login
   */
  async login(req: NextRequest) {
    try {
      const body = await req.json();
      const { email, password } = body;

      if (!email || !password) {
        return errorResponse("Email and password are required.", 400);
      }

      const user = await authService.login({ email, password });

      return successResponse(
        user,
        "Logged in successfully!",
        200
      );
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        if (err.code === "EMAIL_NOT_VERIFIED") {
          return NextResponse.json(
            {
              success: false,
              code: "EMAIL_NOT_VERIFIED",
              message: err.message,
            },
            { status: 403 }
          );
        }
        return errorResponse(err.message, err.statusCode);
      }

      console.error("[AuthController:login] Error:", err);
      return errorResponse("Internal server error. Please try again later.", 500);
    }
  },
};

export default authController;
