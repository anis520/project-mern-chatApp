import React from "react";
import ChatArea from "../chat/ChatArea";
import Sidebar from "../sidebar/Sidebar";
import welcomeLogo from "../../../public/chathome.png";
import { Outlet } from "react-router-dom";
import Activate from "../Activate/Activate";
const Home = () => {
  return (
    <div>
      <Activate />
      <Sidebar />

      <Outlet />
    </div>
  );
};

export default Home;
