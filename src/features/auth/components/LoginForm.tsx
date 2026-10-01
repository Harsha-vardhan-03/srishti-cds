"use client";

import { useState, FormEvent } from "react";
import { Download } from "lucide-react";
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

        const validationErrors = validateLoginForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        login(formData);
    };

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-b from-[#FFA726] via-[#FB8C00] to-[#F57C00] px-3 py-4 sm:px-4">
            <div className="w-full max-w-[380px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] px-5 py-5 sm:px-7 sm:py-6">
                {/* Logo — compact */}
                <div className="flex justify-center mb-3">
                    <div className="w-[70px] h-[70px] border-2 border-[#E55A1B] rounded-lg flex flex-col items-center justify-center bg-white">
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

                {/* Subtitle */}
                <p className="text-center text-gray-500 text-[12px] mb-4">
                    Login to continue with Srishti CDS
                </p>

                {/* Error Alert */}
                {isError && error && (
                    <div
                        className="mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-md"
                        role="alert"
                    >
                        <p className="text-[12px] text-red-700 leading-snug">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                    <Input
                        label="User ID / Mobile Number"
                        placeholder="User Id"
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
                        placeholder="Password"
                        isPassword
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        error={errors.password}
                        autoComplete="current-password"
                        disabled={isLoading}
                    />

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
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
                        <label
                            htmlFor="rememberMe"
                            className="text-[14px] text-[#0EA5E9] font-medium cursor-pointer select-none"
                        >
                            Remember Me
                        </label>
                    </div>

                    {/* Log In */}
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

                {/* Download Brochure */}
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