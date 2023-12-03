import React, { Children } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Activation from "../pages/Activation";
import { Outlet } from "react-router-dom";
import Theme from "../../features/theme/theme";

const Layout = () => {
  return (
    <div className="relative ">
      <Outlet />
    </div>
  );
};

export default Layout;
