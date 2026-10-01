import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data considered fresh for 1 minute (avoids unnecessary refetches)
            staleTime: 60 * 1000,
            // Retry failed requests once (not for mutations)
            retry: 1,
            // Refetch when window regains focus (good for session freshness)
            refetchOnWindowFocus: false,
        },
        mutations: {
            // Do not retry mutations (login, register) — prevents duplicate submissions
            retry: 0,
        },
    },
});