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
        "bg-srishti-blue text-white hover:bg-srishti-blue-dark disabled:bg-srishti-blue/50",
    secondary:
        "bg-srishti-dark text-white hover:bg-srishti-dark/90 disabled:bg-srishti-dark/50",
    ghost:
        "bg-transparent text-srishti-dark hover:bg-srishti-dark/5",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
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
            "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-srishti-blue disabled:cursor-not-allowed";

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