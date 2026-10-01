export interface TreeNodeData {
    id: string;
    userId: string;       // e.g., "SRI5858"
    name: string;         // e.g., "B.KIRANCHAND BABU"
    level: number;        // 1, 2, 3...
    placementType: "LEFT" | "MIDDLE" | "RIGHT" | "ROOT";
    children: TreeNodeData[];
}

export interface LevelProgress {
    currentLevel: number;      // e.g., 2
    progressPercent: number;   // e.g., 11.11
}

export interface NetworkTreeResponse {
    success: boolean;
    data: {
        root: TreeNodeData;
        levelProgress: LevelProgress;
    };
  }
export interface DashboardStats {
    userId: string;
    registerId: string;
    completedLevels: number;
    totalTeam: number;
    directReferrals: number;
}

export interface DashboardStatsResponse {
    success: boolean;
    data: DashboardStats;
  }