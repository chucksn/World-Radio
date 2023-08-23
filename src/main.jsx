import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/home";
import "./index.css";
import { store } from "../src/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPg from "./routes/errorPg";
import SignIn from "./routes/signIn";
import VerifyConfirmationPg from "./routes/verifyConfirmationPg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "verify/:token/:authenticationToken",
        element: <VerifyConfirmationPg />,
      },
      {
        path: "*",
        element: <ErrorPg />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
