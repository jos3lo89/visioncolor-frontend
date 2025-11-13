import { RouterProvider } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import { route } from "./routes/routes";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <RouterProvider router={route} />;
};

export default App;
