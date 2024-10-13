import React from 'react';
import { Mobile } from "@features/layout";
import DashboardPanel from "@widgets/dashboard-panel";
import { Search } from "@features/upload-box";
import UploadBoxList from "@features/upload-box/list";
import { mockUploadBox } from "@entities/upload-box";

export const Home: React.FC = () => {
  const data = Array.from({ length: 10 }, () => ({ ...mockUploadBox }));

  return (
    <Mobile
      header="header-logo"
    >
      <DashboardPanel />
      <Search />
      <UploadBoxList data={data} />
    </Mobile>
  );
};
