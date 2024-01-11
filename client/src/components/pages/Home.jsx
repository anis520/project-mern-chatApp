import React, { useEffect, useRef, useState } from "react";
import ChatArea from "../chat/ChatArea";
import Sidebar from "../sidebar/Sidebar";
import welcomeLogo from "../../../public/chathome.png";
import { Outlet } from "react-router-dom";
import Activate from "../Activate/Activate";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUser } from "../../features/chat/chatSlice";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { onlineUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    //send login user as active
    socket.current.emit("addUser", user);
    //get active user as active
    socket.current.on("userarray", (data) => {
      // setOnlineUser(data);
      dispatch(setOnlineUser(data));
    });
  }, [dispatch, user]);
  return (
    <div>
      <Activate />
      <Sidebar onlineUser={onlineUser} />

      <Outlet />
    </div>
  );
};

export default Home;
