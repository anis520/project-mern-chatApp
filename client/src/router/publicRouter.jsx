import Layout from "../components/layout/Layout";
import Activation from "../components/pages/Activation";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ResetPasswordConfirm from "../components/pages/ResetPasswordConfirm";
import ResetPassword from "../components/pages/ResetPassword";

import PublicGard from "./PublicGard";
// create public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/resetpassword/:paramstoken",
            element: <ResetPasswordConfirm />,
          },
          {
            path: "/resetpassword",
            element: <ResetPassword />,
          },

          {
            path: "/activation",
            element: <Activation />,
          },
        ],
      },
    ],
  },
  {
    path: "/activation/:paramstoken",
    element: <Activation />,
  },
];

// export router
export default publicRouter;
