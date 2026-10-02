"use client";

interface Column {
    key: string;
    header: string;
}

interface SimpleTableProps<T> {
    columns: Column[];
    data: T[];
    emptyMessage?: string;
}

export function SimpleTable<T extends object>({
    columns,
    data,
    emptyMessage = "No records found.",
}: SimpleTableProps<T>) {
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 text-sm">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-3 sm:px-6 py-3 font-semibold text-[#0EA5E9] whitespace-nowrap"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors"
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="px-3 sm:px-6 py-4 text-gray-800 align-top"
                                >
                                    {String(
                                        (row as Record<string, unknown>)[col.key] ?? "-"
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}