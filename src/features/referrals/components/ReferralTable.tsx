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
            <div className="text-center py-12 text-gray-500 text-sm">
                No records found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[850px] text-left text-xs sm:text-sm">
                <thead>
                    <tr className="text-[#0EA5E9] border-b border-gray-200">
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
                    {referrals.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors"
                        >
                            <td className="px-2 sm:px-4 py-3 text-gray-800">{row.id}</td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800">
                                {row.registerId}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800 font-medium">
                                {row.userId}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800">
                                {row.userName}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800">
                                {row.referralId}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800">
                                {row.referralUser}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800">
                                {row.placementType}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800 whitespace-nowrap">
                                {row.joiningDate}
                            </td>
                            <td className="px-2 sm:px-4 py-3 text-gray-800 text-center">
                                {STATUS_LABELS[row.status] || row.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const ReferralTable = memo(ReferralTableComponent);