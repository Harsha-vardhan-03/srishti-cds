"use client";

import { useEffect, useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Calendar,
    Users,
    Trophy,
    Copy,
    Check,
    Share2,
    Pencil,
    X,
    Save,
    TrendingUp,
    CheckCircle2,
} from "lucide-react";
import { fetchUserProfile } from "@/features/dashboard/api/dashboardApi";
import { UserProfile } from "@/features/dashboard/types";

type EditableField = "name" | "mobile" | "email" | "address";

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [draft, setDraft] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingField, setEditingField] = useState<EditableField | null>(null);
    const [copied, setCopied] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserProfile()
            .then((data) => {
                setProfile(data);
                setDraft(data);
            })
            .catch(() => setError("Failed to load profile."))
            .finally(() => setIsLoading(false));
    }, []);

    const handleCopy = async () => {
        if (!profile) return;
        try {
            await navigator.clipboard.writeText(profile.userId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable */
        }
    };

    const handleFieldChange = (field: EditableField, value: string) => {
        if (!draft) return;
        setDraft({ ...draft, [field]: value });
    };

    const handleSaveField = (field: EditableField) => {
        if (!draft) return;

        if (field === "name" && draft.name.trim().length < 2) {
            setSaveError("Name must be at least 2 characters.");
            return;
        }
        if (field === "mobile" && !/^\d{10}$/.test(draft.mobile)) {
            setSaveError("Mobile must be exactly 10 digits.");
            return;
        }
        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
            setSaveError("Please enter a valid email address.");
            return;
        }

        setProfile(draft);
        setEditingField(null);
        setSaveError(null);
    };

    const handleCancelField = (field: EditableField) => {
        if (!profile || !draft) return;
        setDraft({ ...draft, [field]: profile[field] } as UserProfile);
        setEditingField(null);
        setSaveError(null);
    };

    if (isLoading) return <ProfileSkeleton />;

    if (error || !profile || !draft) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700">{error || "Profile not found."}</p>
                </div>
            </div>
        );
    }

    const initials = profile.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-28 sm:h-36 bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#0369A1]" />

                <div className="px-4 sm:px-8 pb-6">
                    <div className="flex items-start gap-4 sm:gap-6 -mt-14 sm:-mt-16">
                       
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl sm:text-3xl tracking-wide">
                                        {initials}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => alert("Photo upload coming soon.")}
                                className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                                aria-label="Change profile photo"
                            >
                                <Pencil size={12} className="text-gray-600" />
                            </button>
                        </div>

                       
                        <div className="flex-1 min-w-0 pt-14 sm:pt-16">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate">
                                {profile.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <CheckCircle2 size={12} />
                                    {profile.status}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-gray-100 text-gray-700">
                                    {profile.userId}
                                </span>
                            </div>
                        </div>
                    </div>

                   
                    <div className="flex items-center justify-end gap-2 mt-4 sm:mt-5">
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            aria-label="Copy user ID"
                        >
                            {copied ? (
                                <>
                                    <Check size={14} className="text-green-600" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    Copy ID
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => alert("Share feature coming soon.")}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium bg-[#0EA5E9] text-white hover:bg-[#0284C7] transition-colors"
                        >
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <StatPill
                    icon={Trophy}
                    label="Level"
                    value={`Level ${profile.level}`}
                    color="blue"
                />
                <StatPill
                    icon={Users}
                    label="Sponsor"
                    value={profile.sponsorName}
                    subvalue={profile.sponsorId}
                    color="purple"
                />
                <StatPill
                    icon={Calendar}
                    label="Joined"
                    value={profile.joiningDate}
                    color="orange"
                />
            </div>

            
            <SectionCard title="Contact Information" icon={Phone}>
                {saveError && (
                    <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-xs text-red-700">{saveError}</p>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <EditableInfoRow
                        icon={Phone}
                        label="Mobile"
                        value={profile.mobile}
                        draftValue={draft.mobile}
                        isEditing={editingField === "mobile"}
                        onEdit={() => setEditingField("mobile")}
                        onChange={(v) => handleFieldChange("mobile", v)}
                        onSave={() => handleSaveField("mobile")}
                        onCancel={() => handleCancelField("mobile")}
                        type="tel"
                    />
                    <EditableInfoRow
                        icon={Mail}
                        label="Email"
                        value={profile.email}
                        draftValue={draft.email}
                        isEditing={editingField === "email"}
                        onEdit={() => setEditingField("email")}
                        onChange={(v) => handleFieldChange("email", v)}
                        onSave={() => handleSaveField("email")}
                        onCancel={() => handleCancelField("email")}
                        type="email"
                    />
                    <EditableInfoRow
                        icon={MapPin}
                        label="Address"
                        value={profile.address}
                        draftValue={draft.address}
                        isEditing={editingField === "address"}
                        onEdit={() => setEditingField("address")}
                        onChange={(v) => handleFieldChange("address", v)}
                        onSave={() => handleSaveField("address")}
                        onCancel={() => handleCancelField("address")}
                        span2
                    />
                </div>
            </SectionCard>

           
            <SectionCard title="Network Information" icon={TrendingUp}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <InfoRow
                        icon={Users}
                        label="Sponsor"
                        value={`${profile.sponsorName} (${profile.sponsorId})`}
                    />
                    <InfoRow
                        icon={Trophy}
                        label="Current Level"
                        value={`Level ${profile.level}`}
                    />
                </div>
            </SectionCard>
        </div>
    );
}



function SectionCard({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
                <Icon size={18} className="text-[#0EA5E9]" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    {title}
                </h2>
            </div>
            {children}
        </div>
    );
}

function InfoRow({
    icon: Icon,
    label,
    value,
    span2 = false,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    span2?: boolean;
}) {
    return (
        <div className={`flex items-start gap-3 ${span2 ? "sm:col-span-2" : ""}`}>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-gray-600" />
            </div>
            <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm text-gray-900 font-medium break-words">
                    {value}
                </p>
            </div>
        </div>
    );
}

function EditableInfoRow({
    icon: Icon,
    label,
    value,
    draftValue,
    isEditing,
    onEdit,
    onChange,
    onSave,
    onCancel,
    type = "text",
    span2 = false,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    draftValue: string;
    isEditing: boolean;
    onEdit: () => void;
    onChange: (v: string) => void;
    onSave: () => void;
    onCancel: () => void;
    type?: string;
    span2?: boolean;
}) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSave();
        if (e.key === "Escape") onCancel();
    };

    return (
        <div className={`flex items-start gap-3 ${span2 ? "sm:col-span-2" : ""}`}>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-gray-600" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 mb-1">{label}</p>

                {isEditing ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <input
                            type={type}
                            value={draftValue}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="flex-1 rounded-md border border-[#0EA5E9] px-2.5 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
                        />
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button
                                type="button"
                                onClick={onSave}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                                <Save size={12} />
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <X size={12} />
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 group">
                        <p className="text-sm text-gray-900 font-medium break-words flex-1">
                            {value}
                        </p>
                        <button
                            type="button"
                            onClick={onEdit}
                            className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 p-1 rounded text-gray-500 hover:text-[#0EA5E9] hover:bg-gray-100 transition-all"
                            aria-label={`Edit ${label}`}
                        >
                            <Pencil size={12} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatPill({
    icon: Icon,
    label,
    value,
    subvalue,
    color,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    subvalue?: string;
    color: "blue" | "purple" | "orange";
}) {
    const colorMap = {
        blue: "bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]",
        purple: "bg-gradient-to-br from-[#A855F7] to-[#7E22CE]",
        orange: "bg-gradient-to-br from-[#F59E0B] to-[#D97706]",
    };

    return (
        <div
            className={`${colorMap[color]} rounded-lg p-4 text-white shadow-md`}
        >
            <div className="flex items-center gap-2 mb-2 opacity-90">
                <Icon size={14} />
                <span className="text-xs font-medium">{label}</span>
            </div>
            <p className="text-base font-bold truncate">{value}</p>
            {subvalue && (
                <p className="text-xs opacity-75 font-mono truncate mt-0.5">
                    {subvalue}
                </p>
            )}
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-28 sm:h-36 bg-gray-200 animate-pulse" />
                <div className="px-4 sm:px-8 pb-6">
                    <div className="flex items-start gap-4 sm:gap-6 -mt-14 sm:-mt-16">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 animate-pulse border-4 border-white shrink-0" />
                        <div className="flex-1 pt-14 sm:pt-16 space-y-2">
                            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 sm:mt-5">
                        <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse" />
                        <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
                ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 h-40">
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    );
}