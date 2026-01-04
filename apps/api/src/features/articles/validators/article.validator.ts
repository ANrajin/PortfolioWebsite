import { z } from "zod";

export const createArticleSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters"),
    platform: z.string().min(1, "Platform is required").max(100, "Platform must be at most 100 characters"),
    url: z.string().url("Invalid URL format"),
    publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    thumbnail: z.string().url("Invalid thumbnail URL").optional().or(z.literal("")),
});

export const updateArticleSchema = createArticleSchema;

export const articleIdParamSchema = z.object({
    id: z.string().min(1, "Article ID is required"),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
