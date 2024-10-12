import { createBrowserRouter } from "react-router-dom";
import { urlPath } from "./consts/path";
// import { LandingPage } from "@pages/landing";
import { Home } from "@pages/home";

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    // element: <LandingPage />,
    element: <Home />,
  },
]);
