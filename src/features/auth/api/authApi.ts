import { axiosClient } from "@/shared/lib/axiosClient";
import {
    LoginPayload,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
    ReferralValidationResponse,
    ForgotPasswordPayload,
    ForgotPasswordResponse,
    VerifyOtpPayload,
    VerifyOtpResponse,
    ResetPasswordPayload,
    ResetPasswordResponse,
} from "../types";

const USE_DUMMY_DATA = process.env.NEXT_PUBLIC_USE_DUMMY_AUTH === "true";

const DUMMY_USER = {
    userId: "SRI0461",
    registerId: "472",
    name: "Gogada Chinababu",
    mobile: "9876543210",
    level: 2,
};

const DUMMY_CREDENTIALS = {
    userIdOrMobile: "SRI0461",
    password: "srishti123",
};

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
    if (USE_DUMMY_DATA) {
        return simulateLogin(payload);
    }

    const response = await axiosClient.post<LoginResponse>("/auth/login", {
        userIdOrMobile: payload.userIdOrMobile,
        password: payload.password,
    });
    return response.data;
}

function simulateLogin(payload: LoginPayload): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isUserMatch =
                payload.userIdOrMobile.trim().toLowerCase() ===
                DUMMY_CREDENTIALS.userIdOrMobile.toLowerCase();
            const isPasswordMatch =
                payload.password === DUMMY_CREDENTIALS.password;

            if (isUserMatch && isPasswordMatch) {
                resolve({
                    success: true,
                    message: "Login successful",
                    token: "dummy-jwt-token-" + Date.now(),
                    user: DUMMY_USER,
                });
                return;
            }

            reject({
                message: "Invalid User ID or Password. Please try again.",
                status: 401,
            });
        }, 1200);
    });
}

const MOCK_SPONSORS: Record<
    string,
    { userId: string; name: string; level: number; childrenCount: number }
> = {
    SRI0001: { userId: "SRI0001", name: "Ravi Kumar", level: 1, childrenCount: 2 },
    SRI5858: {
        userId: "SRI5858",
        name: "Gogada Chinababu",
        level: 2,
        childrenCount: 3,
    },
    SRI2041: {
        userId: "SRI2041",
        name: "R.Swathi Reddy",
        level: 3,
        childrenCount: 0,
    },
    SRI9568: { userId: "SRI9568", name: "T.Nirmala", level: 2, childrenCount: 1 },
};

export async function validateReferralId(
    referralId: string
): Promise<ReferralValidationResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const key = referralId.trim().toUpperCase();
    const sponsor = MOCK_SPONSORS[key];

    if (!sponsor) {
        return {
            valid: false,
            message: "Referral ID not found. Please check and try again.",
        };
    }

    return {
        valid: true,
        sponsor: {
            userId: sponsor.userId,
            name: sponsor.name,
            level: sponsor.level,
            hasAvailableSlots: sponsor.childrenCount < 3,
        },
    };
}

function generateUserId(): string {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `SRI${num}`;
}

function generateRegisterId(): string {
    const num = Math.floor(100 + Math.random() * 900);
    return String(num);
}

function findPlacementSlot(
    sponsorId: string,
    depth: number = 0
): { parentId: string; position: "LEFT" | "MIDDLE" | "RIGHT" } | null {
    if (depth > 5) return null;

    const sponsor = MOCK_SPONSORS[sponsorId.toUpperCase()];
    if (!sponsor) return null;

    if (sponsor.childrenCount < 1) {
        return { parentId: sponsor.userId, position: "LEFT" };
    }
    if (sponsor.childrenCount < 2) {
        return { parentId: sponsor.userId, position: "MIDDLE" };
    }
    if (sponsor.childrenCount < 3) {
        return { parentId: sponsor.userId, position: "RIGHT" };
    }

    return { parentId: sponsor.userId, position: "LEFT" };
}

export async function registerUser(
    payload: RegisterPayload
): Promise<RegisterResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const takenMobiles = ["9876543210"];
    if (takenMobiles.includes(payload.mobile)) {
        throw {
            message: "This mobile number is already registered.",
            status: 409,
        };
    }

    const takenEmails = ["chinababu@example.com"];
    if (takenEmails.includes(payload.email.toLowerCase())) {
        throw {
            message: "This email is already registered.",
            status: 409,
        };
    }

    let sponsorId: string | null = null;
    let sponsorName: string | null = null;
    let placementType: "LEFT" | "MIDDLE" | "RIGHT" | "ROOT" = "ROOT";

    if (payload.referralId && payload.referralId.trim()) {
        const validation = await validateReferralId(payload.referralId);
        if (!validation.valid || !validation.sponsor) {
            throw {
                message: validation.message || "Invalid referral ID.",
                status: 400,
            };
        }
        sponsorId = validation.sponsor.userId;
        sponsorName = validation.sponsor.name;

        const placement = findPlacementSlot(sponsorId);
        if (!placement) {
            throw {
                message: "Could not find placement slot. Please try again.",
                status: 500,
            };
        }
        placementType = placement.position;
    }

    const userId = generateUserId();
    const registerId = generateRegisterId();

    return {
        success: true,
        message: "Registration successful",
        user: {
            userId,
            registerId,
            name: payload.fullName,
            mobile: payload.mobile,
            email: payload.email,
            level: sponsorId ? 2 : 1,
            sponsorId,
            sponsorName,
            placementType,
        },
    };
}

const MOCK_OTP = "123456";

export async function forgotPassword(
    payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> {
    if (USE_DUMMY_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            success: true,
            message: "OTP sent to your registered mobile number.",
        };
    }
    const response = await axiosClient.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        payload
    );
    return response.data;
}

export async function verifyOtp(
    payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> {
    if (USE_DUMMY_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (payload.otp !== MOCK_OTP) {
            throw { message: "Invalid OTP. Please try again.", status: 400 };
        }
        return {
            success: true,
            message: "OTP verified successfully.",
            resetToken: "mock-reset-token-" + Date.now(),
        };
    }
    const response = await axiosClient.post<VerifyOtpResponse>(
        "/auth/verify-otp",
        payload
    );
    return response.data;
}

export async function resetPassword(
    payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
    if (USE_DUMMY_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            success: true,
            message: "Password reset successfully. Please log in.",
        };
    }
    const response = await axiosClient.post<ResetPasswordResponse>(
        "/auth/reset-password",
        payload
    );
    return response.data;
}