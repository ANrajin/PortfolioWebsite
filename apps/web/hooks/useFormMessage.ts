'use client';

import { useState, useCallback } from 'react';

export interface FormMessage {
    type: 'success' | 'error';
    text: string;
}

export function useFormMessage(autoDismissMs = 5000) {
    const [message, setMessage] = useState<FormMessage | null>(null);

    const showSuccess = useCallback((text: string) => {
        setMessage({ type: 'success', text });
        if (autoDismissMs > 0) {
            setTimeout(() => setMessage(null), autoDismissMs);
        }
    }, [autoDismissMs]);

    const showError = useCallback((text: string) => {
        setMessage({ type: 'error', text });
    }, []);

    const clearMessage = useCallback(() => {
        setMessage(null);
    }, []);

    return { message, showSuccess, showError, clearMessage };
}
