export interface TreeNodeData {
    id: string;
    userId: string;       
    name: string;         
    level: number;       
    placementType: "LEFT" | "MIDDLE" | "RIGHT" | "ROOT";
    children: TreeNodeData[];
}

export interface LevelProgress {
    currentLevel: number;      
    progressPercent: number;   
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