"use client";

import { AlertCircle, Shield, CheckCircle, Loader2 } from "lucide-react";
import { useTurnstile } from "../hooks/useTurnstile";

interface TurnstileWidgetProps {
    siteKey: string;
    onVerify: (token: string) => void;
    onError?: (error: string) => void;
    onExpire?: () => void;
}

export function TurnstileWidget({
    siteKey,
    onVerify,
    onError,
    onExpire,
}: TurnstileWidgetProps) {
    const { containerRef, isVerified, isLoading, error } = useTurnstile({
        siteKey,
        onVerify,
        onError,
        onExpire,
    });

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
                <Shield size={16} className="text-teal-400" />
                <span>Security verification</span>
            </div>

            {/* Widget container */}
            <div
                ref={containerRef}
                className="min-h-[65px] flex items-center justify-center"
            />

            {/* Status indicators */}
            {isLoading && !error && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Loading verification...</span>
                </div>
            )}

            {isVerified && !error && (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                    <CheckCircle size={16} />
                    <span>Verification complete</span>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                </div>
            )}
        </div>
    );
}
