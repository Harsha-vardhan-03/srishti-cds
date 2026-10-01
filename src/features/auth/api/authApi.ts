import { axiosClient } from "@/shared/lib/axiosClient";
import { LoginPayload, LoginResponse } from "../types";

// Dummy mode is enabled ONLY when the environment variable is set.
// In production, set NEXT_PUBLIC_USE_DUMMY_AUTH=false (or omit it).
const USE_DUMMY_DATA = process.env.NEXT_PUBLIC_USE_DUMMY_AUTH === "true";

// ⚠️ These exist ONLY for local development.
// In production, credentials are validated by the real backend.
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
            const isPasswordMatch = payload.password === DUMMY_CREDENTIALS.password;

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