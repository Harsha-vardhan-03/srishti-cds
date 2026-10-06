"use client";

import { useMutation } from "@tanstack/react-query";
import {
    forgotPassword,
    verifyOtp,
    resetPassword,
} from "../api/authApi";
import {
    ForgotPasswordPayload,
    ForgotPasswordResponse,
    VerifyOtpPayload,
    VerifyOtpResponse,
    ResetPasswordPayload,
    ResetPasswordResponse,
    ApiError,
} from "../types";

export function useForgotPassword() {
    const forgotMutation = useMutation<
        ForgotPasswordResponse,
        ApiError,
        ForgotPasswordPayload
    >({ mutationFn: forgotPassword });

    const verifyMutation = useMutation<
        VerifyOtpResponse,
        ApiError,
        VerifyOtpPayload
    >({ mutationFn: verifyOtp });

    const resetMutation = useMutation<
        ResetPasswordResponse,
        ApiError,
        ResetPasswordPayload
    >({ mutationFn: resetPassword });

    return {
        forgot: forgotMutation.mutate,
        isSendingOtp: forgotMutation.isPending,
        forgotError: forgotMutation.error,
        isForgotError: forgotMutation.isError,

        verify: verifyMutation.mutate,
        isVerifyingOtp: verifyMutation.isPending,
        verifyError: verifyMutation.error,
        isVerifyError: verifyMutation.isError,

        reset: resetMutation.mutate,
        isResettingPassword: resetMutation.isPending,
        resetError: resetMutation.error,
        isResetError: resetMutation.isError,
    };
}