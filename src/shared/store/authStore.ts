import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
    userId: string;
    registerId: string;
    name: string;
    mobile: string;
    level: number;
}

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    setAuthenticatedUser: (user: AuthUser) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setAuthenticatedUser: (user) => {
                set({ user, isAuthenticated: true });
            },

            clearAuth: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: "srishti-auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);