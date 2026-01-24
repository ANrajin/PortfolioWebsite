import { z } from "zod";

export const createEducationSchema = z.object({
    institution: z.string().min(1, "Institution is required").max(255),
    degree: z.string().min(1, "Degree is required").max(255),
    field: z.string().min(1, "Field is required").max(255),
    startYear: z.number().int().min(1900).max(2100),
    endYear: z.number().int().min(1900).max(2100).optional().nullable(),
    current: z.boolean().optional().default(false),
    description: z.string().optional(),
});

export const updateEducationSchema = createEducationSchema;

export const educationIdParamSchema = z.object({
    id: z.string().min(1, "Education ID is required"),
});

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
