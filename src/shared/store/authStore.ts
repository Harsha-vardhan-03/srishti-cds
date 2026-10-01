import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
    userId: string;      // e.g., "SR10339"
    registerId: string;  // e.g., "472"
    name: string;        // e.g., "Gogada Chinababu"
    mobile: string;
    level: number;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: AuthUser, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (user, token) => {
                // Persist token for Axios interceptor
                if (typeof window !== "undefined") {
                    localStorage.setItem("srishti_token", token);
                }
                set({ user, token, isAuthenticated: true });
            },

            logout: () => {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("srishti_token");
                }
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: "srishti-auth-storage", // Key in localStorage
        }
    )
);