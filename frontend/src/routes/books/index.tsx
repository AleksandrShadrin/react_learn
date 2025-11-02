import { createFileRoute, Link } from '@tanstack/react-router';
import { booksQueryOptions } from '../../api/books';
import z from 'zod';
import { zodValidator } from '@tanstack/zod-adapter';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { BookTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const booksSearchSchema = z.object({
    page: z.number().positive().default(1),
    limit: z.number().positive().lt(20).default(10)
})

export const Route = createFileRoute('/books/')({
    validateSearch: zodValidator(booksSearchSchema),
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context: { queryClient }, deps: { page, limit } }) => {
        return queryClient.ensureQueryData(booksQueryOptions({ page, limit }));
    },
    component: BooksComponent,
    errorComponent: () => <div>not found</div>,
    pendingComponent: () => <div>pending...</div>
})

function BookComponent(props: { id: string, title: string, author: string, category: string }) {
    return <Item className='max-w-2xs min-w-2'>
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
            <Button variant="outline" size="sm" asChild>
                <Link to='/books/$id' params={{ id: props.id }}>view</Link>
            </Button>
        </ItemActions>
    </Item>
}

function PageLink(props: { page: number, limit: number }) {
    return <PaginationItem>
        <PaginationLink to='/books' search={props}>
            {props.page}
        </PaginationLink>
    </PaginationItem>;
}


function BooksComponent() {
    const { page, limit } = Route.useSearch();
    const { data: { data, pagination: { totalPages } } } = useSuspenseQuery(booksQueryOptions({ page, limit }));

    return <div className='flex flex-col justify-between items-center'>
        {data.map(x => <BookComponent key={x.id} title={x.title} author={x.author} category={x.category} id={x.id} />)}

        <Pagination className='sticky bottom-0 py-1.5 backdrop-blur-3xl'>
            <PaginationContent>
                <PaginationItem hidden={page - 1 === 0} >
                    <PaginationPrevious to='/books' search={{ page: page - 1, limit }} />
                </PaginationItem>

                {page > 1 && <PageLink page={page - 1} limit={limit} />}

                <PaginationItem>
                    <PaginationLink isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>

                {page < totalPages && <PageLink page={page + 1} limit={limit} />}
                {page + 1 < totalPages && <PageLink page={page + 2} limit={limit} />}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem hidden={page >= totalPages}>
                    <PaginationNext to='/books' search={{ page: page + 1, limit }} />
                </PaginationItem>

            </PaginationContent>
        </Pagination>

    </div>
}
