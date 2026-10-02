"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTeamMembers } from "../api/referralsApi";
import { TeamMember } from "../types";

export function useTeamMembers() {
    const query = useQuery<TeamMember[], Error>({
        queryKey: ["team-members"],
        queryFn: fetchTeamMembers,
        staleTime: 60 * 1000,
    });

    const team = query.data ?? [];

    return {
        team,
        
        completed: team.filter((m) => m.status === "A"),
        balance: team.filter((m) => m.status === "I"),
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
}