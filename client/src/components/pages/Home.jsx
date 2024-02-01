import React, { useEffect, useRef, useState } from "react";
import ChatArea from "../chat/ChatArea";
import Sidebar from "../sidebar/Sidebar";
import welcomeLogo from "../../../public/chathome.png";
import { Outlet } from "react-router-dom";
import Activate from "../Activate/Activate";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUser, setRealTimeMsg } from "../../features/chat/chatSlice";
import messageSound from "../../assets/messenger_noti.mp3";
import { Howl } from "howler";
import { getAllUsers } from "../../features/user/userApiSlice";
import {
  setRealTimeLastMsg,
  setTypingData,
} from "../../features/user/userSlice";

const Home = () => {
  const [playSound, setPlaySound] = useState(false);

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

    socket.current.on("realTimeMsgGet", (data) => {
      dispatch(setRealTimeMsg(data));

      setPlaySound(true);
    });

    socket.current.on("typingAnimationGet", (data) => {
      dispatch(setTypingData(data));
    });
  }, []);
  useEffect(() => {
    // Check the condition to play the sound
    if (playSound) {
      // Define the sound settings
      const sound = new Howl({
        src: [messageSound], // Provide the path to your sound file
        volume: 2, // Adjust the volume as needed
      });

      // Play the sound
      sound.play();

      // Set playSound back to false after the sound is played
      setPlaySound(false);
    }
  }, [playSound]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <Activate />
      <Sidebar onlineUser={onlineUser} />

      <Outlet />
    </div>
  );
};

export default Home;
