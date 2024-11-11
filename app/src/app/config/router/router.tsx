import { createBrowserRouter } from 'react-router-dom';
import { urlPath } from './consts/path';
import { MainRouter } from '@pages/landing';
import { FileUploadCompletePage, UploadPage } from '@pages/upload';
import { MenuHome } from '@pages/menu';
import { IpFilter } from '@features/access';
import { WithinPeople } from '@pages/within-people';
import { HistoryTracker } from '@features/analytics';

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    element: (
      <>
        <MainRouter />
        <HistoryTracker />
      </>
    ),
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
  {
    path: urlPath.peopleWithin,
    element: <WithinPeople />,
  },
]);
