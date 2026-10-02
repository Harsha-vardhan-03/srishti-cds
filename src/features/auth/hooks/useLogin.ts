"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/authApi";
import { LoginPayload, LoginResponse, ApiError } from "../types";
import { useAuthStore } from "@/shared/store/authStore";

export function useLogin() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setAuthenticatedUser = useAuthStore((s) => s.setAuthenticatedUser);

    const mutation = useMutation<LoginResponse, ApiError, LoginPayload>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setAuthenticatedUser(data.user);
            queryClient.clear();
            router.replace("/dashboard");
        },
        onError: () => {
            
        },
    });

    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
}