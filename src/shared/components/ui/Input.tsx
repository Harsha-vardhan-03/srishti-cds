"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    isPassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { label, error, helperText, isPassword = false, id, className = "", ...props },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
        const errorId = `${inputId}-error`;
        const helperId = `${inputId}-helper`;

        const inputType = isPassword ? (showPassword ? "text" : "password") : props.type;

        const baseInputStyles =
            "w-full rounded-md border px-3 py-2.5 text-base transition-colors focus:outline-none focus:ring-2";
        const normalStyles =
            "border-gray-300 focus:border-srishti-blue focus:ring-srishti-blue/20";
        const errorStyles =
            "border-red-500 focus:border-red-500 focus:ring-red-500/20";

        const inputClasses = [
            baseInputStyles,
            error ? errorStyles : normalStyles,
            isPassword ? "pr-10" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div className="w-full">
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-srishti-dark mb-1.5"
                >
                    {label}
                </label>

                <div className="relative">
                    <input
                        ref={ref}
                        id={inputId}
                        type={inputType}
                        className={inputClasses}
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : helperText ? helperId : undefined}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-srishti-dark focus-visible:outline-2 focus-visible:outline-srishti-blue rounded"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>

                {error && (
                    <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p id={helperId} className="mt-1.5 text-sm text-srishti-gray">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";