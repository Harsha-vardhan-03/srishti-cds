"use client";

import { LucideIcon } from "lucide-react";

type StatCardColor = "blue" | "purple";

interface StatCardProps {
    label: string;
    value: string | number;
    color: StatCardColor;
    icon?: LucideIcon;
}

const colorStyles: Record<StatCardColor, string> = {
    blue: "bg-gradient-to-br from-srishti-blue to-srishti-blue-dark",
    purple: "bg-gradient-to-br from-purple-500 to-purple-700",
};

export function StatCard({ label, value, color, icon: Icon }: StatCardProps) {
    return (
        <div
            className={`${colorStyles[color]} rounded-lg p-6 text-white shadow-lg relative overflow-hidden`}
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