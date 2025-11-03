import { queryOptions, useQuery } from '@tanstack/react-query';

import axiosClient from './axiosClient';

export type GetBooksRequest = {
    page: number;
    limit: number;
};

export type GetBooksResponse = {
    data: BookDto[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type BookDto = {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publishedYear: number;
    coverImage: string;
    description: string;
};

export const booksQueryOptions = (request: GetBooksRequest) =>
    queryOptions({
        queryKey: ['books', request.page, request.limit],
        queryFn: () => getBooks(request),
    });

export function getBooks(request: GetBooksRequest) {
    return axiosClient
        .get<GetBooksResponse>('/books', {
            params: request,
        })
        .then(d => d.data);
}

export function useBooks(request: GetBooksRequest) {
    return useQuery({
        queryKey: ['books', request.page, request.limit],
        queryFn: () =>
            axiosClient
                .get<GetBooksResponse>('/books', {
                    params: request,
                })
                .then(d => d.data),
    });
}
