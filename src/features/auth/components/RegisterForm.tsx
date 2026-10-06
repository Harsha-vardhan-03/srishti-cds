"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Check } from "lucide-react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useRegister } from "../hooks/useRegister";
import { useReferralValidation } from "../hooks/useReferralValidation";
import {
    validateRegisterForm,
    RegisterFormErrors,
    RegisterPayloadInput,
} from "../schemas/registerSchema";

const initialForm: RegisterPayloadInput = {
    fullName: "",
    mobile: "",
    email: "",
    referralId: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false as unknown as true,
};

export function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterPayloadInput>(initialForm);
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { register, isLoading, isError, error } = useRegister();

    const { validation, isValidating } = useReferralValidation(
        formData.referralId || ""
    );

    const handleChange = (
        field: keyof RegisterPayloadInput,
        value: string | boolean
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateRegisterForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        register(
            {
                fullName: formData.fullName,
                mobile: formData.mobile,
                email: formData.email,
                referralId: formData.referralId || undefined,
                password: formData.password,
            },
            {
                onSuccess: (res) => {
                    setSuccessMessage(
                        `Welcome ${res.user.name}! Your User ID is ${res.user.userId}. Redirecting to login...`
                    );
                    setTimeout(() => {
                        router.push("/login");
                    }, 3000);
                },
            }
        );
    };

    if (successMessage) {
        return (
            <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#FFB74D] via-[#FB8C00] to-[#E65100] px-4 py-6">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Registration Successful
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">{successMessage}</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0EA5E9] text-white font-semibold hover:bg-[#0284C7] transition-colors"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#FFB74D] via-[#FB8C00] to-[#E65100] px-4 py-6">
            <div className="w-full max-w-[440px] bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] px-6 py-6 text-white">
                    <h1 className="text-xl font-bold">Create your account</h1>
                    <p className="text-white/85 text-sm mt-1">Join SRISHTI CDS today</p>
                </div>

                <div className="px-6 py-6">
                    {isError && error && (
                        <div className="mb-4 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-md">
                            <AlertCircle
                                size={16}
                                className="text-red-500 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-red-700 leading-snug flex-1">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            error={errors.fullName}
                            disabled={isLoading}
                            autoComplete="name"
                        />

                        <Input
                            label="Mobile Number"
                            placeholder="10-digit mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleChange("mobile", e.target.value)}
                            error={errors.mobile}
                            disabled={isLoading}
                            autoComplete="tel"
                        />

                        <Input
                            label="Email Address"
                            placeholder="you@example.com"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            error={errors.email}
                            disabled={isLoading}
                            autoComplete="email"
                        />

                        <div>
                            <Input
                                label="Referral ID (optional)"
                                placeholder="SRI1234"
                                value={formData.referralId}
                                onChange={(e) =>
                                    handleChange("referralId", e.target.value.toUpperCase())
                                }
                                error={errors.referralId}
                                disabled={isLoading}
                            />

                            {formData.referralId && formData.referralId.length >= 8 && (
                                <div className="mt-2 text-xs">
                                    {isValidating && (
                                        <p className="text-gray-500">Checking referral...</p>
                                    )}
                                    {!isValidating &&
                                        validation?.valid &&
                                        validation.sponsor && (
                                            <div className="flex items-start gap-2 px-2.5 py-2 bg-green-50 border border-green-200 rounded-md">
                                                <Check
                                                    size={14}
                                                    className="text-green-600 shrink-0 mt-0.5"
                                                />
                                                <div>
                                                    <p className="text-green-800 font-medium">
                                                        {validation.sponsor.name}
                                                    </p>
                                                    <p className="text-green-700 text-xs">
                                                        Level {validation.sponsor.level} ·{" "}
                                                        {validation.sponsor.hasAvailableSlots
                                                            ? "Slots available"
                                                            : "Will spill over"}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    {!isValidating &&
                                        validation &&
                                        !validation.valid &&
                                        validation.message && (
                                            <div className="flex items-start gap-2 px-2.5 py-2 bg-red-50 border border-red-200 rounded-md">
                                                <AlertCircle
                                                    size={14}
                                                    className="text-red-500 shrink-0 mt-0.5"
                                                />
                                                <p className="text-red-700">{validation.message}</p>
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>

                        <Input
                            label="Password"
                            placeholder="Min 8 chars, 1 upper, 1 number"
                            isPassword
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            error={errors.password}
                            disabled={isLoading}
                            autoComplete="new-password"
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="Re-enter password"
                            isPassword
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                handleChange("confirmPassword", e.target.value)
                            }
                            error={errors.confirmPassword}
                            disabled={isLoading}
                            autoComplete="new-password"
                        />

                        <div>
                            <label className="flex items-start gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptTerms as unknown as boolean}
                                    onChange={(e) =>
                                        handleChange(
                                            "acceptTerms",
                                            e.target.checked as unknown as true
                                        )
                                    }
                                    className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#0EA5E9] cursor-pointer"
                                    disabled={isLoading}
                                />
                                <span className="text-xs text-gray-700 leading-relaxed">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms?from=register"
                                        className="text-[#0EA5E9] hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy?from=register"
                                        className="text-[#0EA5E9] hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {errors.acceptTerms && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.acceptTerms}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isLoading}
                            className="!py-2.5 !text-sm !font-semibold"
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-5">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#0EA5E9] font-semibold hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}