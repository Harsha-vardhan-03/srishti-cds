"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "@/features/referrals/components/SearchBar";
import { ReferralTable } from "@/features/referrals/components/ReferralTable";
import { useReferrals } from "@/features/referrals/hooks/useReferrals";

export default function ReferralsPage() {
    const { referrals, isLoading, isError, error } = useReferrals();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredReferrals = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return referrals;
        return referrals.filter(
            (r) =>
                r.userName.toLowerCase().includes(q) ||
                r.userId.toLowerCase().includes(q) ||
                r.registerId.toLowerCase().includes(q) ||
                r.referralId.toLowerCase().includes(q) ||
                r.referralUser.toLowerCase().includes(q)
        );
    }, [referrals, searchQuery]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-[#0f3d3e] px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-yellow-300 font-semibold text-base sm:text-lg">
                        My Referral Users
                    </h2>
                    <div className="w-full sm:w-72">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6">
                    {isLoading && (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin h-8 w-8 border-4 border-srishti-blue border-t-transparent rounded-full" />
                        </div>
                    )}

                    {isError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <p className="text-red-700 text-sm">
                                {error?.message || "Failed to load referrals."}
                            </p>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <ReferralTable referrals={filteredReferrals} />
                    )}
                </div>
            </div>
        </div>
    );
}