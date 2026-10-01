import { axiosClient } from "@/shared/lib/axiosClient";
import { TreeNodeData, LevelProgress, NetworkTreeResponse } from "../types";

// ============================================================
// DUMMY DATA — different names from screenshots (per your request)
// ============================================================
const USE_DUMMY_DATA = true;

const DUMMY_LEVEL_PROGRESS: LevelProgress = {
    currentLevel: 2,
    progressPercent: 11.11,
};

const DUMMY_TREE: TreeNodeData = {
    id: "1",
    userId: "SRI2030",
    name: "R.VIJAYA KUMAR",
    level: 1,
    placementType: "ROOT",
    children: [
        {
            id: "1-1",
            userId: "SRI2031",
            name: "S.MAHESH BABU",
            level: 2,
            placementType: "LEFT",
            children: [
                {
                    id: "1-1-1",
                    userId: "SRI2032",
                    name: "P.ANITHA DEVI",
                    level: 3,
                    placementType: "LEFT",
                    children: [],
                },
                {
                    id: "1-1-2",
                    userId: "SRI2033",
                    name: "M.RAJESH KUMAR",
                    level: 3,
                    placementType: "MIDDLE",
                    children: [],
                },
            ],
        },
        {
            id: "1-2",
            userId: "SRI2034",
            name: "K.LAKSHMI NARAYANA",
            level: 2,
            placementType: "MIDDLE",
            children: [
                {
                    id: "1-2-1",
                    userId: "SRI2035",
                    name: "T.SUREKHA RANI",
                    level: 3,
                    placementType: "RIGHT",
                    children: [],
                },
            ],
        },
        {
            id: "1-3",
            userId: "SRI2036",
            name: "D.SRINIVAS RAO",
            level: 2,
            placementType: "RIGHT",
            children: [],
        },
    ],
};

export async function fetchNetworkTree(): Promise<{
    root: TreeNodeData;
    levelProgress: LevelProgress;
}> {
    if (USE_DUMMY_DATA) {
        return simulateFetchTree();
    }

    const response = await axiosClient.get<NetworkTreeResponse>("/network/tree");
    return response.data.data;
}

function simulateFetchTree() {
    return new Promise<{ root: TreeNodeData; levelProgress: LevelProgress }>(
        (resolve) => {
            setTimeout(
                () => resolve({ root: DUMMY_TREE, levelProgress: DUMMY_LEVEL_PROGRESS }),
                800
            );
        }
    );
}