"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore, ToastItem } from "@/shared/hooks/useToast";

const TOAST_STYLES: Record<
    ToastItem["type"],
    { bg: string; border: string; text: string; Icon: typeof CheckCircle2 }
> = {
    success: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        Icon: CheckCircle2,
    },
    error: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        Icon: AlertCircle,
    },
    info: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        Icon: Info,
    },
};

export function Toaster() {
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);

    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm pointer-events-none"
            role="region"
            aria-label="Notifications"
            aria-live="polite"
        >
            {toasts.map((toast) => {
                const { bg, border, text, Icon } = TOAST_STYLES[toast.type];
                return (
                    <div
                        key={toast.id}
                        className={`${bg} ${border} border rounded-lg shadow-lg p-3.5 flex items-start gap-2.5 pointer-events-auto animate-in slide-in-from-top-2 duration-200`}
                    >
                        <Icon size={18} className={`${text} shrink-0 mt-0.5`} />
                        <p className={`text-sm ${text} flex-1 leading-snug`}>
                            {toast.message}
                        </p>
                        <button
                            type="button"
                            onClick={() => removeToast(toast.id)}
                            className={`${text} hover:opacity-70 transition-opacity shrink-0`}
                            aria-label="Dismiss notification"
                        >
                            <X size={14} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}