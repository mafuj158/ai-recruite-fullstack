import { AxiosInstance } from "axios";
import {
  CandidateOnboardingRequestPayload,
  CandidateOnboardingSuccessResponse,
} from "@/types/candidate/onboarding.types";

export const candidateOnboardingService = {
  completeOnboarding: async (
    payload: CandidateOnboardingRequestPayload,
    axiosInstance: AxiosInstance
  ): Promise<CandidateOnboardingSuccessResponse> => {
    const response = await axiosInstance.post<CandidateOnboardingSuccessResponse>(
      "/candidate/onboarding",
      payload
    );
    return response.data;
  },
};

export default candidateOnboardingService;
