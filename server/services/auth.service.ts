import crypto from "crypto";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { mailService } from "@/server/services/mail.service";

export interface RegisterDTO {
  email: string;
  password: string;
  role: "CANDIDATE" | "EMPLOYER";
  fullName?: string;
  hrName?: string;
  companyName?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number = 400, code?: string) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const authService = {
  /**
   * Registers a new user, creates their profile, and sends an account verification email
   */
  async register(data: RegisterDTO) {
    const normalizedEmail = data.email.toLowerCase().trim();

    // 1. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AuthError("An account with this email already exists.", 409);
    }

    // 2. Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    // 3. Generate secure verification token (valid for 24 hours)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const displayName =
      data.role === "EMPLOYER" ? data.hrName!.trim() : data.fullName!.trim();

    // 4. Create User and Role-specific Profile in Neon PostgreSQL
    let user;
    if (data.role === "EMPLOYER") {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: "EMPLOYER",
          isEmailVerified: false,
          emailVerifyToken: verificationToken,
          emailVerifyExpires: verificationExpires,
          employerProfile: {
            create: {
              hrName: data.hrName!.trim(),
              companyName: data.companyName!.trim(),
            },
          },
        },
        select: {
          id: true,
          email: true,
          role: true,
          isEmailVerified: true,
          isOnboarded: true,
          createdAt: true,
          employerProfile: {
            select: {
              id: true,
              hrName: true,
              companyName: true,
            },
          },
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: "CANDIDATE",
          isEmailVerified: false,
          emailVerifyToken: verificationToken,
          emailVerifyExpires: verificationExpires,
          candidateProfile: {
            create: {
              fullName: data.fullName!.trim(),
            },
          },
        },
        select: {
          id: true,
          email: true,
          role: true,
          isEmailVerified: true,
          isOnboarded: true,
          createdAt: true,
          candidateProfile: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      });
    }

    // 5. Send verification email
    await mailService.sendVerificationEmail({
      to: normalizedEmail,
      name: displayName,
      token: verificationToken,
    });

    return user;
  },

  /**
   * Verifies email using verification token from link
   */
  async verifyEmail(token: string) {
    if (!token) {
      throw new AuthError("Verification token is missing.", 400);
    }

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
        isEmailVerified: true,
      },
    });

    if (!user) {
      throw new AuthError(
        "Invalid or expired verification link. Please request a new verification email.",
        400
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

    return { success: true, email: user.email };
  },

  /**
   * Resends verification email with a fresh token
   */
  async resendVerification(email: string) {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      throw new AuthError("No account found with this email address.", 404);
    }

    if (user.isEmailVerified) {
      throw new AuthError("This email is already verified. You can log in directly.", 400);
    }

    // Generate new token and 24-hour expiration
    const newToken = crypto.randomBytes(32).toString("hex");
    const newExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifyToken: newToken,
        emailVerifyExpires: newExpires,
      },
    });

    const displayName =
      user.role === "EMPLOYER"
        ? user.employerProfile?.hrName || "Recruiter"
        : user.candidateProfile?.fullName || "Candidate";

    await mailService.sendVerificationEmail({
      to: normalizedEmail,
      name: displayName,
      token: newToken,
    });

    return {
      success: true,
      message: "Verification email resent successfully! Please check your inbox.",
    };
  },

  /**
   * Authenticates user with credentials
   */
  async login(data: LoginDTO) {
    const normalizedEmail = data.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        candidateProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      throw new AuthError("Invalid email or password.", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AuthError("Invalid email or password.", 401);
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new AuthError(
        "Please verify your email address before logging in.",
        403,
        "EMAIL_NOT_VERIFIED"
      );
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isOnboarded: user.isOnboarded,
      name:
        user.role === "EMPLOYER"
          ? user.employerProfile?.hrName
          : user.candidateProfile?.fullName,
      companyName: user.employerProfile?.companyName,
    };
  },
};

export default authService;
