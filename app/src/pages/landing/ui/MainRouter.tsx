import React from 'react';
import { useNameManager } from "@features/nickname";
import { Home } from "@pages/home";
import { LandingPage } from "./page";

export const MainRouter: React.FC = () => {
  const { nickname } = useNameManager();

  if (nickname) return <Home />;
  return <LandingPage />;
};
