"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function TermsContent() {
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
                        Terms of Service
                    </h1>
                </div>

                <div className="px-6 sm:px-8 py-8 space-y-6 text-sm text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using SRISHTI CDS (&quot;the Service&quot;), you
                            agree to be bound by these Terms of Service. If you do not agree,
                            please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            2. Account Registration
                        </h2>
                        <p>
                            You agree to provide accurate, current, and complete information
                            during registration. You are responsible for maintaining the
                            confidentiality of your account credentials.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            3. Network & Referral Rules
                        </h2>
                        <p>
                            Membership is granted through valid referral IDs. All placements
                            are made according to the SRISHTI CDS network structure. Misuse of
                            the referral system may result in account termination.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            4. Prohibited Conduct
                        </h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Creating fake accounts or referral IDs</li>
                            <li>Attempting to breach platform security</li>
                            <li>Using the Service for unlawful purposes</li>
                            <li>Harassing other members or support staff</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            5. Changes to Terms
                        </h2>
                        <p>
                            We reserve the right to modify these terms at any time. Continued
                            use of the Service after changes constitutes acceptance of the new
                            terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            6. Contact
                        </h2>
                        <p>
                            For questions, contact us at{" "}
                            <a
                                href="mailto:support@srishticds.org"
                                className="text-[#0EA5E9] hover:underline"
                            >
                                support@srishticds.org
                            </a>
                            .
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

export default function TermsPage() {
    return (
        <Suspense fallback={<div className="min-h-[100dvh] bg-[#FB8C00]" />}>
            <TermsContent />
        </Suspense>
    );
}