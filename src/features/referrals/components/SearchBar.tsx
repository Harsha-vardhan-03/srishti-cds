"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
}: SearchBarProps) {
    return (
        <div className="relative w-full sm:max-w-xs">
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white text-sm text-srishti-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-srishti-blue/30 focus:border-srishti-blue"
                aria-label="Search referrals"
            />
        </div>
    );
}