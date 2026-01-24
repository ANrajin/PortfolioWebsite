export interface TurnstileCallbacks {
    onVerify: (token: string) => void;
    onError?: (error: string) => void;
    onExpire?: () => void;
    onLoad?: () => void;
}

export interface TurnstileWidgetOptions {
    siteKey: string;
    theme?: "light" | "dark" | "auto";
    size?: "normal" | "compact";
    language?: string;
    retry?: "auto" | "never";
    retryInterval?: number;
    refreshExpired?: "auto" | "manual" | "never";
    appearance?: "always" | "execute" | "interaction-only";
}

export interface TurnstileState {
    token: string | null;
    isVerified: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface TurnstileInstance {
    render: (
        container: string | HTMLElement,
        options: TurnstileRenderOptions
    ) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId?: string) => void;
    getResponse: (widgetId?: string) => string | undefined;
}

export interface TurnstileRenderOptions {
    sitekey: string;
    callback?: (token: string) => void;
    "error-callback"?: (error: string) => void;
    "expired-callback"?: () => void;
    theme?: "light" | "dark" | "auto";
    size?: "normal" | "compact";
    language?: string;
    retry?: "auto" | "never";
    "retry-interval"?: number;
    "refresh-expired"?: "auto" | "manual" | "never";
    appearance?: "always" | "execute" | "interaction-only";
}

declare global {
    interface Window {
        turnstile?: TurnstileInstance;
        onTurnstileLoad?: () => void;
    }
}
