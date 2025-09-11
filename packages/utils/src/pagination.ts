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

export const calculatePagination = (options: PaginationOptions): PaginationResult => {
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

export const validatePaginationParams = (page?: number, limit?: number, maxLimit: number = 100) => {
  const validPage = Math.max(1, page || 1);
  const validLimit = Math.min(Math.max(1, limit || 10), maxLimit);
  
  return {
    page: validPage,
    limit: validLimit
  };
};

