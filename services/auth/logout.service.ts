import { AxiosInstance } from "axios";

export interface LogoutResponse {
  success: boolean;
  message: string;
  status: number;
}

export const logoutService = {
  logout: async (axiosInstance: AxiosInstance): Promise<LogoutResponse> => {
    const response = await axiosInstance.post<LogoutResponse>("/auth/logout");
    return response.data;
  },
};

export default logoutService;
