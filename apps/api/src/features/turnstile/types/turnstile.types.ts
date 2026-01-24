export interface TurnstileVerificationResult {
    success: boolean;
    challengeTs?: string;
    hostname?: string;
    errorCodes: TurnstileErrorCode[];
    action?: string;
    cdata?: string;
}

export type TurnstileErrorCode =
    | "missing-input-secret"
    | "invalid-input-secret"
    | "missing-input-response"
    | "invalid-input-response"
    | "invalid-widget-id"
    | "invalid-parsed-secret"
    | "bad-request"
    | "timeout-or-duplicate"
    | "internal-error";

export interface TurnstileSiteverifyRequest {
    secret: string;
    response: string;
    remoteip?: string;
}

export interface TurnstileSiteverifyResponse {
    success: boolean;
    "challenge_ts"?: string;
    hostname?: string;
    "error-codes"?: TurnstileErrorCode[];
    action?: string;
    cdata?: string;
}
