import { queryKeys } from "@/lib/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/services/auth.service"

export const useGetUsers = () => {
    return useQuery({
        queryKey: queryKeys.users,
        queryFn: () => getUsers(),
    })
}