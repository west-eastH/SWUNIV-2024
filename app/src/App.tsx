import '@app/config/style/global.css';
import { RouterProvider } from '@app/config/router';
import { ModalProvider } from '@shared/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider />
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default App;
