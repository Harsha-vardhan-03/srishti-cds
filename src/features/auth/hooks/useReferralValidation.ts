"use client";

import { useQuery } from "@tanstack/react-query";
import { validateReferralId } from "../api/authApi";
import { ReferralValidationResponse } from "../types";

export function useReferralValidation(referralId: string) {
    const trimmed = referralId.trim();

    const query = useQuery<ReferralValidationResponse, Error>({
        queryKey: ["referral-validation", trimmed],
        queryFn: () => validateReferralId(trimmed),
        enabled: trimmed.length >= 8,
        staleTime: 60 * 1000,
        retry: 0,
    });

    return {
        validation: query.data,
        isValidating: query.isFetching,
        isLoading: query.isLoading,
    };
}