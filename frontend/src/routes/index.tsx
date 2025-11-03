import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: HomeComponent,
    notFoundComponent: () => <div>not found</div>,
});

function HomeComponent() {
    return <div>hello</div>;
}
