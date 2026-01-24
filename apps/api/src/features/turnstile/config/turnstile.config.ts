interface TurnstileConfig {
    secretKey: string;
    verifyUrl: string;
    isConfigured: boolean;
}

function loadTurnstileConfig(): TurnstileConfig {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
        console.error(
            "[Turnstile] TURNSTILE_SECRET_KEY is not configured. Turnstile verification will fail."
        );
    }

    return {
        secretKey: secretKey || "",
        verifyUrl: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        isConfigured: Boolean(secretKey),
    };
}

export const turnstileConfig = loadTurnstileConfig();
