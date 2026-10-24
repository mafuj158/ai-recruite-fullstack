import api from "@/lib/axios-client";
import { candidateOnboardingService } from "@/services/candidate";
import { MUTATION_KEYS } from "@/constants";
import {
  CandidateOnboardingRequestPayload,
  CandidateOnboardingSuccessResponse,
} from "@/types/candidate/onboarding.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCandidateOnboarding = () => {
  const {
    mutate: completeOnboarding,
    mutateAsync: completeOnboardingAsync,
    isPending,
    data,
  } = useMutation<
    CandidateOnboardingSuccessResponse,
    AxiosError<{ success: boolean; message: string }>,
    CandidateOnboardingRequestPayload
  >({
    mutationKey: MUTATION_KEYS.ONBOARDING.CANDIDATE,
    mutationFn: (payload: CandidateOnboardingRequestPayload) =>
      candidateOnboardingService.completeOnboarding(payload, api),
  });

  return {
    completeOnboarding,
    completeOnboardingAsync,
    isPending,
    data,
  };
};

export default useCandidateOnboarding;
