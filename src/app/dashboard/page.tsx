"use client";

import { User, Trophy } from "lucide-react";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useAuthStore } from "@/shared/store/authStore";

export default function DashboardPage() {
    const { user } = useAuthStore();
    const { stats, isLoading, isError, error } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-[#0EA5E9] border-t-transparent rounded-full" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">
                    {error?.message || "Failed to load dashboard data."}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 break-words">
                    Welcome, {user?.name || "User"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                    User ID: {user?.userId || "-"} | Register ID: {user?.registerId || "-"}
                </p>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <StatCard
                    label="User Id"
                    value={stats?.displayedUserId || "-"}
                    color="blue"
                    icon={User}
                />
                <StatCard
                    label="Completed Levels"
                    value={stats?.completedLevels ?? 0}
                    color="purple"
                    icon={Trophy}
                />
            </div>
        </div>
    );
}