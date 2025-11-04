import { Outlet, createFileRoute } from '@tanstack/react-router';

import { bookQueryOptions } from '@/api/books';
import { Item } from '@/components/ui/item';

export const Route = createFileRoute('/books/$id')({
    loader: ({ context: { queryClient }, params }) =>
        queryClient.ensureQueryData(bookQueryOptions(params.id)),
    component: RootComponent,
});

function RootComponent() {
    return (
        <Item className='justify-center'>
            <Outlet />
        </Item>
    );
}
