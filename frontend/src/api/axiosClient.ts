import axios, { AxiosError, type AxiosResponse } from 'axios';

export interface AppError {
    code: string;
    message: string;
    status: number;
    details?: unknown;
}

class ApiError extends Error {
    public appError: AppError;
    constructor(appError: AppError) {
        super(appError.message);
        this.name = 'ApiError';
        this.appError = appError;
    }
}
interface BackendError {
    message?: string;
    errors?: unknown;
}

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const mapHttpError = (error: AxiosError<BackendError>): AppError => {
    const status = error.response?.status || 0;
    const data = error.response?.data;

    const errorMap: Record<number, (data?: BackendError) => AppError> = {
        400: data => ({
            code: 'BAD_REQUEST',
            message: data?.message || 'Invalid request',
            status: 400,
            details: data?.errors,
        }),
        401: () => ({
            code: 'UNAUTHORIZED',
            message: 'Please login to continue',
            status: 401,
        }),
        403: () => ({
            code: 'FORBIDDEN',
            message: 'You do not have permission',
            status: 403,
        }),
        404: () => ({
            code: 'NOT_FOUND',
            message: 'Resource not found',
            status: 404,
        }),
        409: data => ({
            code: 'CONFLICT',
            message: data?.message || 'Resource already exists',
            status: 409,
        }),
        422: data => ({
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            status: 422,
            details: data?.errors,
        }),
        500: () => ({
            code: 'SERVER_ERROR',
            message: 'Server error occurred',
            status: 500,
        }),
        503: () => ({
            code: 'SERVICE_UNAVAILABLE',
            message: 'Service temporarily unavailable',
            status: 503,
        }),
    };

    const handler = errorMap[status];
    return handler
        ? handler(data)
        : {
              code: 'UNKNOWN_ERROR',
              message: error.message || 'An unexpected error occurred',
              status,
          };
};

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<BackendError>) => {
        const appError = mapHttpError(error);
        return Promise.reject(new ApiError(appError));
    }
);

export { ApiError };
export default axiosClient;
