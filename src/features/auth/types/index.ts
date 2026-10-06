
export interface LoginPayload {
    userIdOrMobile: string;
    password: string;
    rememberMe: boolean;
}

export interface AuthUserResponse {
    userId: string;      
    registerId: string;  
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
export interface RegisterPayload {
    fullName: string;
    mobile: string;
    email: string;
    referralId?: string;
    password: string;
}

export interface RegisteredUser {
    userId: string;
    registerId: string;
    name: string;
    mobile: string;
    email: string;
    level: number;
    sponsorId: string | null;
    sponsorName: string | null;
    placementType: "LEFT" | "MIDDLE" | "RIGHT" | "ROOT";
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: RegisteredUser;
}

export interface ReferralValidationResponse {
    valid: boolean;
    sponsor?: {
        userId: string;
        name: string;
        level: number;
        hasAvailableSlots: boolean;
    };
    message?: string;
  }
export interface ForgotPasswordPayload {
    userIdOrMobile: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
}

export interface VerifyOtpPayload {
    userIdOrMobile: string;
    otp: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string;
    resetToken: string;
}

export interface ResetPasswordPayload {
    resetToken: string;
    newPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
  }