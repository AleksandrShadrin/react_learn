import type { QueryClient } from '@tanstack/react-query';
import {
    Link,
    Outlet,
    createRootRouteWithContext,
    useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { HomeIcon } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import type { FileRoutesByTo } from '@/routeTree.gen';

type RouterContext = {
    queryClient: QueryClient;
};

const navItems: { label: string; to: keyof FileRoutesByTo }[] = [
    { label: 'Dashboard', to: '/' },
    { label: 'Books', to: '/books' },
];

function isRouteActive(pathname: string, routePath: string): boolean {
    if (routePath === '/') return pathname === '/';
    return pathname.startsWith(routePath);
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    notFoundComponent: () => <div>Not found</div>,
});

function RootComponent() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='flex min-h-screen flex-1 flex-col bg-muted/20'>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator orientation='vertical' className='mr-2 h-4' />
                </header>
                <main style={{ height: 'calc(100vh - var(--spacing) * 16)' }}>
                    <ScrollArea className='pt-6 h-full'>
                        <Outlet />
                    </ScrollArea>
                </main>
            </SidebarInset>
            <TanStackRouterDevtools position='bottom-right' />
        </SidebarProvider>
    );
}

function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <Link to='/' className='text-lg font-semibold'>
                    <HomeIcon />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(item => (
                                <SidebarMenuItem key={item.to}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isRouteActive(
                                            location.pathname,
                                            item.to
                                        )}
                                    >
                                        <Link to={item.to}>{item.label}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <ModeToggle />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
