export enum ErrorCode {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    BAD_REQUEST = "BAD_REQUEST",
}

const HTTP_STATUS_MAP: Record<ErrorCode, number> = {
    [ErrorCode.VALIDATION_ERROR]: 400,
    [ErrorCode.BAD_REQUEST]: 400,
    [ErrorCode.UNAUTHORIZED]: 401,
    [ErrorCode.FORBIDDEN]: 403,
    [ErrorCode.NOT_FOUND]: 404,
    [ErrorCode.CONFLICT]: 409,
    [ErrorCode.INTERNAL_ERROR]: 500,
};

export class AppError extends Error {
    public readonly code: ErrorCode;
    public readonly statusCode: number;
    public readonly details?: Record<string, string[]>;
    public readonly isOperational: boolean;

    constructor(
        code: ErrorCode,
        message: string,
        details?: Record<string, string[]>
    ) {
        super(message);
        this.code = code;
        this.statusCode = HTTP_STATUS_MAP[code];
        this.details = details;
        this.isOperational = true;

        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

    static validation(message: string, details?: Record<string, string[]>): AppError {
        return new AppError(ErrorCode.VALIDATION_ERROR, message, details);
    }

    static notFound(resource: string): AppError {
        return new AppError(ErrorCode.NOT_FOUND, `${resource} not found`);
    }

    static conflict(message: string): AppError {
        return new AppError(ErrorCode.CONFLICT, message);
    }

    static internal(message = "An unexpected error occurred"): AppError {
        return new AppError(ErrorCode.INTERNAL_ERROR, message);
    }

    static badRequest(message: string, details?: Record<string, string[]>): AppError {
        return new AppError(ErrorCode.BAD_REQUEST, message, details);
    }

    static forbidden(message: string, details?: Record<string, string[]>): AppError {
        return new AppError(ErrorCode.FORBIDDEN, message, details);
    }
}
