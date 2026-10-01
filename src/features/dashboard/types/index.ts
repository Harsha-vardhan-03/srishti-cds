export interface DashboardStats {
    /**
     * The value displayed on the "User Id" stat card.
     *
     * ⚠️ NOTE: Despite the label saying "User Id", the original SRISHTI CDS
     * application displays a Register ID-like number here (e.g., "461").
     * The actual login User ID is stored in `loginUserId` (e.g., "SRI0461").
     */
    displayedUserId: string;

    /**
     * The actual login User ID (SRI + 4 digits).
     * e.g., "SRI0461"
     */
    loginUserId: string;

    /**
     * The registration number.
     * e.g., "472"
     */
    registerId: string;

    /**
     * Number of completed levels.
     */
    completedLevels: number;

    /**
     * Total team size.
     */
    totalTeam: number;

    /**
     * Direct referrals count.
     */
    directReferrals: number;
}

export interface DashboardStatsResponse {
    success: boolean;
    data: DashboardStats;
  }