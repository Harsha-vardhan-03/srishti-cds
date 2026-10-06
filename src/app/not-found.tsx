import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#FFB74D] via-[#FB8C00] to-[#E65100] px-4 py-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
                <div className="text-7xl font-extrabold text-[#0EA5E9] mb-2">404</div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                    Page not found
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    The page you&apos;re looking for doesn&apos;t exist or has been
                    moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#0EA5E9] text-white font-semibold text-sm hover:bg-[#0284C7] transition-colors"
                    >
                        <Home size={16} />
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                        <Search size={16} />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}