import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Settings from "./page/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

export default router;