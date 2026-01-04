import { z } from "zod";

const socialLinkSchema = z.object({
    platform: z.string().min(1, "Platform is required"),
    url: z.string().url("Invalid URL"),
    label: z.string().min(1, "Label is required"),
});

export const updatePersonalInfoSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required").max(255),
    title: z.string().min(1, "Title is required").max(255),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required").max(50),
    imageUrl: z.string().optional(),
    careerObjective: z.string().min(1, "Career objective is required"),
    socialLinks: z.array(socialLinkSchema).optional(),
});

export type UpdatePersonalInfoInput = z.infer<typeof updatePersonalInfoSchema>;
