"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { RegisterPayload, RegisterResponse, ApiError } from "../types";

export function useRegister() {
    const mutation = useMutation<RegisterResponse, ApiError, RegisterPayload>({
        mutationFn: registerUser,
    });

    return {
        register: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        data: mutation.data,
    };
}