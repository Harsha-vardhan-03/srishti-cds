import { z } from "zod";


export const loginSchema = z.object({
    userIdOrMobile: z
        .string()
        .trim()
        .min(3, "Must be at least 3 characters.")
        .max(50, "Must be at most 50 characters.")
        .nonempty("User ID or Mobile Number is required."),

    password: z
        .string()
        .min(4, "Password must be at least 4 characters.")
        .max(100, "Password must be at most 100 characters.")
        .nonempty("Password is required."),

    rememberMe: z.boolean().default(false),
});


export type LoginPayloadInput = z.infer<typeof loginSchema>;
export type LoginFormErrors = Partial<Record<keyof LoginPayloadInput, string>>;


export function validateLoginForm(data: LoginPayloadInput): LoginFormErrors {
    const result = loginSchema.safeParse(data);

    if (result.success) return {};

    const errors: LoginFormErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginPayloadInput;
        if (!errors[field]) {
            errors[field] = issue.message;
        }
    }
    return errors;
}