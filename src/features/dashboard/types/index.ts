export interface DashboardStats {
   
    displayedUserId: string;

    
    loginUserId: string;

   
    registerId: string;

    
    completedLevels: number;

    
    totalTeam: number;

    
    directReferrals: number;
}

export interface DashboardStatsResponse {
    success: boolean;
    data: DashboardStats;
  }