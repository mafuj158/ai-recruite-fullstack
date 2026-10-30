import api from "@/lib/axios-client";
import { registerService } from "@/services";
import { MUTATION_KEYS } from "@/constants";
import {
    RegisterErrorResponse,
    RegisterRequestPayload,
    RegisterSuccessResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRegister = (role: "CANDIDATE" | "EMPLOYER") => {
    const axiosInstance = api;

    const mutationKey =
        role === "EMPLOYER"
            ? MUTATION_KEYS.AUTH.REGISTER_EMPLOYER
            : MUTATION_KEYS.AUTH.REGISTER_CANDIDATE;

    const {
        mutate: register,
        mutateAsync: registerAsync,
        isPending,
        data,
    } = useMutation<
        RegisterSuccessResponse,
        AxiosError<RegisterErrorResponse>,
        RegisterRequestPayload
    >({
        mutationKey,
        mutationFn: (payload: RegisterRequestPayload) =>
            registerService.register(payload, axiosInstance),
    });

    return {
        register,
        registerAsync,
        isPending,
        data,
    };
};
