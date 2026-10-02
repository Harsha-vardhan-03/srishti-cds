import { axiosClient } from "@/shared/lib/axiosClient";
import { ReferralUser, ReferralsResponse, TeamMember } from "../types";

const USE_DUMMY_DATA = process.env.NEXT_PUBLIC_USE_DUMMY_AUTH === "true";


const DUMMY_REFERRALS: ReferralUser[] = [
    {
        id: 1,
        registerId: "481",
        userId: "SRI2041",
        userName: "R.SWATHI REDDY",
        referralId: "SRI5858",
        referralUser: "GOGADA CHINABABU",
        placementType: "LEFT",
        joiningDate: "12-07-2025",
        status: "A",
    },
    {
        id: 2,
        registerId: "482",
        userId: "SRI2042",
        userName: "P.VENKATA RAMANA",
        referralId: "SRI5858",
        referralUser: "GOGADA CHINABABU",
        placementType: "MIDDLE",
        joiningDate: "12-07-2025",
        status: "A",
    },
    {
        id: 3,
        registerId: "483",
        userId: "SRI2043",
        userName: "K.SRIDEVI",
        referralId: "SRI2041",
        referralUser: "R.SWATHI REDDY",
        placementType: "RIGHT",
        joiningDate: "15-07-2025",
        status: "A",
    },
    {
        id: 4,
        registerId: "484",
        userId: "SRI2044",
        userName: "M.ANIL KUMAR",
        referralId: "SRI2042",
        referralUser: "P.VENKATA RAMANA",
        placementType: "LEFT",
        joiningDate: "18-07-2025",
        status: "A",
    },
    {
        id: 5,
        registerId: "485",
        userId: "SRI2045",
        userName: "B.LAKSHMI PRASANNA",
        referralId: "SRI2043",
        referralUser: "K.SRIDEVI",
        placementType: "MIDDLE",
        joiningDate: "22-07-2025",
        status: "I",
    },
];

export async function fetchReferrals(): Promise<{
    referrals: ReferralUser[];
    total: number;
}> {
    if (USE_DUMMY_DATA) return simulateFetchReferrals();

    const response = await axiosClient.get<ReferralsResponse>("/referrals");
    return response.data.data;
}

function simulateFetchReferrals() {
    return new Promise<{ referrals: ReferralUser[]; total: number }>((resolve) => {
        setTimeout(
            () =>
                resolve({
                    referrals: DUMMY_REFERRALS,
                    total: DUMMY_REFERRALS.length,
                }),
            800
        );
    });
}


const DUMMY_TEAM: TeamMember[] = [
    { id: 1, registerId: "473", userId: "SRI9568", userName: "T.NIRMALA", status: "A" },
    { id: 2, registerId: "474", userId: "SRI4668", userName: "G.SASI KUMARI", status: "A" },
    { id: 3, registerId: "475", userId: "SRI3993", userName: "INDLA VENKATA SESHAIAH", status: "I" },
    { id: 4, registerId: "476", userId: "SRI7539", userName: "D.LAVANYA", status: "A" },
    { id: 5, registerId: "486", userId: "SRI0100", userName: "B.KIRANCHAND BABU", status: "A" },
    { id: 6, registerId: "493", userId: "SRI7084", userName: "CH.VENUGOPAL", status: "I" },
    { id: 7, registerId: "494", userId: "SRI1949", userName: "P.SUNEELKUMAR", status: "A" },
    { id: 8, registerId: "495", userId: "SRI8023", userName: "K.GOPAL AACHARI", status: "A" },
    { id: 9, registerId: "496", userId: "SRI9001", userName: "M.RAMESH", status: "I" },
    { id: 10, registerId: "497", userId: "SRI9002", userName: "S.ANITHA", status: "A" },
    { id: 11, registerId: "498", userId: "SRI9003", userName: "V.SRINIVAS", status: "A" },
    { id: 12, registerId: "499", userId: "SRI9004", userName: "P.LAKSHMI", status: "I" },
    { id: 13, registerId: "500", userId: "SRI9005", userName: "A.RAVI KUMAR", status: "A" },
    { id: 14, registerId: "501", userId: "SRI9006", userName: "K.SWETHA", status: "A" },
    { id: 15, registerId: "502", userId: "SRI9007", userName: "N.SURESH", status: "A" },
    { id: 16, registerId: "503", userId: "SRI9008", userName: "T.PRASAD", status: "I" },
    { id: 17, registerId: "504", userId: "SRI9009", userName: "R.SARITHA", status: "A" },
    { id: 18, registerId: "505", userId: "SRI9010", userName: "B.NAGESH", status: "A" },
    { id: 19, registerId: "506", userId: "SRI9011", userName: "G.DIVYA", status: "I" },
    { id: 20, registerId: "507", userId: "SRI9012", userName: "M.SRINU", status: "A" },
    { id: 21, registerId: "508", userId: "SRI9013", userName: "P.HEMA", status: "A" },
    { id: 22, registerId: "509", userId: "SRI9014", userName: "V.KRISHNA", status: "A" },
];

export async function fetchTeamMembers(): Promise<TeamMember[]> {
    if (USE_DUMMY_DATA) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(DUMMY_TEAM), 800);
        });
    }

    const response = await axiosClient.get<{ data: TeamMember[] }>("/team");
    return response.data.data;
}