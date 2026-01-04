/** Standardized API response wrapper */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}

/** Standardized API error structure */
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string[]>;
}

/** Pagination parameters */
export interface PaginationParams {
    page: number;
    limit: number;
}

/** Paginated response */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
