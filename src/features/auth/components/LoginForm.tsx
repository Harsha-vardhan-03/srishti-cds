"use client";

import { useState, FormEvent } from "react";
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

    const handleChange = (field: keyof LoginPayloadInput, value: string | boolean) => {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-srishti-orange to-srishti-orange-light p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8">
                <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 border-2 border-srishti-orange rounded-md flex items-center justify-center">
                        <span className="text-srishti-orange font-bold text-lg text-center leading-tight">
                            SRISHTI
                            <br />
                            <span className="text-xs font-normal">CDS</span>
                        </span>
                    </div>
                </div>

                <p className="text-center text-srishti-gray text-sm mb-6">
                    Login to continue with Srishti CDS
                </p>

                {isError && error && (
                    <div
                        className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"
                        role="alert"
                    >
                        <p className="text-sm text-red-700">{error.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <Input
                        label="User ID / Mobile Number"
                        placeholder="User Id"
                        value={formData.userIdOrMobile}
                        onChange={(e) => handleChange("userIdOrMobile", e.target.value)}
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

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={formData.rememberMe}
                            onChange={(e) => handleChange("rememberMe", e.target.checked)}
                            className="w-4 h-4 text-srishti-blue border-gray-300 rounded focus:ring-srishti-blue"
                            disabled={isLoading}
                        />
                        <label
                            htmlFor="rememberMe"
                            className="text-sm text-srishti-blue cursor-pointer select-none"
                        >
                            Remember Me
                        </label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                </form>

                <div className="mt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={() => {
                            alert("Brochure download coming soon.");
                        }}
                    >
                        ⬇ Download Brochure
                    </Button>
                </div>
            </div>
        </div>
    );
}