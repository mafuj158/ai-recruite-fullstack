import api from "@/lib/axios-client";
import { logoutService, LogoutResponse } from "@/services/auth/logout.service";
import { MUTATION_KEYS } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogout = () => {
  const {
    mutate: logout,
    mutateAsync: logoutAsync,
    isPending,
    data,
  } = useMutation<
    LogoutResponse,
    AxiosError<{ success: boolean; message: string }>,
    void
  >({
    mutationKey: MUTATION_KEYS.AUTH.LOGOUT,
    mutationFn: () => logoutService.logout(api),
  });

  return {
    logout,
    logoutAsync,
    isPending,
    data,
  };
};

export default useLogout;
