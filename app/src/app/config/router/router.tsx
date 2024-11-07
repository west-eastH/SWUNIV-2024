import { createBrowserRouter } from 'react-router-dom';
import { urlPath } from './consts/path';
import { MainRouter } from '@pages/landing';
import { FileUploadCompletePage, UploadPage } from '@pages/upload';
import { MenuHome } from '@pages/menu';
import { IpFilter } from '@features/access';

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    element: <MainRouter />,
  },
  {
    path: urlPath.upload,
    element: (
      <IpFilter>
        <UploadPage />
      </IpFilter>
    ),
  },
  {
    path: urlPath.uploadComplete,
    element: (
      <IpFilter>
        <FileUploadCompletePage />
      </IpFilter>
    ),
  },
  {
    path: urlPath.menu,
    element: (
      <IpFilter>
        <MenuHome />
      </IpFilter>
    ),
  },
]);
