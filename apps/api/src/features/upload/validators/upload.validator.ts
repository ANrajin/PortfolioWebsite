import { z } from "zod";

export const filenameParamSchema = z.object({
    filename: z.string().min(1, "Filename is required"),
});

export type FilenameParam = z.infer<typeof filenameParamSchema>;
