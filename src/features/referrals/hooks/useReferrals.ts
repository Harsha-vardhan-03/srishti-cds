"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReferrals } from "../api/referralsApi";
import { ReferralUser } from "../types";

export function useReferrals() {
    const query = useQuery<{ referrals: ReferralUser[]; total: number }, Error>({
        queryKey: ["referrals"],
        queryFn: fetchReferrals,
        staleTime: 60 * 1000,
    });

    return {
        referrals: query.data?.referrals ?? [],
        total: query.data?.total ?? 0,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
}