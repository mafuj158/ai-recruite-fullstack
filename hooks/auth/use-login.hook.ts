
import api from "@/lib/axios-client";
import { loginService } from "@/services";
import { MUTATION_KEYS } from "@/constants";
import {
    LoginErrorResponse,
    LoginRequestPayload,
    LoginSuccessResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = () => {
    const axiosInstance = api;

    const {
        mutate: login,
        mutateAsync: loginAsync,
        isPending,
        data,
    } = useMutation<
        LoginSuccessResponse,
        AxiosError<LoginErrorResponse>,
        LoginRequestPayload
    >({
        mutationKey: MUTATION_KEYS.AUTH.LOGIN,
        mutationFn: (payload: LoginRequestPayload) => loginService.login(payload, axiosInstance),
    });

    return {
        login,
        loginAsync,
        isPending,
        data,
    };
};
