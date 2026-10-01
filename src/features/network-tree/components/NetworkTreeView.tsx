"use client";

import { TreeNode } from "./TreeNode";
import { LevelProgress } from "./LevelProgress";
import { useNetworkTree } from "../hooks/useNetworkTree";

export function NetworkTreeView() {
    const { root, levelProgress, isLoading, isError, error } = useNetworkTree();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-srishti-blue border-t-transparent rounded-full" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">
                    {error?.message || "Failed to load network tree."}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            
            <div className="bg-[#0f3d3e] px-4 py-3">
                <h2 className="text-yellow-300 font-semibold text-base">Tree</h2>
            </div>

            
            <div className="p-4 sm:p-6 overflow-x-auto">
                {levelProgress && <LevelProgress progress={levelProgress} />}

                {root && (
                    <div className="flex justify-center min-w-fit py-4">
                        <TreeNode node={root} isRoot />
                    </div>
                )}
            </div>
        </div>
    );
}