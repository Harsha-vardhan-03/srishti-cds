"use client";

import { useState } from "react";
import {
    Headphones,
    Mail,
    Phone,
    MessageCircle,
    Clock,
    MapPin,
    ChevronDown,
    ChevronUp,
    Search,
    Ticket,
    Paperclip,
    Send,
    CheckCircle2,
    X,
} from "lucide-react";

const CONTACT_METHODS = [
    {
        icon: Phone,
        label: "Phone Support",
        value: "+91 98765 43210",
        href: "tel:+919876543210",
        description: "Mon–Sat, 9 AM – 6 PM IST",
    },
    {
        icon: Mail,
        label: "Email Support",
        value: "support@srishticds.org",
        href: "mailto:support@srishticds.org",
        description: "Any time",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "+91 98765 43210",
        href: "https://wa.me/919876543210",
        description: "Quick queries",
    },
];

const FAQS = [
    {
        q: "How do I add a new member to my team?",
        a: "Share your referral ID with the new member. They enter it during registration to join your team.",
    },
    {
        q: "What is the difference between Completed and Balance profiles?",
        a: "Completed profiles have fully activated accounts with all KYC done. Balance profiles are pending activation or missing documentation.",
    },
    {
        q: "How do I update my profile information?",
        a: "Go to Profile and hover over any field to edit it. Changes are saved instantly.",
    },
    {
        q: "What happens if I forget my password?",
        a: "Use the 'Forgot Password' link on the login page. You'll receive an OTP on your registered mobile number.",
    },
    {
        q: "How do payouts work?",
        a: "Payouts are processed monthly. Ensure your bank details are updated in your profile for uninterrupted disbursement.",
    },
];

const OFFICE_INFO = {
    address: "SRISHTI CDS Head Office, Hyderabad, Telangana – 500001",
    hours: "Monday to Saturday, 9:00 AM – 6:00 PM IST",
};

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [search, setSearch] = useState("");
    const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const filteredFaqs = search.trim()
        ? FAQS.filter(
            (f) =>
                f.q.toLowerCase().includes(search.toLowerCase()) ||
                f.a.toLowerCase().includes(search.toLowerCase())
        )
        : FAQS;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        setIsTicketFormOpen(false);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
            
            <div className="bg-gradient-to-br from-[#0f3d3e] to-[#1a5c5e] rounded-lg shadow-md overflow-hidden">
                <div className="p-6 sm:p-8 text-white">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-yellow-300 flex items-center justify-center shrink-0">
                            <Headphones size={28} className="text-[#0f3d3e]" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-yellow-300">
                                Support Center
                            </h1>
                            <p className="text-white/85 text-sm mt-1">
                                We're here to help. Reach out via any channel below.
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="inline-flex items-center gap-1.5 text-xs bg-green-500/20 text-green-200 px-2.5 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    All systems operational
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {CONTACT_METHODS.map((method) => {
                    const Icon = method.icon;
                    return (
                        <a
                            key={method.label}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-lg shadow-md p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 block group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center mb-3 group-hover:bg-[#0EA5E9]/20 transition-colors">
                                <Icon size={20} className="text-[#0EA5E9]" />
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{method.label}</p>
                            <p className="text-sm font-semibold text-gray-900 mb-1 break-words">
                                {method.value}
                            </p>
                            <p className="text-xs text-gray-500">{method.description}</p>
                        </a>
                    );
                })}
            </div>

            
            {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2
                        size={20}
                        className="text-green-600 shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-green-800">
                            Ticket submitted successfully
                        </p>
                        <p className="text-xs text-green-700 mt-0.5">
                            Our team will get back to you soon.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-green-600 hover:text-green-800"
                        aria-label="Dismiss"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                    type="button"
                    onClick={() => setIsTicketFormOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white transition-colors text-left"
                    aria-expanded={isTicketFormOpen}
                >
                    <div className="flex items-center gap-2">
                        <Ticket size={18} />
                        <span className="font-semibold text-sm sm:text-base">
                            {isTicketFormOpen
                                ? "Close Support Ticket"
                                : "Raise a Support Ticket"}
                        </span>
                    </div>
                    {isTicketFormOpen ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </button>

                {isTicketFormOpen && (
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 sm:p-6 space-y-4 border-t border-gray-100"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                label="Your Name"
                                placeholder="Enter your full name"
                            />
                            <FormField
                                label="Mobile Number"
                                placeholder="10-digit mobile"
                                type="tel"
                            />
                        </div>

                        <FormField
                            label="Email Address"
                            placeholder="you@example.com"
                            type="email"
                        />

                        <FormField
                            label="Subject"
                            placeholder="Brief summary of your issue"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1.5">
                                Message
                            </label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Describe your issue in detail..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 resize-y"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Paperclip size={14} />
                                Attach file
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold bg-[#0EA5E9] text-white hover:bg-[#0284C7] transition-colors"
                            >
                                <Send size={14} />
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* OFFICE INFORMATION */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Office Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Address</p>
                            <p className="text-sm text-gray-900">{OFFICE_INFO.address}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <Clock size={16} className="text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Working Hours</p>
                            <p className="text-sm text-gray-900">{OFFICE_INFO.hours}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ ACCORDION */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <div className="relative w-full sm:w-64">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search FAQs..."
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {filteredFaqs.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 text-sm">
                            No FAQs match your search.
                        </div>
                    ) : (
                        filteredFaqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-gray-900 flex-1">
                                            {faq.q}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp size={16} className="text-gray-500 shrink-0" />
                                        ) : (
                                            <ChevronDown
                                                size={16}
                                                className="text-gray-500 shrink-0"
                                            />
                                        )}
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 sm:px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}


function FormField({
    label,
    placeholder,
    type = "text",
}: {
    label: string;
    placeholder: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
            />
        </div>
    );
}