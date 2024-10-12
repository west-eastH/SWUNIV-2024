import { createBrowserRouter } from "react-router-dom";
import { urlPath } from "./consts/path";
import { MainRouter } from "@pages/landing";

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    element: <MainRouter />,
  },
]);
