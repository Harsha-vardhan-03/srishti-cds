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
        {
            label,
            error,
            helperText,
            isPassword = false,
            id,
            className = "",
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const inputId =
            id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
        const errorId = `${inputId}-error`;
        const helperId = `${inputId}-helper`;

        const inputType = isPassword
            ? showPassword
                ? "text"
                : "password"
            : props.type;

        // Base styles — shared across all states
        const baseInputStyles =
            "w-full rounded-md border bg-white px-3 py-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

        // Default (unfocused) + focus styles
        const normalStyles =
            "border-gray-300 hover:border-gray-400 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/15";

        // Error state
        const errorStyles =
            "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15";

        const inputClasses = [
            baseInputStyles,
            error ? errorStyles : normalStyles,
            isPassword ? "pr-11" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div className="w-full">
                <label
                    htmlFor={inputId}
                    className="block text-[15px] font-medium text-gray-800 mb-1.5"
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
                        aria-describedby={
                            error ? errorId : helperText ? helperId : undefined
                        }
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-700
                rounded
                p-0.5
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#0EA5E9]
                transition-colors duration-150
              "
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>

                {error && (
                    <p
                        id={errorId}
                        className="mt-1.5 text-[13px] text-red-600 leading-snug"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p id={helperId} className="mt-1.5 text-[13px] text-gray-500">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";