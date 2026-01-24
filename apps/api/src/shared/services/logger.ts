/**
 * Centralized logger utility for consistent logging across the API
 */
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
    [key: string]: unknown;
}

function formatMessage(
    level: LogLevel,
    prefix: string,
    message: string,
    context?: LogContext
): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] [${prefix}] ${message}${contextStr}`;
}

function createLogger(prefix: string) {
    return {
        debug: (message: string, context?: LogContext) => {
            if (process.env.NODE_ENV !== "production") {
                console.debug(formatMessage("debug", prefix, message, context));
            }
        },
        info: (message: string, context?: LogContext) => {
            console.info(formatMessage("info", prefix, message, context));
        },
        warn: (message: string, context?: LogContext) => {
            console.warn(formatMessage("warn", prefix, message, context));
        },
        error: (message: string, context?: LogContext) => {
            console.error(formatMessage("error", prefix, message, context));
        },
    };
}

export const logger = {
    create: createLogger,
    turnstile: createLogger("Turnstile"),
    contact: createLogger("Contact"),
    email: createLogger("Email"),
};
