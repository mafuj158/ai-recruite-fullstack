import api from "@/lib/axios-client";
import { employerOnboardingService } from "@/services/employer";
import { MUTATION_KEYS } from "@/constants";
import {
  EmployerOnboardingRequestPayload,
  EmployerOnboardingSuccessResponse,
} from "@/types/employer/onboarding.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useEmployerOnboarding = () => {
  const {
    mutate: completeOnboarding,
    mutateAsync: completeOnboardingAsync,
    isPending,
    data,
  } = useMutation<
    EmployerOnboardingSuccessResponse,
    AxiosError<{ success: boolean; message: string }>,
    EmployerOnboardingRequestPayload
  >({
    mutationKey: MUTATION_KEYS.ONBOARDING.EMPLOYER,
    mutationFn: (payload: EmployerOnboardingRequestPayload) =>
      employerOnboardingService.completeOnboarding(payload, api),
  });

  return {
    completeOnboarding,
    completeOnboardingAsync,
    isPending,
    data,
  };
};

export default useEmployerOnboarding;
