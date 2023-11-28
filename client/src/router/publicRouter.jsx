import Layout from "../components/layout/Layout";
import Activation from "../components/pages/Activation";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ResetPassword from "../components/pages/ResetPassword";

// create public router
const publicRouter = [
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
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      // {
      // path: "/forgot",
      // element: <Forgot />,
      // },
      {
        path: "/activation",
        element: <Activation />,
      },
    ],
  },
];

// export router
export default publicRouter;
