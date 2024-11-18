import { Navigate, createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Recommend from "@/pages/Home/Recommend";
import Singer from "@/pages/Home/Singer";
import Rank from "@/pages/Home/Rank";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
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
            path: "singer",
            element: <Singer />
          },
          {
            path: "rank",
            element: <Rank />
          }
        ]
      }
    ]
  }

  // NotFound
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);

export default router;
