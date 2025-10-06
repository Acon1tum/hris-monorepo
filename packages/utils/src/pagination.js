"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaginationParams = exports.calculatePagination = void 0;
const calculatePagination = (options) => {
    const { page, limit, total } = options;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    return {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
        offset
    };
};
exports.calculatePagination = calculatePagination;
const validatePaginationParams = (page, limit, maxLimit = 100) => {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.min(Math.max(1, limit || 10), maxLimit);
    return {
        page: validPage,
        limit: validLimit
    };
};
exports.validatePaginationParams = validatePaginationParams;
//# sourceMappingURL=pagination.js.map