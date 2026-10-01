import { z } from "zod";

// ============================================================
// VALIDATION PATTERNS
// ============================================================
// User ID: "SRI" + exactly 4 digits (e.g., SRI0461) — case-insensitive
const USER_ID_REGEX = /^SRI\d{4}$/i;

// Mobile: exactly 10 digits (Indian mobile format)
const MOBILE_REGEX = /^\d{10}$/;

// ============================================================
// SCHEMA
// ============================================================
export const loginSchema = z.object({
    userIdOrMobile: z
        .string()
        .trim()
        .nonempty("Enter your User ID or mobile number")
        .refine(
            (val) => USER_ID_REGEX.test(val) || MOBILE_REGEX.test(val),
            {
                message: "Use format SRI1234 or 10-digit mobile",
            }
        ),

    password: z
        .string()
        .nonempty("Enter your password")
        .min(6, "Password must be at least 6 characters"),

    rememberMe: z.boolean().default(false),
});

// ============================================================
// INFERRED TYPES
// ============================================================
export type LoginPayloadInput = z.infer<typeof loginSchema>;
export type LoginFormErrors = Partial<Record<keyof LoginPayloadInput, string>>;

// ============================================================
// VALIDATION HELPER
// ============================================================
export function validateLoginForm(data: LoginPayloadInput): LoginFormErrors {
    const result = loginSchema.safeParse(data);
    if (result.success) return {};

    const errors: LoginFormErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginPayloadInput;
        if (!errors[field]) errors[field] = issue.message;
    }
    return errors;
}