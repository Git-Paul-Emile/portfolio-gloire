import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import { ToastProvider } from '@/components/ui/ToastProvider';
import AppRoutes from '@/routes/AppRoutes';

/**
 * Le client TanStack Query est cree une seule fois, en dehors du composant,
 * pour ne pas etre recree a chaque rendu et perdre son cache.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      // L'envoi d'un formulaire ne doit jamais partir deux fois tout seul.
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <AppErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ToastProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </AppErrorBoundary>
  );
}
