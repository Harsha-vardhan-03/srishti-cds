import { axiosClient } from "@/shared/lib/axiosClient";
import {
    DashboardStats,
    DashboardStatsResponse,
    UserProfile,
    UserProfileResponse,
} from "../types";

const USE_DUMMY_DATA =
    process.env.NEXT_PUBLIC_USE_DUMMY_AUTH === "true";


const DUMMY_STATS: DashboardStats = {
    displayedUserId: "461",
    loginUserId: "SRI0461",
    registerId: "472",
    completedLevels: 2,
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
    if (USE_DUMMY_DATA) return simulateFetchStats();

    const response = await axiosClient.get<DashboardStatsResponse>(
        "/dashboard/stats"
    );
    return response.data.data;
}

function simulateFetchStats(): Promise<DashboardStats> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(DUMMY_STATS), 800);
    });
}


const DUMMY_PROFILE: UserProfile = {
    userId: "SRI0461",
    registerId: "472",
    name: "Gogada Chinababu",
    mobile: "9876543210",
    email: "chinababu@example.com",
    level: 2,
    joiningDate: "05-06-2025",
    sponsorId: "SRI5858",
    sponsorName: "Ravi Kumar",
    address: "Hyderabad, Telangana",
    status: "Active",
};

export async function fetchUserProfile(): Promise<UserProfile> {
    if (USE_DUMMY_DATA) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(DUMMY_PROFILE), 800);
        });
    }

    const response = await axiosClient.get<UserProfileResponse>("/user/profile");
    return response.data.data;
}