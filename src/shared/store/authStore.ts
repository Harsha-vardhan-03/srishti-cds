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
            name: "srishti-auth-storage", 
        }
    )
);