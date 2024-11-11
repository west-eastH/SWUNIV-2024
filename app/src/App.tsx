import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';

import '@app/config/style/global.css';
import { RouterProvider } from '@app/config/router';
import { ModalProvider } from '@shared/ui';
import { queryClient } from '@shared/config';
import ReactGA from 'react-ga4';

const trackingId = import.meta.env.VITE_GA_KEY;

ReactGA.initialize(trackingId);

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RouterProvider />
        </ModalProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
