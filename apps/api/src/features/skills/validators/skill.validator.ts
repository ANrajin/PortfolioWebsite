import { z } from "zod";

export const createSkillSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    category: z.string().min(1, "Category is required").max(100),
    proficiency: z.number().int().min(0).max(100).optional().default(80),
});

export const updateSkillSchema = createSkillSchema;

export const skillIdParamSchema = z.object({
    id: z.string().min(1, "Skill ID is required"),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
