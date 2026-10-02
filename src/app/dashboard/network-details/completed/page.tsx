"use client";

import { useState, useMemo } from "react";
import { SimpleTable } from "@/shared/components/tables/SimpleTable";
import { Pagination } from "@/shared/components/tables/Pagination";
import { useTeamMembers } from "@/features/referrals/hooks/useTeamMembers";

const RECORDS_PER_PAGE = 10;

const COLUMNS = [
    { key: "id", header: "#" },
    { key: "registerId", header: "REGISTER ID" },
    { key: "userId", header: "USER ID" },
    { key: "userName", header: "USER NAME" },
];

export default function CompletedProfilesPage() {
    const { completed, isLoading, isError, error } = useTeamMembers();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(completed.length / RECORDS_PER_PAGE)
    );

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * RECORDS_PER_PAGE;
        return completed.slice(start, start + RECORDS_PER_PAGE);
    }, [completed, currentPage]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#0f3d3e] px-4 sm:px-6 py-4">
                    <h2 className="text-yellow-300 font-semibold text-base sm:text-lg">
                        Completed Profiles
                    </h2>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin h-8 w-8 border-4 border-[#0EA5E9] border-t-transparent rounded-full" />
                    </div>
                )}

                {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg m-4 p-4 text-center">
                        <p className="text-red-700 text-sm">
                            {error?.message || "Failed to load profiles."}
                        </p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <SimpleTable
                            columns={COLUMNS}
                            data={paginatedData}
                            emptyMessage="No completed profiles yet."
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalRecords={completed.length}
                            recordsPerPage={RECORDS_PER_PAGE}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}