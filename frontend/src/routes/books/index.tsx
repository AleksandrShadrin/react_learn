import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { booksQueryOptions } from "../../api/books";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { BookTextIcon } from "lucide-react";

const booksSearchSchema = z.object({
    page: z.number().positive().default(1),
    limit: z.number().positive().lt(20).default(10),
});

export const Route = createFileRoute("/books/")({
    validateSearch: zodValidator(booksSearchSchema),
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context: { queryClient }, deps: { page, limit } }) => {
        return queryClient.ensureQueryData(booksQueryOptions({ page, limit }));
    },
    component: BooksComponent,
    errorComponent: () => <div>not found</div>,
    pendingComponent: () => <div>pending...</div>,
});

function BookComponent(props: {
    id: string;
    title: string;
    author: string;
    category: string;
}) {
    return (
        <Item className="h-full max-w-md">
            <ItemHeader>{props.title}</ItemHeader>
            <ItemMedia>
                <BookTextIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Author</ItemTitle>
                <ItemDescription>{props.author}</ItemDescription>
                <ItemTitle>Category</ItemTitle>
                <ItemDescription>{props.category}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant="outline" size="sm" asChild>
                    <Link to="/books/$id" params={{ id: props.id }}>
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
            <PaginationLink to="/books" search={props}>
                {props.page}
            </PaginationLink>
        </PaginationItem>
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
        <div className="flex h-full flex-col">
            <div className="grid flex-1 w-full gap-4  justify-center">
                {data.map((book) => (
                    <BookComponent
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        category={book.category}
                    />
                ))}
            </div>

            <Pagination className="sticky bottom-0 z-10 mt-6 flex w-full justify-center border-t bg-background/80 py-3 backdrop-blur supports-backdrop-filter:bg-background/60">
                <PaginationContent>
                    <PaginationItem className={page === 1 ? "hidden" : undefined}>
                        <PaginationPrevious to="/books" search={{ page: page - 1, limit }} />
                    </PaginationItem>

                    {page > 1 && <PageLink page={page - 1} limit={limit} />}

                    <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>

                    {page < totalPages && <PageLink page={page + 1} limit={limit} />}
                    {page + 1 < totalPages && <PageLink page={page + 2} limit={limit} />}

                    {showEllipsis && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem className={page >= totalPages ? "hidden" : undefined}>
                        <PaginationNext to="/books" search={{ page: page + 1, limit }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}