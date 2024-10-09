import { createBrowserRouter } from "react-router-dom";
import { urlPath } from "./consts/path";
import { LandingPage } from "@pages/landing";

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    element: <LandingPage />,
  },
]);
