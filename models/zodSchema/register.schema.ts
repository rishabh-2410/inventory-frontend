import { z } from "zod";

export const registerUserRequestSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>




export const registerBusinessDetailsSchema = z.object({
    businessName: z.string().min(1, { message: "Business name is required" }),
    businessAddress: z.string().min(1, { message: "Business address is required" }),
    businessEmail: z.string().email({ message: "Invalid business email address" }),
})

export type RegisterBusinessDetails = z.infer<typeof registerBusinessDetailsSchema>


export const registerUserResponseSchema = z.object({
    id: z.uuid(),
})

export type RegisterUserResponse = z.infer<typeof registerUserResponseSchema>

