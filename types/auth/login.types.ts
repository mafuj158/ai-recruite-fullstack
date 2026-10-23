import { AuthUser, AuthTokens } from "./auth.types";
import { ValidationErrorItem } from "./common.types";

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  redirectTo: string;
  tokens: AuthTokens;
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: LoginResponseData;
  status: number;
}

export type LoginErrorCode =
  | "EMAIL_NOT_VERIFIED"
  | "INVALID_CREDENTIALS"
  | "VALIDATION_FAILED"
  | "INTERNAL_ERROR";

export interface LoginErrorResponse {
  success: false;
  message: string;
  errorCode?: LoginErrorCode;
  isEmailVerified?: boolean;
  data?: {
    email?: string;
    isEmailVerified?: boolean;
  };
  errors?: ValidationErrorItem[];
  status: number;
}


