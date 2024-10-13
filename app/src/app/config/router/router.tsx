import { createBrowserRouter } from "react-router-dom";
import { urlPath } from "./consts/path";
import { MainRouter } from "@pages/landing";
import UploadPage from "@pages/upload/ui/page";

export const router = createBrowserRouter([
  {
    path: urlPath.root,
    element: <MainRouter />,
  },
  {
    path: urlPath.upload,
    element: <UploadPage />,
  },
]);
