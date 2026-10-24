import { UserRoleType } from "@/constants/roles";
import { ValidationErrorItem } from "./common.types";

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type CandidateRegisterFormValues = RegisterFormValues;
export type EmployerRegisterFormValues = RegisterFormValues;

export interface RegisterRequestPayload {
  fullName: string;
  email: string;
  password: string;
  role: UserRoleType;
  companyName?: string | null;
}

export interface RegisterResponseData {
  id: string;
  email: string;
  role: UserRoleType;
  isEmailVerified: boolean;
  isOnboarded: boolean;
  createdAt: Date | string;
}

export interface RegisterSuccessResponse {
  success: true;
  message: string;
  data?: RegisterResponseData;
  status: number;
}

export interface RegisterErrorResponse {
  success: false;
  message: string;
  errors?: ValidationErrorItem[];
  status: number;
}
