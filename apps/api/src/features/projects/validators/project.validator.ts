import { z } from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required"),
    link: z.string().url("Invalid URL").optional().or(z.literal("")),
    technologies: z.array(z.string()).optional().default([]),
    imageUrl: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema;

export const projectIdParamSchema = z.object({
    id: z.string().min(1, "Project ID is required"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
