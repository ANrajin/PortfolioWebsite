import type { Request, Response, NextFunction } from "express";
import { turnstileService } from "../services/turnstile.service.js";
import { turnstileConfig } from "../config/turnstile.config.js";
import { AppError } from "@/shared/errors/app-error.js";

function getClientIp(req: Request): string | undefined {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
        return forwarded.split(",")[0].trim();
    }
    if (Array.isArray(forwarded)) {
        return forwarded[0];
    }
    return req.socket.remoteAddress;
}

export function verifyTurnstile() {
    return async (
        req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<void> => {
        if (!turnstileConfig.isConfigured) {
            console.warn(
                "[Turnstile] Skipping verification - not configured"
            );
            req.turnstileVerified = false;
            next();
            return;
        }

        const token = req.body?.turnstileToken;

        if (!token) {
            next(
                AppError.badRequest("Security verification is required", {
                    turnstileToken: ["Please complete the security check"],
                })
            );
            return;
        }

        const clientIp = getClientIp(req);
        const result = await turnstileService.verifyToken(token, clientIp);

        if (!result.success) {
            const errorMessage = result.errorCodes.includes(
                "timeout-or-duplicate"
            )
                ? "Security verification expired. Please try again."
                : "Security verification failed. Please try again.";

            next(
                AppError.forbidden(errorMessage, {
                    turnstileToken: [errorMessage],
                })
            );
            return;
        }

        req.turnstileVerified = true;
        next();
    };
}
