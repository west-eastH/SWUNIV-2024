import React from 'react';
import { RouterProvider as Provider } from "react-router-dom";
import { router } from "./router";

export const RouterProvider: React.FC = () => {
  return (
    <Provider router={router} />
  );
};
