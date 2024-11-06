import React from 'react';
import { Mobile } from '@features/layout';
import DashboardPanel from '@widgets/dashboard-panel';
import { Search, UploadBoxList, useBoxesQuery } from '@features/upload-box';
import { Typo } from '@shared/ui';

export const Home: React.FC = () => {
  const { data } = useBoxesQuery();

  if (data?.boxes.length === 0) {
    return (
      <div className="col items-center">
        <Typo size={14}>데이터가 존재하지 않습니다.</Typo>
      </div>
    );
  }
  if (!data) return null;

  return (
    <Mobile header="header-logo">
      <DashboardPanel />
      <Search />
      <UploadBoxList />
    </Mobile>
  );
};
