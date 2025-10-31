import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { queryClient } from './api/queryClient';

export const router = createRouter({
  routeTree,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient: queryClient
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
