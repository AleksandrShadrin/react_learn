import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';
import { router } from './router.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
