import { AxiosInstance } from "axios";
import {
  EmployerOnboardingRequestPayload,
  EmployerOnboardingSuccessResponse,
} from "@/types/employer/onboarding.types";

export const employerOnboardingService = {
  completeOnboarding: async (
    payload: EmployerOnboardingRequestPayload,
    axiosInstance: AxiosInstance
  ): Promise<EmployerOnboardingSuccessResponse> => {
    const response = await axiosInstance.post<EmployerOnboardingSuccessResponse>(
      "/employer/onboarding",
      payload
    );
    return response.data;
  },
};

export default employerOnboardingService;
