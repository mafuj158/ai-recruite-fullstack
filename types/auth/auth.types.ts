export type {
  CandidateRegisterFormValues,
  EmployerRegisterFormValues,
  RegisterRequestPayload,
} from "./register.types";

import type { UserRoleType } from "@/constants/roles";

export type AuthRole = UserRoleType;

export interface CandidateProfileData {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EmployerProfileData {
  id: string;
  userId: string;
  fullName: string;
  companyName: string | null;
  logoUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: AuthRole;
  isEmailVerified: boolean;
  isOnboarded: boolean;
  candidateProfile: CandidateProfileData | null;
  employerProfile: EmployerProfileData | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Alias for convenience
export type SafeUser = AuthUser;

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}