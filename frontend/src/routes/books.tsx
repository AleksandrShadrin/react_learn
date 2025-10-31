import { createFileRoute } from '@tanstack/react-router';
import { booksQueryOptions } from '../api/books';
import z from 'zod';
import { zodValidator } from '@tanstack/zod-adapter';
import { useSuspenseQuery } from '@tanstack/react-query';

const booksSearchSchema = z.object({
    page: z.number().positive().default(1),
    limit: z.number().positive().lt(20).default(10)
})

export const Route = createFileRoute('/books')({
    validateSearch: zodValidator(booksSearchSchema),
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context: { queryClient }, deps: { page, limit } }) => {
        return queryClient.ensureQueryData(booksQueryOptions({ page, limit }));
    },
    component: HomeComponent,
    errorComponent: () => <div>not found</div>,
    pendingComponent: () => <div>pending...</div>
})

function HomeComponent() {
    const { page, limit } = Route.useSearch();
    const { data, isSuccess } = useSuspenseQuery(booksQueryOptions({ page, limit }));

    return <div>{isSuccess && data?.data.map(x => <div key={x.id}>{x.author}</div>)}</div>
}
