import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { router } from '@/router';

import axiosClient from './axiosClient';
import { queryClient } from './queryClient';

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

export const bookQueryOptions = (id: string) =>
    queryOptions({
        queryKey: ['book', id],
        queryFn: () => getBook(id),
    });

export const deleteBookMutationOptions = mutationOptions({
    mutationFn: deleteBook,
    onSuccess: id => {
        queryClient.removeQueries({ queryKey: ['book', id] });

        const queryData = queryClient.getQueriesData<GetBooksResponse>({
            queryKey: ['books'],
            exact: false,
        });

        const data = queryData
            .flatMap(d => d[1])
            .find(x => x?.data.find(b => b.id === id));

        if (data) {
            queryClient.invalidateQueries({
                queryKey: [
                    'books',
                    data.pagination.page,
                    data.pagination.limit,
                ],
            });
        }

        if (router.history.canGoBack()) router.history.back();
        else router.navigate({ to: '/books' });
    },
});

export const bookMutationOptions = mutationOptions({
    mutationFn: updateBook,
    onSuccess: book => {
        queryClient.setQueryData(['book', book?.id], book);

        const queryData = queryClient.getQueriesData<GetBooksResponse>({
            queryKey: ['books'],
            exact: false,
        });

        const data = queryData
            .flatMap(d => d[1])
            .find(x => x?.data.find(b => b.id === book?.id));

        if (data) {
            queryClient.invalidateQueries({
                queryKey: [
                    'books',
                    data.pagination.page,
                    data.pagination.limit,
                ],
            });
        }
    },
});

export function deleteBook(id: string) {
    return axiosClient.delete(`/books/${id}`).then(() => id);
}

export function updateBook(book: Partial<BookDto>) {
    return axiosClient
        .put<BookDto>(`/books/${book.id}`, book)
        .then(d => d.data);
}

export function getBooks(request: GetBooksRequest) {
    return axiosClient
        .get<GetBooksResponse>('/books', {
            params: request,
        })
        .then(d => d.data);
}

export function getBook(id: string) {
    return axiosClient.get<BookDto>(`/books/${id}`).then(d => d.data);
}
