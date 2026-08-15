import { z } from "zod"

export const usersResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    business_id: z.string(),
    role: z.enum(["owner", "employee"]),
    is_active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
})

export type UsersResponse = z.infer<typeof usersResponseSchema>
