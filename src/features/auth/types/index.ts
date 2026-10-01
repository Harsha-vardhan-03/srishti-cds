
export interface LoginPayload {
    userIdOrMobile: string;
    password: string;
    rememberMe: boolean;
}

export interface AuthUserResponse {
    userId: string;      // "SRI0461"
    registerId: string;  // "472"
    name: string;
    mobile: string;
    level: number;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: AuthUserResponse;
}

export interface ApiError {
    message: string;
    status: number;
}