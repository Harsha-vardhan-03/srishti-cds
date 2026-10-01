"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-[#0EA5E9] text-white hover:bg-[#0284C7] active:bg-[#0369A1] disabled:bg-[#0EA5E9]/60",
    secondary:
        "bg-srishti-dark text-white hover:bg-srishti-dark/90 active:bg-srishti-dark/80 disabled:bg-srishti-dark/60",
    ghost:
        "bg-transparent text-srishti-dark hover:bg-srishti-dark/5 active:bg-srishti-dark/10",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-3.5 py-2 text-[13px]",
    lg: "px-4 py-2.5 text-[14px]",
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            disabled,
            className = "",
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] disabled:cursor-not-allowed";

        const classes = [
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            fullWidth ? "w-full" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <button
                ref={ref}
                className={classes}
                disabled={disabled || isLoading}
                aria-busy={isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";