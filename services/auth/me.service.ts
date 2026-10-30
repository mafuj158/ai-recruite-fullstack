import { AxiosInstance } from "axios";
import { CurrentUserResponse } from "@/types";

export const meService = {
  getMe: async (axiosInstance: AxiosInstance): Promise<CurrentUserResponse> => {
    const response = await axiosInstance.get<CurrentUserResponse>("/auth/me");
    return response.data;
  },
};

export default meService;

