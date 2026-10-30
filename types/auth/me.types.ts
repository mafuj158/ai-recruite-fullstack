import { AuthUser } from "./auth.types";

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
  status: number;
}

