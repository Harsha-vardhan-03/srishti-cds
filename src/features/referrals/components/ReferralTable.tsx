"use client";

import { memo } from "react";
import { ReferralUser, ReferralStatus } from "../types";

const STATUS_LABELS: Record<ReferralStatus, string> = {
    A: "Active",
    I: "Inactive",
};



interface Column {
    key: string;
    label: string;
    align?: "left" | "center";
}

const COLUMNS: Column[] = [
    { key: "id", label: "#" },
    { key: "registerId", label: "REGISTER ID" },
    { key: "userId", label: "USER ID" },
    { key: "userName", label: "USER NAME" },
    { key: "referralId", label: "REFERRAL ID" },
    { key: "referralUser", label: "REFERRAL USER" },
    { key: "placementType", label: "PLACEMENT TYPE" },
    { key: "joiningDate", label: "JOINING DATE" },
    { key: "status", label: "STATUS", align: "center" },
];



interface ReferralTableProps {
    referrals: ReferralUser[];
}

function ReferralTableComponent({ referrals }: ReferralTableProps) {
    if (referrals.length === 0) {
        return (
            <div className="text-center py-12 text-srishti-gray text-sm">
                No referral users found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[850px] text-left text-xs sm:text-sm">
                <thead>
                    <tr className="text-srishti-blue border-b border-gray-200">
                        {COLUMNS.map((col) => (
                            <th
                                key={col.key}
                                className={`px-2 sm:px-4 py-3 font-semibold whitespace-nowrap ${col.align === "center" ? "text-center" : ""
                                    }`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {referrals.map((row) => {
                        const statusLabel = STATUS_LABELS[row.status] || row.status;

                        return (
                            <tr
                                key={row.id}
                                className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors"
                            >
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark">
                                    {row.id}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark">
                                    {row.registerId}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark font-medium">
                                    {row.userId}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark">
                                    {row.userName}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark">
                                    {row.referralId}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark">
                                    {row.referralUser}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark">
                                    {row.placementType}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark whitespace-nowrap">
                                    {row.joiningDate}
                                </td>
                                <td className="px-2 sm:px-4 py-3 text-srishti-dark text-center">
                                    {statusLabel}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export const ReferralTable = memo(ReferralTableComponent);