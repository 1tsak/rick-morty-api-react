import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/index.tsx";
import Episode from "./Episode/index.tsx";
import Character from "./Character/index.tsx";
import Search from "./Search/index.tsx";
import Location from "./Loacation/index.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Layout from "./components/Layout.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "episode/:episodeID",
        element: <Episode />,
      },
      {
        path: "character/:characterID",
        element: <Character />,
      },
      {
        path: "location/:locationID",
        element: <Location />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  </React.StrictMode>
);
