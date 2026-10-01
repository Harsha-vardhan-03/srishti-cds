import { axiosClient } from "@/shared/lib/axiosClient";
import { DashboardStats, DashboardStatsResponse } from "../types";

const USE_DUMMY_DATA = true;

const DUMMY_STATS: DashboardStats = {
    displayedUserId: "461",       // shown on blue card (per Screenshot 5)
    loginUserId: "SRI0461",       // actual login ID
    registerId: "472",            // registration number
    completedLevels: 2,
    totalTeam: 12,
    directReferrals: 3,
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
    if (USE_DUMMY_DATA) {
        return simulateFetchStats();
    }

    const response = await axiosClient.get<DashboardStatsResponse>("/dashboard/stats");
    return response.data.data;
}

function simulateFetchStats(): Promise<DashboardStats> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(DUMMY_STATS), 800);
    });
}