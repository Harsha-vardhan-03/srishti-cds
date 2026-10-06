import { z } from "zod";

const USER_ID_REGEX = /^SRI\d{4}$/i;
const MOBILE_REGEX = /^\d{10}$/;
const NAME_REGEX = /^[A-Za-z\s.]{2,60}$/;

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .nonempty("Enter your full name")
            .regex(NAME_REGEX, "Use letters, spaces, and periods only")
            .min(2, "Name must be at least 2 characters"),

        mobile: z
            .string()
            .trim()
            .nonempty("Enter your mobile number")
            .regex(MOBILE_REGEX, "Mobile must be exactly 10 digits"),

        email: z
            .string()
            .trim()
            .nonempty("Enter your email address")
            .email("Enter a valid email address"),

        referralId: z
            .string()
            .trim()
            .optional()
            .refine((val) => !val || USER_ID_REGEX.test(val), {
                message: "Use format SRI1234 or leave blank",
            }),

        password: z
            .string()
            .nonempty("Enter a password")
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Include at least one uppercase letter")
            .regex(/[a-z]/, "Include at least one lowercase letter")
            .regex(/\d/, "Include at least one number"),

        confirmPassword: z.string().nonempty("Confirm your password"),

        acceptTerms: z.literal(true, {
            errorMap: () => ({ message: "You must accept the terms to register" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterPayloadInput = z.infer<typeof registerSchema>;
export type RegisterFormErrors = Partial<
    Record<keyof RegisterPayloadInput, string>
>;

export function validateRegisterForm(
    data: RegisterPayloadInput
): RegisterFormErrors {
    const result = registerSchema.safeParse(data);
    if (result.success) return {};

    const errors: RegisterFormErrors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterPayloadInput;
        if (!errors[field]) errors[field] = issue.message;
    }
    return errors;
}