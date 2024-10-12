import React from 'react';
import { Mobile } from "@features/layout";
import DashboardPanel from "@widgets/dashboard-panel";

export const Home: React.FC = () => {
  return (
    <Mobile
      header="header-logo"
    >
      <DashboardPanel />
    </Mobile>
  );
};
