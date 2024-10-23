import React from 'react';
import { Mobile } from '@features/layout';
import DashboardPanel from '@widgets/dashboard-panel';
import { Search, UploadBoxList, useBoxesQuery } from '@features/upload-box';

export const Home: React.FC = () => {
  const {
    query: { isFetched },
  } = useBoxesQuery();

  if (!isFetched) return null;

  return (
    <Mobile header="header-logo">
      <DashboardPanel />
      <Search />
      <UploadBoxList />
    </Mobile>
  );
};
