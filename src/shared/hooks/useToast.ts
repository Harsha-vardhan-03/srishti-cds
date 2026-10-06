"use client";

import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    duration: number;
}

interface ToastState {
    toasts: ToastItem[];
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],

    addToast: (type, message, duration = 4000) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const toast: ToastItem = { id, type, message, duration };

        set((state) => ({ toasts: [...state.toasts, toast] }));

        if (duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id),
                }));
            }, duration);
        }
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },
}));

export function useToast() {
    const addToast = useToastStore((state) => state.addToast);

    return {
        success: (message: string, duration?: number) =>
            addToast("success", message, duration),
        error: (message: string, duration?: number) =>
            addToast("error", message, duration),
        info: (message: string, duration?: number) =>
            addToast("info", message, duration),
    };
}