"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, Users, Network, LogOut } from "lucide-react";
import { useAuthStore } from "@/shared/store/authStore";

export function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user, clearAuth } = useAuthStore();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

    const menuItems = [
        {
            label: "My Profile",
            icon: UserIcon,
            action: () => router.push("/dashboard/profile"),
        },
        {
            label: "My Referrals",
            icon: Users,
            action: () => router.push("/dashboard/referrals"),
        },
        {
            label: "Total Team",
            icon: Network,
            action: () => router.push("/dashboard/team"),
        },
        { label: "Log Out", icon: LogOut, action: handleLogout },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white rounded"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <div className="w-9 h-9 rounded-full bg-srishti-blue flex items-center justify-center shrink-0">
                    <UserIcon size={20} />
                </div>
                <span className="hidden md:inline text-sm font-medium">Profile</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-srishti-blue flex items-center justify-center text-white shrink-0">
                                <UserIcon size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-srishti-dark truncate">
                                    {user?.name || "User"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                onClick={() => {
                                    item.action();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-srishti-dark hover:bg-gray-50 transition-colors text-left"
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}