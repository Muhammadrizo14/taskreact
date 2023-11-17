import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Settings from "./page/settings";
import Countries from "./page/countries";
import Country from "./page/country";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/country",
    element: <Countries />,
  },
  {
    path: "/country/:id",
    element: <Country />,
  },
]);

export default router;