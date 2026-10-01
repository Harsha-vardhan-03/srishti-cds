"use client";

import { TreeNodeData } from "../types";

interface TreeNodeProps {
    node: TreeNodeData;
    isRoot?: boolean;
}

export function TreeNode({ node, isRoot = false }: TreeNodeProps) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div
                className={`border border-gray-300 rounded-md px-3 py-2 bg-white text-center text-xs sm:text-sm whitespace-nowrap ${isRoot ? "font-bold text-srishti-dark" : "text-gray-700"
                    }`}
            >
                {node.name}
            </div>

            {/* Children */}
            {hasChildren && (
                <>
                    {/* Vertical connector down from parent */}
                    <div className="w-px h-6 bg-gray-300" />

                    <div className="flex flex-row gap-2 sm:gap-4 relative">
                        {node.children.map((child, index) => (
                            <div key={child.id} className="flex flex-col items-center relative">
                                {/* Top horizontal connector line */}
                                {node.children.length > 1 && (
                                    <div
                                        className={`absolute top-0 h-px bg-gray-300 ${index === 0
                                                ? "left-1/2 right-0"
                                                : index === node.children.length - 1
                                                    ? "left-0 right-1/2"
                                                    : "left-0 right-0"
                                            }`}
                                    />
                                )}

                                {/* Vertical line down to this child */}
                                <div className="w-px h-6 bg-gray-300" />

                                {/* Recursive child */}
                                <TreeNode node={child} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}