import { z } from "zod";
import { turnstileConfig } from "@/features/turnstile/config/turnstile.config.js";

const turnstileTokenSchema = turnstileConfig.isConfigured
    ? z.string().min(1, "Security verification is required")
    : z.string().optional();

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(5000),
    turnstileToken: turnstileTokenSchema,
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
