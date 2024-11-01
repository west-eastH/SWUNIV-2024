import '@app/config/style/global.css';
import { RouterProvider } from '@app/config/router';
import { ModalProvider } from '@shared/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/config';

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
