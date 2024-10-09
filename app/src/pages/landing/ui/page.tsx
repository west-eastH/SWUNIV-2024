import React from 'react';
import { AppLayout } from "@shared/ui";
import { Logo } from "./Logo";
import { Layout } from "./Layout";
import { TitleSection } from "./TitleSection";
import { ControlSection } from "./ControlSection";

export const LandingPage: React.FC = () => {
  return (
    <AppLayout>
      <Layout>
        <Logo />
        <TitleSection />
        <ControlSection />
      </Layout>
    </AppLayout>
  );
};
