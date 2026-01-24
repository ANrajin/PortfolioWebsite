"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { TurnstileState, TurnstileInstance } from "../types/turnstile.types";

const TURNSTILE_SCRIPT_URL =
    "https://challenges.cloudflare.com/turnstile/v0/api.js";

interface UseTurnstileOptions {
    siteKey: string;
    onVerify?: (token: string) => void;
    onError?: (error: string) => void;
    onExpire?: () => void;
}

interface UseTurnstileReturn extends TurnstileState {
    containerRef: React.RefObject<HTMLDivElement | null>;
    reset: () => void;
    isScriptLoaded: boolean;
}

export function useTurnstile(options: UseTurnstileOptions): UseTurnstileReturn {
    const { siteKey, onVerify, onError, onExpire } = options;

    const [state, setState] = useState<TurnstileState>({
        token: null,
        isVerified: false,
        isLoading: true,
        error: null,
    });

    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const isRenderedRef = useRef(false);

    const handleVerify = useCallback(
        (token: string) => {
            setState({
                token,
                isVerified: true,
                isLoading: false,
                error: null,
            });
            onVerify?.(token);
        },
        [onVerify]
    );

    const handleError = useCallback(
        (error: string) => {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: error || "Verification failed. Please try again.",
            }));
            onError?.(error);
        },
        [onError]
    );

    const handleExpire = useCallback(() => {
        setState({
            token: null,
            isVerified: false,
            isLoading: false,
            error: "Verification expired. Please verify again.",
        });
        onExpire?.();
    }, [onExpire]);

    const reset = useCallback(() => {
        const turnstile = window.turnstile as TurnstileInstance | undefined;
        if (turnstile && widgetIdRef.current) {
            turnstile.reset(widgetIdRef.current);
        }
        setState({
            token: null,
            isVerified: false,
            isLoading: true,
            error: null,
        });
    }, []);

    const renderWidget = useCallback(() => {
        const turnstile = window.turnstile as TurnstileInstance | undefined;
        if (!turnstile || !containerRef.current || isRenderedRef.current) {
            return;
        }

        if (!siteKey) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: "Turnstile is not configured. Contact form is disabled.",
            }));
            return;
        }

        try {
            widgetIdRef.current = turnstile.render(containerRef.current, {
                sitekey: siteKey,
                callback: handleVerify,
                "error-callback": handleError,
                "expired-callback": handleExpire,
                theme: "dark",
                size: "normal",
                retry: "auto",
                "retry-interval": 5000,
                "refresh-expired": "auto",
                appearance: "always",
            });
            isRenderedRef.current = true;
        } catch (err) {
            console.error("[Turnstile] Failed to render widget:", err);
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: "Failed to load security verification.",
            }));
        }
    }, [siteKey, handleVerify, handleError, handleExpire]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const existingScript = document.querySelector(
            `script[src^="${TURNSTILE_SCRIPT_URL}"]`
        );

        if (existingScript) {
            if (window.turnstile) {
                setIsScriptLoaded(true);
            } else {
                existingScript.addEventListener("load", () => {
                    setIsScriptLoaded(true);
                });
            }
            return;
        }

        const script = document.createElement("script");
        script.src = `${TURNSTILE_SCRIPT_URL}?render=explicit&onload=onTurnstileLoad`;
        script.async = true;
        script.defer = true;

        window.onTurnstileLoad = () => {
            setIsScriptLoaded(true);
        };

        script.onerror = () => {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: "Failed to load security verification script.",
            }));
        };

        document.head.appendChild(script);

        return () => {
            window.onTurnstileLoad = undefined;
        };
    }, []);

    useEffect(() => {
        if (isScriptLoaded && containerRef.current && !isRenderedRef.current) {
            renderWidget();
        }
    }, [isScriptLoaded, renderWidget]);

    useEffect(() => {
        return () => {
            const turnstile = window.turnstile as TurnstileInstance | undefined;
            if (turnstile && widgetIdRef.current) {
                try {
                    turnstile.remove(widgetIdRef.current);
                } catch {
                    // Widget may already be removed
                }
            }
            isRenderedRef.current = false;
            widgetIdRef.current = null;
        };
    }, []);

    return {
        ...state,
        containerRef,
        reset,
        isScriptLoaded,
    };
}
