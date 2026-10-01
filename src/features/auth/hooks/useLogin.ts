"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/authApi";
import { LoginPayload, LoginResponse, ApiError } from "../types";
import { useAuthStore } from "@/shared/store/authStore";

export function useLogin() {
    const router = useRouter();
    const loginToStore = useAuthStore((state) => state.login);

    const mutation = useMutation<LoginResponse, ApiError, LoginPayload>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            loginToStore(data.user, data.token);
            router.push("/dashboard");
        },
        onError: (error) => {
            // Only log in development — never in production
            if (process.env.NODE_ENV === "development") {
                console.error("[Login Error]", error.message);
            }
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