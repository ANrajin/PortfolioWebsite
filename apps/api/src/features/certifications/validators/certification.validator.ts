import { z } from "zod";

export const createCertificationSchema = z.object({
    name: z.string().min(1, "Name is required").max(255),
    organization: z.string().min(1, "Organization is required").max(255),
    issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format").optional().or(z.literal("")),
    credentialId: z.string().max(255).optional(),
    credentialUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    skills: z.array(z.string()).optional().default([]),
    mediaUrl: z.string().optional(),
    mediaType: z.enum(["pdf", "image"]).optional(),
});

export const updateCertificationSchema = createCertificationSchema;

export const certificationIdParamSchema = z.object({
    id: z.string().min(1, "Certification ID is required"),
});

export type CreateCertificationInput = z.infer<typeof createCertificationSchema>;
export type UpdateCertificationInput = z.infer<typeof updateCertificationSchema>;
