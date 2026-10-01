import { axiosClient } from "@/shared/lib/axiosClient";
import { ReferralUser, ReferralsResponse } from "../types";

// ============================================================
// DUMMY DATA — Different names than screenshots (per your request)
// ============================================================
const USE_DUMMY_DATA = true;

const DUMMY_REFERRALS: ReferralUser[] = [
    {
        id: 1,
        registerId: "481",
        userId: "SRI2041",
        userName: "R.SWATHI REDDY",
        referralId: "SRI5858",
        referralUser: "GOGADA CHINABABU",
        placementType: "LEFT",
        joiningDate: "12-07-2025",
        status: "A",
    },
    {
        id: 2,
        registerId: "482",
        userId: "SRI2042",
        userName: "P.VENKATA RAMANA",
        referralId: "SRI5858",
        referralUser: "GOGADA CHINABABU",
        placementType: "MIDDLE",
        joiningDate: "12-07-2025",
        status: "A",
    },
    {
        id: 3,
        registerId: "483",
        userId: "SRI2043",
        userName: "K.SRIDEVI",
        referralId: "SRI2041",
        referralUser: "R.SWATHI REDDY",
        placementType: "RIGHT",
        joiningDate: "15-07-2025",
        status: "A",
    },
    {
        id: 4,
        registerId: "484",
        userId: "SRI2044",
        userName: "M.ANIL KUMAR",
        referralId: "SRI2042",
        referralUser: "P.VENKATA RAMANA",
        placementType: "LEFT",
        joiningDate: "18-07-2025",
        status: "A",
    },
    {
        id: 5,
        registerId: "485",
        userId: "SRI2045",
        userName: "B.LAKSHMI PRASANNA",
        referralId: "SRI2043",
        referralUser: "K.SRIDEVI",
        placementType: "MIDDLE",
        joiningDate: "22-07-2025",
        status: "I",
    },
];

export async function fetchReferrals(): Promise<{
    referrals: ReferralUser[];
    total: number;
}> {
    if (USE_DUMMY_DATA) {
        return simulateFetchReferrals();
    }

    const response = await axiosClient.get<ReferralsResponse>("/referrals");
    return response.data.data;
}

function simulateFetchReferrals() {
    return new Promise<{ referrals: ReferralUser[]; total: number }>((resolve) => {
        setTimeout(
            () =>
                resolve({
                    referrals: DUMMY_REFERRALS,
                    total: DUMMY_REFERRALS.length,
                }),
            800
        );
    });
}