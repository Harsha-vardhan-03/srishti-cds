
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