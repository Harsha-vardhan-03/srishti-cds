"use client";

import { useState, FormEvent } from "react";
import { Download, AlertCircle } from "lucide-react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import {
    validateLoginForm,
    LoginFormErrors,
    LoginPayloadInput,
} from "../schemas/loginSchema";

export function LoginForm() {
    const [formData, setFormData] = useState<LoginPayloadInput>({
        userIdOrMobile: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});

    const { login, isLoading, isError, error } = useLogin();

    const handleChange = (
        field: keyof LoginPayloadInput,
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

        const validationErrors = validateLoginForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        login(formData);
    };

    
    const hasFieldErrors = Object.values(errors).some(Boolean);
    const showApiError = isError && error && !hasFieldErrors;

    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center px-3 py-4 sm:px-4 overflow-hidden bg-gradient-to-br from-[#FFB74D] via-[#FB8C00] to-[#E65100]">
            
            <div
                aria-hidden="true"
                className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFCC80] opacity-40 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FFE0B2] opacity-30 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#FFF3E0] opacity-20 blur-3xl"
            />

            
            <div className="relative w-full max-w-[380px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] px-5 py-5 sm:px-7 sm:py-6">
                
                <div className="flex justify-center mb-3">
                    <div className="w-[70px] h-[70px] border-2 border-[#E55A1B] rounded-lg flex flex-col items-center justify-center bg-white shadow-sm">
                        <span className="text-[#E55A1B] font-extrabold text-[13px] tracking-wide leading-none mb-0.5">
                            SRISHTI
                        </span>
                        <span className="text-[#E55A1B] text-[6px] font-medium text-center leading-tight uppercase tracking-wider">
                            Community
                            <br />
                            Development
                            <br />
                            Society
                        </span>
                    </div>
                </div>

                <p className="text-center text-gray-500 text-[12px] mb-4">
                    Login to continue with Srishti CDS
                </p>

                {showApiError && (
                    <div
                        className="mb-4 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-md"
                        role="alert"
                    >
                        <AlertCircle
                            size={16}
                            className="text-red-500 shrink-0 mt-0.5"
                            aria-hidden="true"
                        />
                        <p className="text-[12px] text-red-700 leading-snug flex-1">
                            {error.message}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                    <Input
                        label="User ID / Mobile Number"
                        placeholder="Enter user ID or mobile number"
                        value={formData.userIdOrMobile}
                        onChange={(e) =>
                            handleChange("userIdOrMobile", e.target.value)
                        }
                        error={errors.userIdOrMobile}
                        autoComplete="username"
                        disabled={isLoading}
                    />

                    <Input
                        label="Password"
                        placeholder="Enter password"
                        isPassword
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        error={errors.password}
                        autoComplete="current-password"
                        disabled={isLoading}
                    />

                    
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="rememberMe"
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={formData.rememberMe}
                                onChange={(e) =>
                                    handleChange("rememberMe", e.target.checked)
                                }
                                className="
                  w-4 h-4 rounded
                  border border-gray-300
                  accent-[#0EA5E9]
                  cursor-pointer
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#0EA5E9]
                  disabled:cursor-not-allowed disabled:opacity-60
                "
                                disabled={isLoading}
                            />
                            <span className="text-[13px] text-gray-700 font-medium">
                                Remember me
                            </span>
                        </label>

                        <button
                            type="button"
                            onClick={() => alert("Password reset coming soon.")}
                            className="text-[13px] text-[#0EA5E9] font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] rounded"
                        >
                            Forgot?
                        </button>
                    </div>

                    
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isLoading}
                        className="!py-2.5 !text-[14px] !font-semibold !rounded-md"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                </form>

               
                <button
                    type="button"
                    onClick={() => alert("Brochure download coming soon.")}
                    className="
            mt-3 w-full py-2.5 rounded-md
            bg-black text-white
            font-semibold text-[14px]
            flex items-center justify-center gap-2
            transition-colors duration-150
            hover:bg-neutral-900
            active:bg-neutral-800
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#0EA5E9]
          "
                >
                    <Download size={16} strokeWidth={2.5} aria-hidden="true" />
                    Download Brochure
                </button>
            </div>
        </div>
    );
}