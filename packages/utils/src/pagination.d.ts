export interface PaginationOptions {
    page: number;
    limit: number;
    total: number;
}
export interface PaginationResult {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    offset: number;
}
export declare const calculatePagination: (options: PaginationOptions) => PaginationResult;
export declare const validatePaginationParams: (page?: number, limit?: number, maxLimit?: number) => {
    page: number;
    limit: number;
};
//# sourceMappingURL=pagination.d.ts.map