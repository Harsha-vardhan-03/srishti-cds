"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useToast } from "@/shared/hooks/useToast";
import {
    validateForgotEmail,
    validateOtp,
    validateResetPassword,
    ForgotEmailErrors,
    OtpErrors,
    ResetPasswordErrors,
} from "../schemas/forgotPasswordSchema";

type Step = "email" | "otp" | "reset" | "success";

export function ForgotPasswordForm() {
    const router = useRouter();
    const toast = useToast();

    const [step, setStep] = useState<Step>("email");
    const [identifier, setIdentifier] = useState("");
    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailErrors, setEmailErrors] = useState<ForgotEmailErrors>({});
    const [otpErrors, setOtpErrors] = useState<OtpErrors>({});
    const [passwordErrors, setPasswordErrors] = useState<ResetPasswordErrors>({});

    const {
        forgot,
        isSendingOtp,
        forgotError,
        isForgotError,
        verify,
        isVerifyingOtp,
        verifyError,
        isVerifyError,
        reset,
        isResettingPassword,
        resetError,
        isResetError,
    } = useForgotPassword();

    const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailErrors({});

        const errs = validateForgotEmail({ userIdOrMobile: identifier });
        if (Object.keys(errs).length > 0) {
            setEmailErrors(errs);
            return;
        }

        forgot(
            { userIdOrMobile: identifier },
            {
                onSuccess: () => {
                    toast.success("OTP sent. Check your mobile (mock: 123456)");
                    setStep("otp");
                },
            }
        );
    };

    const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOtpErrors({});

        const errs = validateOtp({ otp });
        if (Object.keys(errs).length > 0) {
            setOtpErrors(errs);
            return;
        }

        verify(
            { userIdOrMobile: identifier, otp },
            {
                onSuccess: (res) => {
                    setResetToken(res.resetToken);
                    toast.success("OTP verified");
                    setStep("reset");
                },
            }
        );
    };

    const handleResetSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordErrors({});

        const errs = validateResetPassword({ newPassword, confirmPassword });
        if (Object.keys(errs).length > 0) {
            setPasswordErrors(errs);
            return;
        }

        reset(
            { resetToken, newPassword },
            {
                onSuccess: () => {
                    toast.success("Password reset successful");
                    setStep("success");
                    setTimeout(() => router.push("/login"), 2500);
                },
            }
        );
    };

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#FFB74D] via-[#FB8C00] to-[#E65100] px-4 py-6">
            <div className="w-full max-w-[420px] bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] px-6 py-6 text-white">
                    <h1 className="text-xl font-bold">Reset your password</h1>
                    <p className="text-white/85 text-sm mt-1">
                        {step === "email" && "Enter your User ID or mobile number"}
                        {step === "otp" && "Enter the OTP sent to your mobile"}
                        {step === "reset" && "Choose a new password"}
                        {step === "success" && "All done"}
                    </p>
                </div>

                <div className="px-6 py-6">
                    {step === "email" && (
                        <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
                            {isForgotError && forgotError && (
                                <ErrorAlert message={forgotError.message} />
                            )}

                            <Input
                                label="User ID / Mobile Number"
                                placeholder="SRI0461 or 9876543210"
                                value={identifier}
                                onChange={(e) => {
                                    setIdentifier(e.target.value);
                                    if (emailErrors.userIdOrMobile) {
                                        setEmailErrors({});
                                    }
                                }}
                                error={emailErrors.userIdOrMobile}
                                disabled={isSendingOtp}
                                autoComplete="username"
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isSendingOtp}
                                className="!py-2.5 !text-sm !font-semibold"
                            >
                                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </form>
                    )}

                    {step === "otp" && (
                        <form onSubmit={handleOtpSubmit} className="space-y-4" noValidate>
                            {isVerifyError && verifyError && (
                                <ErrorAlert message={verifyError.message} />
                            )}

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                <p className="text-xs text-blue-800">
                                    <strong>Dev note:</strong> Mock OTP is{" "}
                                    <span className="font-mono font-bold">123456</span>
                                </p>
                            </div>

                            <Input
                                label="6-digit OTP"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                                    if (otpErrors.otp) setOtpErrors({});
                                }}
                                error={otpErrors.otp}
                                disabled={isVerifyingOtp}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isVerifyingOtp}
                                className="!py-2.5 !text-sm !font-semibold"
                            >
                                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                            </Button>

                            <button
                                type="button"
                                onClick={() => setStep("email")}
                                className="w-full text-xs text-gray-500 hover:text-gray-700"
                            >
                                Didn&apos;t receive the code? Try again
                            </button>
                        </form>
                    )}

                    {step === "reset" && (
                        <form
                            onSubmit={handleResetSubmit}
                            className="space-y-4"
                            noValidate
                        >
                            {isResetError && resetError && (
                                <ErrorAlert message={resetError.message} />
                            )}

                            <Input
                                label="New Password"
                                placeholder="Min 8 chars, 1 upper, 1 number"
                                isPassword
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    if (passwordErrors.newPassword) setPasswordErrors({});
                                }}
                                error={passwordErrors.newPassword}
                                disabled={isResettingPassword}
                                autoComplete="new-password"
                            />

                            <Input
                                label="Confirm Password"
                                placeholder="Re-enter password"
                                isPassword
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (passwordErrors.confirmPassword) setPasswordErrors({});
                                }}
                                error={passwordErrors.confirmPassword}
                                disabled={isResettingPassword}
                                autoComplete="new-password"
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isResettingPassword}
                                className="!py-2.5 !text-sm !font-semibold"
                            >
                                {isResettingPassword ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    )}

                    {step === "success" && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <CheckCircle2 size={32} className="text-green-600" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">
                                Password Reset
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Your password has been reset. Redirecting to login...
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0EA5E9] text-white font-semibold hover:bg-[#0284C7] transition-colors"
                            >
                                Go to Login
                            </Link>
                        </div>
                    )}

                    {step !== "success" && (
                        <p className="text-center text-sm text-gray-600 mt-5">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-[#0EA5E9] font-semibold hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-snug flex-1">{message}</p>
        </div>
    );
}