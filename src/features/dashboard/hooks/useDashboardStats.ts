"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../api/dashboardApi";
import { DashboardStats } from "../types";

export function useDashboardStats() {
    const query = useQuery<DashboardStats, Error>({
        queryKey: ["dashboard", "stats"],
        queryFn: fetchDashboardStats,
        staleTime: 60 * 1000,
    });

    return {
        stats: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}