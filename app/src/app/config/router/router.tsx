import { createBrowserRouter } from 'react-router-dom';
import { urlPath } from './consts/path';
import { MainRouter } from '@pages/landing';
import { FileUploadCompletePage, UploadPage } from '@pages/upload';
import { MenuHome } from '@pages/menu';
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
      <>
        <UploadPage />
        <HistoryTracker />
      </>
    ),
  },
  {
    path: urlPath.uploadComplete,
    element: (
      <>
        <FileUploadCompletePage />
        <HistoryTracker />
      </>
    ),
  },
  {
    path: urlPath.menu,
    element: (
      <>
        <MenuHome />
        <HistoryTracker />
      </>
    ),
  },
  {
    path: urlPath.peopleWithin,
    element: (
      <>
        <WithinPeople />
        <HistoryTracker />
      </>
    ),
  },
]);
