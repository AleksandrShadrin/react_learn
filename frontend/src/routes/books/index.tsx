import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { BookTextIcon } from 'lucide-react';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';

import { type GetBooksResponse, booksQueryOptions } from '../../api/books';

const booksSearchSchema = z.object({
    page: z.number().positive().default(1),
    limit: z.number().positive().lt(20).default(10),
});

export const Route = createFileRoute('/books/')({
    validateSearch: zodValidator(booksSearchSchema),
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context: { queryClient }, deps: { page, limit } }) =>
        queryClient.ensureQueryData(booksQueryOptions({ page, limit })),
    component: BooksComponent,
    errorComponent: () => <div>not found</div>,
    pendingComponent: PendingComponent,
    staleTime: 10,
});

function PendingComponent() {
    const { page, limit } = Route.useSearch();
    const queryClient = useQueryClient();

    const [, lastData] =
        queryClient
            .getQueriesData<GetBooksResponse>({
                queryKey: ['books'],
                exact: false,
            })
            .find(([, data]) => data) ?? [];

    return (
        <>
            <div className='relative grid flex-1 w-full gap-4 justify-center h-screen overflow-hidden blur-xs '>
                <Item className='absolute z-50 top-0 w-full h-screen' />
                <Spinner className='absolute bottom-[50%] right-[50%] size-8' />

                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <BookComponent
                            author='author'
                            category='category'
                            id='123'
                            title='title'
                            key={i}
                        />
                    ))}
            </div>
            <PaginationComponent
                page={page}
                limit={limit}
                totalPages={lastData?.pagination.totalPages ?? 0}
                showEllipsis
            />
        </>
    );
}

function BooksComponent() {
    const { page, limit } = Route.useSearch();
    const {
        data: {
            data,
            pagination: { totalPages },
        },
    } = useSuspenseQuery(booksQueryOptions({ page, limit }));

    const showEllipsis = page + 1 < totalPages;

    return (
        <>
            <div className='grid flex-1 w-full gap-4 justify-center min-h-full'>
                {data.map(book => (
                    <BookComponent
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        category={book.category}
                    />
                ))}
            </div>

            <PaginationComponent
                page={page}
                limit={limit}
                totalPages={totalPages}
                showEllipsis={showEllipsis}
            />
        </>
    );
}

function PaginationComponent(props: {
    page: number;
    limit: number;
    totalPages: number;
    showEllipsis: boolean;
}) {
    const { page, limit, totalPages, showEllipsis } = props;

    return (
        <Pagination className='sm:relative md:sticky bottom-0 z-10 mt-6 flex w-full justify-center border-t bg-background/80 py-3 backdrop-blur supports-backdrop-filter:bg-background/60'>
            <PaginationContent>
                <PaginationItem className={page === 1 ? 'hidden' : undefined}>
                    <PaginationPrevious
                        to='/books'
                        search={{ page: page - 1, limit }}
                    />
                </PaginationItem>

                {page > 1 && <PageLink page={page - 1} limit={limit} />}

                <PaginationItem>
                    <PaginationLink isActive disabled>
                        {page}
                    </PaginationLink>
                </PaginationItem>

                {page < totalPages && (
                    <PageLink page={page + 1} limit={limit} />
                )}
                {page + 1 < totalPages && (
                    <PageLink page={page + 2} limit={limit} />
                )}

                {showEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem
                    className={page >= totalPages ? 'hidden' : undefined}
                >
                    <PaginationNext
                        to='/books'
                        search={{ page: page + 1, limit }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

function BookComponent(props: {
    id: string;
    title: string;
    author: string;
    category: string;
}) {
    return (
        <Item className='h-full max-w-md'>
            <ItemHeader>{props.title}</ItemHeader>
            <ItemMedia>
                <BookTextIcon className='size-5' />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Author</ItemTitle>
                <ItemDescription>{props.author}</ItemDescription>
                <ItemTitle>Category</ItemTitle>
                <ItemDescription>{props.category}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant='outline' size='sm' asChild>
                    <Link to='/books/$id' params={{ id: props.id }}>
                        View
                    </Link>
                </Button>
            </ItemActions>
        </Item>
    );
}

function PageLink(props: { page: number; limit: number }) {
    return (
        <PaginationItem>
            <PaginationLink to='/books' search={props}>
                {props.page}
            </PaginationLink>
        </PaginationItem>
    );
}
