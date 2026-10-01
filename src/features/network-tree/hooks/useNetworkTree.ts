"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNetworkTree } from "../api/networkTreeApi";
import { TreeNodeData, LevelProgress } from "../types";

export function useNetworkTree() {
    const query = useQuery<
        { root: TreeNodeData; levelProgress: LevelProgress },
        Error
    >({
        queryKey: ["network-tree"],
        queryFn: fetchNetworkTree,
        staleTime: 60 * 1000,
    });

    return {
        root: query.data?.root,
        levelProgress: query.data?.levelProgress,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
}