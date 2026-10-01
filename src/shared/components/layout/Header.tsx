"use client";

import { Menu } from "lucide-react";
import { ProfileMenu } from "@/features/dashboard/components/ProfileMenu";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-[#0f3d3e] text-white h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 sticky top-0 z-30 shadow-md">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                    onClick={onMenuClick}
                    className="p-1.5 sm:p-2 rounded-md hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>
                <h1 className="text-base sm:text-lg font-bold tracking-wide text-yellow-300 truncate">
                    SRISHTI CDS
                </h1>
            </div>

            <ProfileMenu />
        </header>
    );
}