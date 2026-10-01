"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Network,
    Users,
    UsersRound,
    GitBranch,
    User,
    Headphones,
    LogOut,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/shared/store/authStore";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SubMenuItem {
    label: string;
    href: string;
}

interface MenuItem {
    label: string;
    icon: React.ComponentType<{ size?: number }>;
    href?: string;
    submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Network Tree", icon: Network, href: "/dashboard/network-tree" },
    { label: "My Referrals", icon: Users, href: "/dashboard/referrals" },
    { label: "Total Team", icon: UsersRound, href: "/dashboard/team" },
    {
        label: "Network Details",
        icon: GitBranch,
        submenu: [
            {
                label: "Completed Profiles",
                href: "/dashboard/network-details/completed",
            },
            {
                label: "Balance Profiles",
                href: "/dashboard/network-details/balance",
            },
        ],
    },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Support", icon: Headphones, href: "/dashboard/support" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);
    const [networkDetailsOpen, setNetworkDetailsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const handleNavigate = (href: string) => {
        router.push(href);
        onClose();
    };

    return (
        <>
            
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                
                <div className="flex justify-end p-3 lg:hidden">
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="p-1 rounded-md hover:bg-white/10"
                    >
                        <X size={22} />
                    </button>
                </div>

                
                <div className="text-center py-5 border-b border-white/10 shrink-0">
                    <h2 className="text-lg font-semibold tracking-wider">SRISHTI</h2>
                </div>

                
                <nav className="flex-1 overflow-y-auto mt-3 flex flex-col gap-1 px-2 pb-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href ? pathname === item.href : false;

                        if (item.submenu) {
                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() => setNetworkDetailsOpen((prev) => !prev)}
                                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-md text-sm hover:bg-white/10 transition-colors text-left"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon size={18} />
                                            {item.label}
                                        </span>
                                        {networkDetailsOpen ? (
                                            <ChevronUp size={16} />
                                        ) : (
                                            <ChevronDown size={16} />
                                        )}
                                    </button>

                                    {networkDetailsOpen && (
                                        <div className="ml-8 mt-1 flex flex-col gap-1">
                                            {item.submenu.map((sub) => (
                                                <button
                                                    key={sub.label}
                                                    onClick={() => handleNavigate(sub.href)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors text-left ${pathname === sub.href
                                                            ? "bg-white/20 font-medium"
                                                            : "hover:bg-white/10"
                                                        }`}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                                    {sub.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <button
                                key={item.label}
                                onClick={() => item.href && handleNavigate(item.href)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors text-left ${isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                
                <div className="shrink-0 p-2 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm hover:bg-white/10 transition-colors text-left"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}