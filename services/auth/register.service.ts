import { AxiosInstance } from "axios";
import { RegisterRequestPayload } from "@/types";

export const registerService = {
  // manual register
  register: async (payload: RegisterRequestPayload, axiosInstance: AxiosInstance) => {
    const response = await axiosInstance.post(
      "/auth/register",
      payload
    );
    return response?.data;
  },
};

export default registerService;
