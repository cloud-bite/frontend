import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Menu } from './Menu';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Menu />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
