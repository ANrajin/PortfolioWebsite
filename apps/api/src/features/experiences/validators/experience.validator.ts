import { z } from "zod";

export const createExperienceSchema = z.object({
    company: z.string().min(1, "Company is required").max(255),
    position: z.string().min(1, "Position is required").max(255),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format").optional().nullable().or(z.literal("")),
    current: z.boolean().optional().default(false),
    description: z.string().min(1, "Description is required"),
    technologies: z.array(z.string()).optional().default([]),
});

export const updateExperienceSchema = createExperienceSchema;

export const experienceIdParamSchema = z.object({
    id: z.string().min(1, "Experience ID is required"),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
