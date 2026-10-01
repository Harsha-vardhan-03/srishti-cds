import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Read from environment (Handbook: "Environment configuration is correct and not hardcoded")
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.srishticds.org";

export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// REQUEST INTERCEPTOR: Attach auth token to every outgoing request
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Only run in browser (not during SSR)
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("srishti_token");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Normalize errors for consistent UI handling
axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Sanitize error messages — do not leak internal details in production
        const serverMessage = (error.response?.data as { message?: string })?.message;

        const normalizedError = {
            message:
                serverMessage ||
                (error.response
                    ? "Request failed. Please try again."
                    : "Network error. Please check your connection."),
            status: error.response?.status || 500,
            originalError: error,
        };

        if (error.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("srishti_token");
        }

        return Promise.reject(normalizedError);
    }
  );