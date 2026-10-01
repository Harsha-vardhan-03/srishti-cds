"use client";

import { useState } from "react";
import { Header } from "@/shared/components/layout/Header";
import { Sidebar } from "@/shared/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-srishti-orange to-srishti-orange-light">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="lg:pl-64 transition-all duration-300">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-3 sm:p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}