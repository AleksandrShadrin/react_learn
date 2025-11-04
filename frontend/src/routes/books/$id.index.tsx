import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon, PlusIcon, Trash2Icon } from 'lucide-react';

import { bookQueryOptions, deleteBookMutationOptions } from '@/api/books';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/books/$id/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();
    const { data } = useSuspenseQuery(bookQueryOptions(id));
    const deleteMutation = useMutation(deleteBookMutationOptions);

    const router = useRouter();

    return (
        <Card>
            <CardHeader>
                <Button
                    className='w-fit'
                    type='button'
                    variant='outline'
                    onClick={() => router.history.back()}
                    asChild
                >
                    <ArrowLeftIcon />
                </Button>
                <CardAction>
                    <ButtonGroup>
                        <Button variant='outline' asChild>
                            <Link to='/books/$id/edit' params={{ id }}>
                                Edit
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline'>
                                    <PlusIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    variant='destructive'
                                    onClick={() =>
                                        deleteMutation.mutateAsync(id)
                                    }
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2Icon />
                                    Trash
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ButtonGroup>
                </CardAction>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <AspectRatio ratio={16 / 9}>
                    <img
                        src={data.coverImage}
                        className='h-full w-full object-cover'
                    />
                </AspectRatio>
            </CardContent>
            <CardFooter className='flex h-5 items-center space-x-4 text-sm'>
                <div>published: {data.publishedYear}</div>
                <Separator orientation='vertical' />
                <div>isbn: {data.isbn}</div>
                <Separator orientation='vertical' />
                <div>category: {data.category}</div>
            </CardFooter>
        </Card>
    );
}
