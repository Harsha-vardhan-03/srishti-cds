"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function PrivacyContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const backHref = from === "register" ? "/register" : "/login";
    const backLabel = from === "register" ? "Back to Register" : "Back to Login";

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-[#FFB74D] via-[#FB8C00] to-[#E65100] px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-[#0f3d3e] px-6 py-5 flex items-center gap-3">
                    <Link
                        href={backHref}
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label={backLabel}
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-yellow-300 font-semibold text-lg">
                        Privacy Policy
                    </h1>
                </div>

                <div className="px-6 sm:px-8 py-8 space-y-6 text-sm text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            1. Information We Collect
                        </h2>
                        <p>
                            We collect information you provide during registration: full
                            name, mobile number, email address, and referral ID (if
                            applicable). We also collect usage data such as login timestamps
                            and IP addresses for security purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            2. How We Use Your Information
                        </h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To provide and maintain the Service</li>
                            <li>To verify your identity and prevent fraud</li>
                            <li>To communicate account updates and notifications</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            3. Data Sharing
                        </h2>
                        <p>
                            We do not sell your personal information. We may share data with
                            trusted service providers (hosting, analytics) bound by
                            confidentiality agreements, or when required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            4. Data Security
                        </h2>
                        <p>
                            We implement industry-standard security measures including HTTPS
                            encryption, hashed passwords, and access controls. However, no
                            system is 100% secure. Report any concerns to our support team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            5. Your Rights
                        </h2>
                        <p>
                            You may request access to, correction of, or deletion of your
                            personal data. Contact us at{" "}
                            <a
                                href="mailto:support@srishticds.org"
                                className="text-[#0EA5E9] hover:underline"
                            >
                                support@srishticds.org
                            </a>{" "}
                            to exercise these rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            6. Cookies
                        </h2>
                        <p>
                            We use essential cookies for authentication and session
                            management. We do not use third-party tracking cookies.
                        </p>
                    </section>

                    <p className="text-xs text-gray-500 pt-4 border-t border-gray-100">
                        Last updated: 06 October 2026
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function PrivacyPage() {
    return (
        <Suspense fallback={<div className="min-h-[100dvh] bg-[#FB8C00]" />}>
            <PrivacyContent />
        </Suspense>
    );
}