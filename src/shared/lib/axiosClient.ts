import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

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

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        
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

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
       
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