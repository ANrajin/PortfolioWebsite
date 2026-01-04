import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
import type { ApiResponse } from "../types/api.types.js";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response<ApiResponse<never>>,
    next: NextFunction
): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
        return;
    }

    console.error("Unhandled error:", err);

    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred",
        },
    });
}
