import { useMutation } from "@tanstack/react-query"
import { createUser, deleteUser } from "@/services/auth.service"
import { RegisterUserRequest } from "@/models/zodSchema/register.schema"
import { UsersResponse } from "@/models/zodSchema/user.schema"
import { queryKeys } from "@/lib/queryKeys"
import { queryClient } from "@/lib/queryclient"

export const useAddUser = () => {
    return useMutation({
        mutationFn: (request: RegisterUserRequest) => createUser(request),
        onMutate: async (request: RegisterUserRequest) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.users })
            const previousUsers = queryClient.getQueryData<UsersResponse[]>(queryKeys.users) ?? []

            const optimisticUser: UsersResponse = {
                id: "dummy-employee-id",
                name: request.name,
                email: request.email,
                business_id: "dummy-business-id",
                role: "employee",
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            queryClient.setQueryData(queryKeys.users, (old: UsersResponse[] = []) => [...old, optimisticUser])
            return { previousUsers, optimisticUser }
        },
        onError: (error, request, context) => {
            queryClient.setQueryData(queryKeys.users, context?.previousUsers)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users })
        }
    })
}


export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.users })
            const previousUsers = queryClient.getQueryData<UsersResponse[]>(queryKeys.users) ?? []
            queryClient.setQueryData(queryKeys.users, (old: UsersResponse[] = []) => old.filter((user) => user.id !== id))
            return { previousUsers }
        },
        onError: (error, id, context) => {
            queryClient.setQueryData(queryKeys.users, context?.previousUsers)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users })
        }
    })
}