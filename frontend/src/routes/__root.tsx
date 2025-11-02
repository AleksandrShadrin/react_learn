import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Item } from "@/components/ui/item";

type RouterContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    notFoundComponent: () => <div>Not found</div>
});

function RootComponent() {
    return <div className="px-4">
        <Item>
            <NavigationMenu>
                <NavigationMenuList className="flex-wrap">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/books">Books</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="ml-auto">
                <ModeToggle />
            </div>
        </Item>

        <Outlet />

        <TanStackRouterDevtools position="bottom-right" />
    </div>
}

