import { turnstileConfig } from "../config/turnstile.config.js";
import { logger } from "@/shared/services/logger.js";
import type {
    TurnstileVerificationResult,
    TurnstileSiteverifyResponse,
} from "../types/turnstile.types.js";

export class TurnstileService {
    async verifyToken(
        token: string,
        remoteIp?: string
    ): Promise<TurnstileVerificationResult> {
        if (!turnstileConfig.isConfigured) {
            return {
                success: false,
                errorCodes: ["missing-input-secret"],
            };
        }

        if (!token) {
            return {
                success: false,
                errorCodes: ["missing-input-response"],
            };
        }

        try {
            const formData = new URLSearchParams();
            formData.append("secret", turnstileConfig.secretKey);
            formData.append("response", token);

            if (remoteIp) {
                formData.append("remoteip", remoteIp);
            }

            const response = await fetch(turnstileConfig.verifyUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                logger.turnstile.error("Siteverify API failed", {
                    status: response.status,
                });
                return {
                    success: false,
                    errorCodes: ["bad-request"],
                };
            }

            const data = (await response.json()) as TurnstileSiteverifyResponse;

            return {
                success: data.success,
                challengeTs: data["challenge_ts"],
                hostname: data.hostname,
                errorCodes: data["error-codes"] || [],
                action: data.action,
                cdata: data.cdata,
            };
        } catch (error) {
            logger.turnstile.error("Verification request failed", {
                error: error instanceof Error ? error.message : String(error),
            });
            return {
                success: false,
                errorCodes: ["internal-error"],
            };
        }
    }
}

export const turnstileService = new TurnstileService();

