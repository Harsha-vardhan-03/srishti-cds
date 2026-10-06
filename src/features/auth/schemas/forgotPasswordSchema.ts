import { z } from "zod";

const MOBILE_REGEX = /^\d{10}$/;
const OTP_REGEX = /^\d{6}$/;

export const forgotEmailSchema = z.object({
    userIdOrMobile: z
        .string()
        .trim()
        .nonempty("Enter your User ID or mobile number")
        .refine(
            (val) =>
                /^SRI\d{4}$/i.test(val) || MOBILE_REGEX.test(val),
            { message: "Use format SRI1234 or 10-digit mobile" }
        ),
});

export const otpSchema = z.object({
    otp: z
        .string()
        .trim()
        .nonempty("Enter the OTP")
        .regex(OTP_REGEX, "OTP must be exactly 6 digits"),
});

export const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .nonempty("Enter a new password")
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Include at least one uppercase letter")
            .regex(/[a-z]/, "Include at least one lowercase letter")
            .regex(/\d/, "Include at least one number"),
        confirmPassword: z.string().nonempty("Confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type ForgotEmailInput = z.infer<typeof forgotEmailSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export type ForgotEmailErrors = Partial<Record<keyof ForgotEmailInput, string>>;
export type OtpErrors = Partial<Record<keyof OtpInput, string>>;
export type ResetPasswordErrors = Partial<
    Record<keyof ResetPasswordInput, string>
>;

function collectErrors<T extends Record<string, unknown>>(
    result: { success: false; error: z.ZodError } | { success: true; data: T }
): Partial<Record<keyof T, string>> {
    if (result.success) return {};
    const errors: Partial<Record<keyof T, string>> = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof T;
        if (!errors[field]) errors[field] = issue.message;
    }
    return errors;
}

export function validateForgotEmail(data: ForgotEmailInput): ForgotEmailErrors {
    return collectErrors(forgotEmailSchema.safeParse(data));
}

export function validateOtp(data: OtpInput): OtpErrors {
    return collectErrors(otpSchema.safeParse(data));
}

export function validateResetPassword(
    data: ResetPasswordInput
): ResetPasswordErrors {
    return collectErrors(resetPasswordSchema.safeParse(data));
}