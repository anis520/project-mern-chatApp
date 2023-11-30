import React from "react";
import ChatArea from "../chat/ChatArea";
import Sidebar from "../sidebar/Sidebar";
import welcomeLogo from "../../../public/chathome.png";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Sidebar />
      {/* <ChatArea /> */}

      <Outlet />
    </div>
  );
};

export default Home;
