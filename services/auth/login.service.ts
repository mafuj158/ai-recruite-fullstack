import { AxiosInstance } from "axios";
import { LoginRequestPayload } from "@/types";




export const loginService = {

  // manual login

  login: async (payload: LoginRequestPayload, axiosInstance: AxiosInstance) => {
    const response = await axiosInstance.post(
      "/auth/login",
      payload
    );
    return response?.data;
  },

  // social login


};

export default loginService;
