import '@app/config/style/global.css';
import { RouterProvider } from '@app/config/router';
import { ModalProvider } from '@shared/ui';

const App = () => {
  return (
    <ModalProvider>
      <RouterProvider />
    </ModalProvider>
  );
};

export default App;