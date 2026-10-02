"use client";

import { LucideIcon } from "lucide-react";

type StatCardColor = "blue" | "purple";

interface StatCardProps {
    label: string;
    value: string | number;
    color: StatCardColor;
    icon?: LucideIcon;
}

const COLOR_STYLES: Record<StatCardColor, string> = {
    blue: "bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]",
    purple: "bg-gradient-to-br from-[#A855F7] to-[#7E22CE]",
};

export function StatCard({ label, value, color, icon: Icon }: StatCardProps) {
    return (
        <div
            className={`${COLOR_STYLES[color]} rounded-lg p-6 text-white shadow-lg`}
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                    {Icon && <Icon size={48} strokeWidth={1.5} />}
                    <span className="text-sm font-medium opacity-90">{label}</span>
                </div>
                <span className="text-4xl font-bold">{value}</span>
            </div>
        </div>
    );
}