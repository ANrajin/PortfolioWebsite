import type { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { AppError } from "../errors/app-error.js";

type ValidationTarget = "body" | "params" | "query";

interface ValidationConfig {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
}

function formatZodError(error: ZodError): Record<string, string[]> {
    const details: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const path = issue.path.join(".") || "root";
        if (!details[path]) {
            details[path] = [];
        }
        details[path].push(issue.message);
    }

    return details;
}

export function validate(config: ValidationConfig) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: Record<string, string[]> = {};

        for (const [target, schema] of Object.entries(config) as [ValidationTarget, ZodSchema][]) {
            if (!schema) continue;

            const result = schema.safeParse(req[target]);

            if (!result.success) {
                const targetErrors = formatZodError(result.error);
                for (const [key, messages] of Object.entries(targetErrors)) {
                    const prefixedKey = target === "body" ? key : `${target}.${key}`;
                    errors[prefixedKey] = messages;
                }
            } else {
                req[target] = result.data;
            }
        }

        if (Object.keys(errors).length > 0) {
            next(AppError.validation("Validation failed", errors));
            return;
        }

        next();
    };
}
