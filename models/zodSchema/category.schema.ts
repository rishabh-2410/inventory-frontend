import { z } from "zod";


/** Category Response */
export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    business_id: z.string(),
    description: z.string().nullable(),
});

export type Category = z.infer<typeof categorySchema>;


/** Add Category Request */
export const addCategorySchema = z.object({
    name: z.string().min(1),
    description: z.string(),
});

export type AddCategoryRequest = z.infer<typeof addCategorySchema>;


/** Update Category Request */
export const updateCategorySchema = z.object({
    name: z.string(),
    description: z.string()
});

export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;