import React from 'react';
import { AppLayout } from '@shared/ui';
import { Logo } from './Logo';
import { Layout } from './Layout';
import { TitleSection } from './TitleSection';
import { ControlSection } from './ControlSection';
import { HelmetConfig } from '@features/analytics/TitleTracker';

export const LandingPage: React.FC = () => {
  return (
    <AppLayout>
      <HelmetConfig title="랜딩" />
      <Layout>
        <Logo />
        <TitleSection />
        <ControlSection />
      </Layout>
    </AppLayout>
  );
};
