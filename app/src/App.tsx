import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';

import '@app/config/style/global.css';
import { RouterProvider } from '@app/config/router';
import { ModalProvider } from '@shared/ui';
import { queryClient } from '@shared/config';

const HelmetConfig: React.FC = () => (
  <Helmet>
    <title>한밭박스</title>
    <meta property="og:title" content="파일공유를 더 손쉽고 빠르게." />
    <meta
      property="og:description"
      content="교내에서 자료를 더 손쉽고 빠르게 공유하세요!"
    />
    <meta
      property="og:image"
      content="https://github.com/west-eastH/SWUNIV-2024/blob/main/og-image.png"
    />
  </Helmet>
);

const App = () => {
  return (
    <HelmetProvider>
      <HelmetConfig />
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RouterProvider />
        </ModalProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
