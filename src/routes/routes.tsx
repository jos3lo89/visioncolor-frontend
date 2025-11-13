import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import History from "../pages/History";
import MainLayout from "../layout/MainLayout";

export const route = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/history",
        element: <History />,
      },
    ],
  },
]);
