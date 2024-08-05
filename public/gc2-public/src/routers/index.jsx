import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/Home";
import Detail from "../views/Detail";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/articles/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
