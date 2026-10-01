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
                <div className="animate-spin h-8 w-8 border-4 border-srishti-blue border-t-transparent rounded-full" />
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
        <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                    <div className="min-w-0">
                        <h1 className="text-lg sm:text-2xl font-bold text-srishti-dark break-words">
                            Welcome, {user?.name || "User"}
                        </h1>
                        <p className="text-xs sm:text-sm text-srishti-gray mt-1 break-words">
                            User ID: {user?.userId || "-"} | Register ID: {user?.registerId || "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
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

            {/* Info Card */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-srishti-dark mb-2">
                    Quick Start
                </h2>
                <p className="text-srishti-gray text-xs sm:text-sm">
                    Use the menu to explore Network Tree, My Referrals, and Total Team.
                </p>
            </div>
        </div>
    );
}