import { Navigate, createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import { lazy, Suspense } from "react";

const AlbumDetail =lazy(()=>import("@/pages/Album-detail"))

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to={"/home/recommend"} />
          },
          {
            path: "recommend",
            element: <Recommend />
          },
          {
            path: "rank",
            element: <Rank />
          }
        ]
      },
      {
        path: "album/:id",
        element: (
          <Suspense fallback="loading...">
            <AlbumDetail />
          </Suspense>
        )
      }
    ]
  }

]);

export default router;
