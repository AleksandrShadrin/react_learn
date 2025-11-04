import { useForm } from '@tanstack/react-form';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import z from 'zod';

import { bookMutationOptions, bookQueryOptions } from '@/api/books';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/books/$id/edit')({
    component: RouteComponent,
});

const formSchema = z.object({
    author: z.string().min(5),
    category: z.string().min(5),
    description: z.string().min(15),
    isbn: z.string().min(10),
    publishedYear: z.number().min(0).max(2400),
    title: z.string().min(2),
});
type FormValues = z.infer<typeof formSchema>;

const fieldConfig: {
    name: keyof FormValues;
    label: string;
    type?: React.ComponentProps<'input'>['type'];
}[] = [
    { name: 'author', label: 'Author' },
    { name: 'category', label: 'Category' },
    { name: 'description', label: 'Description' },
    { name: 'isbn', label: 'ISBN' },
    { name: 'publishedYear', label: 'Published year', type: 'number' },
    { name: 'title', label: 'Title' },
] as const;

function RouteComponent() {
    const { id } = Route.useParams();
    const { data } = useSuspenseQuery(bookQueryOptions(id));

    const router = useRouter();

    const updateBookMutation = useMutation(bookMutationOptions);

    const form = useForm({
        defaultValues: {
            author: data.author,
            category: data.category,
            description: data.description,
            isbn: data.isbn,
            publishedYear: data.publishedYear,
            title: data.title,
        },
        validators: { onSubmit: formSchema },
        onSubmit: async ({ value }) => {
            await updateBookMutation.mutateAsync({
                id,
                ...value,
            });
        },
    });

    return (
        <form
            className='w-lg'
            onSubmit={e => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
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
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        {fieldConfig.map(({ name, label, type = 'text' }) => (
                            <form.Field key={name} name={name}>
                                {field => {
                                    const { value, meta } = field.state;
                                    const isInvalid =
                                        meta.isTouched && !meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={name}>
                                                {label}
                                            </FieldLabel>
                                            <Input
                                                id={name}
                                                name={name}
                                                type={type}
                                                value={
                                                    typeof value === 'number'
                                                        ? String(value)
                                                        : (value ?? '')
                                                }
                                                onBlur={field.handleBlur}
                                                onChange={event =>
                                                    field.handleChange(
                                                        event.target.value
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                autoComplete='off'
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={meta.errors}
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        ))}
                    </FieldGroup>
                </CardContent>
                <CardFooter>
                    <form.Subscribe
                        selector={state => [
                            state.canSubmit,
                            state.isSubmitting,
                        ]}
                        children={([canSubmit, isSubmitting]) => (
                            <Field orientation='horizontal'>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => form.reset()}
                                >
                                    Reset
                                </Button>
                                <Button type='submit' disabled={!canSubmit}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </Field>
                        )}
                    />
                </CardFooter>
            </Card>
        </form>
    );
}
