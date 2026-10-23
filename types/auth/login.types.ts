import { AuthUser, AuthTokens } from "./auth.types";

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

