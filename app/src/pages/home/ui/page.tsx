import React from 'react';
import { Mobile } from '@features/layout';
import DashboardPanel from '@widgets/dashboard-panel';
import { Search, UploadBoxList, useBoxesQuery } from '@features/upload-box';

export const Home: React.FC = () => {
  const { data } = useBoxesQuery();

  if (!data) return null;

  return (
    <Mobile header="header-logo">
      <DashboardPanel />
      <Search />
      <UploadBoxList />
    </Mobile>
  );
};
