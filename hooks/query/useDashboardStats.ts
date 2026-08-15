import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getDashboardStats } from "@/services/dashboard.service";

export const useDashboardStats = (businessID: string) => {
    return useQuery({
        queryKey: queryKeys.dashboard(businessID),
        queryFn: getDashboardStats,
    })
}