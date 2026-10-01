export type PlacementType = "LEFT" | "MIDDLE" | "RIGHT";
export type ReferralStatus = "A" | "I"; // A = Active, I = Inactive

export interface ReferralUser {
    id: number;
    registerId: string;
    userId: string;
    userName: string;
    referralId: string;
    referralUser: string;
    placementType: PlacementType;
    joiningDate: string;
    status: ReferralStatus;
}

export interface ReferralsResponse {
    success: boolean;
    data: {
        referrals: ReferralUser[];
        total: number;
    };
}