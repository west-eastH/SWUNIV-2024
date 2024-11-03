import { createBrowserRouter } from 'react-router-dom';
import { urlPath } from './consts/path';
import { MainRouter } from '@pages/landing';
import { FileUploadCompletePage, UploadPage } from '@pages/upload';
import { MenuHome } from '@pages/menu';

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    element: <MainRouter />,
  },
  {
    path: urlPath.upload,
    element: <UploadPage />,
  },
  {
    path: urlPath.uploadComplete,
    element: <FileUploadCompletePage />,
  },
  {
    path: urlPath.menu,
    element: <MenuHome />,
  },
]);
