"use client";

import { LevelProgress as LevelProgressType } from "../types";

interface LevelProgressProps {
    progress: LevelProgressType;
}

export function LevelProgress({ progress }: LevelProgressProps) {
    return (
        <div className="mb-6">
            <p className="text-sm text-srishti-dark font-medium mb-2">
                Level Status
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-srishti-blue transition-all duration-500"
                    style={{ width: `${progress.progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progress.progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <p className="text-sm text-srishti-dark mt-2">
                Level-{progress.currentLevel} In Progress : {progress.progressPercent}%
            </p>
        </div>
    );
}