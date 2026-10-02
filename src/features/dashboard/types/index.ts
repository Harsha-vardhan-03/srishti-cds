export interface DashboardStats {
    displayedUserId: string;
    loginUserId: string;
    registerId: string;
    completedLevels: number;
}

export interface DashboardStatsResponse {
    success: boolean;
    data: DashboardStats;
}


export interface UserProfile {
    userId: string;       
    registerId: string;   
    name: string;         
    mobile: string;       
    email: string;        
    level: number;        
    joiningDate: string;  
    sponsorId: string;    
    sponsorName: string;  
    address: string;      
    status: "Active" | "Inactive";
}

export interface UserProfileResponse {
    success: boolean;
    data: UserProfile;
  }