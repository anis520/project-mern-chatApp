import React, { useEffect, useRef, useState } from "react";
import { BsCameraVideoFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlinePhotoCameraBack } from "react-icons/md";

import EmojiPicker from "emoji-picker-react";
import cn from "../../utils/cn";

import { useDispatch, useSelector } from "react-redux";
import { useOnclickOutside } from "../../hooks/useOnclickOutside";
import { useOnclickOutside as emojiDiv } from "../../hooks/useOnclickOutside";
import ChatBody from "./chatBody/ChatBody";
import { useParams } from "react-router-dom";
import AvaterUI from "../AvaterUI/AvaterUI";
import { createChat, getChatByUser } from "../../features/chat/chatApiSlice";
import { setMessageEmpty } from "../../features/chat/chatSlice";
import { io } from "socket.io-client";
import messageSound from "../../assets/s8_sms.mp3";

import { Howl } from "howler";
const ChatArea = () => {
  const [typingAnimation, setTypingAnimation] = useState(null);
  const params = useParams();
  const socket = useRef();
  const [activeUser, setActiveUser] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);
  const { theme } = useSelector((state) => state.theme);
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { onlineUser, chatSuccess } = useSelector((state) => state.chat);

  const [info, setInfo] = useState(false);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenu(true);
  };

  useOnclickOutside(menuRef, () => setMenu(false));
  emojiDiv(emojiRef, () => setEmoji(false));

  useEffect(() => {
    const findData = users?.find((item) => item.userInfo._id == params.id);

    setActiveUser(findData);
    dispatch(getChatByUser(params.id));
  }, [params, activeUser, users, dispatch]);
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();
      data.append("message", message);
      data.append("receiverId", activeUser.userInfo._id);

      data.append("chat-photo", file);
      dispatch(createChat(data));
    } else {
      message &&
        dispatch(createChat({ message, receiverId: activeUser.userInfo._id }));
    }
    setMessage("");
    setFile(null);
    setEmoji(false);

    const sound = new Howl({
      src: [messageSound], // Provide the path to your sound file
      volume: 2, // Adjust the volume as needed
    });

    // Play the sound
    sound.play();
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    if (chatSuccess) {
      socket.current.emit("realTimeMsgSend", chatSuccess);
      socket.current.emit("typingAnimationSend", {
        msg: "",
        reciverId: activeUser.userInfo._id,
        senderId: user._id,
      });
    }

    dispatch(setMessageEmpty());

    // socket.current.emit("typingAnimationSend", null);
  }, [chatSuccess]);

  const handleChatValueChange = (e) => {
    setMessage(e.target.value);
    // if (message !== "") {
    socket.current.emit("typingAnimationSend", {
      msg: e.target.value,
      reciverId: activeUser.userInfo._id,
      senderId: user._id,
    });
    // }
  };

  return (
    <div className="fixed  top-0 right-0 w-10/12 lg:w-9/12 h-screen flex   ">
      <div
        className={cn(
          "h-full duration-300 md:ease-in bg-slate-50  w-full md:w-9/12 relative",
          {
            "  md:w-full": !info,
            " w-2/12 ": info,
          }
        )}
      >
        {/* chat body  header  */}
        <div className="h-16   w-full bg-white dark:bg-darkBg dark:border-b dark:border-slate-600  shadow-sm absolute top-0 left-0 px-4 flex items-center z-30">
          <div className="cursor-pointer" onClick={() => setInfo(!info)}>
            <p className="text-zinc-900 dark:text-white sm:text-xl font-semibold">
              {activeUser?.userInfo.name}
            </p>
            <div className="text-xs  sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 flex items-center">
              {" "}
              {onlineUser?.some((d) => d._id == activeUser?.userInfo._id) ? (
                <>
                  <span className="bg-green-400 w-2 h-2 rounded-full me-3"></span>
                  Online
                </>
              ) : (
                <p>12 minites ago</p>
              )}
            </div>
          </div>
          <div className="ms-auto flex items-center gap-4 dark:text-white">
            <BsFillTelephoneFill className="sm:text-xl" />
            <BsCameraVideoFill className="sm:text-xl" />
          </div>
        </div>

        {/* chat body  */}
        <ChatBody activeUser={activeUser} typingAnimation={typingAnimation} />
        {/* chat body  footer  */}
        <div className="h-auto p-4 w-full bg-white dark:bg-darkBg  border-t dark:border-slate-600 absolute bottom-0 left-0 flex items-end gap-2 z-30">
          <button className="text-[25px] dark:text-white mt-1">
            <label htmlFor="photo">
              <input
                type="file"
                name=""
                id="photo"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <MdOutlinePhotoCameraBack />
            </label>
          </button>
          <form
            onSubmit={handleSendMessage}
            action=""
            className="flex w-full gap-2"
          >
            <div className="bg-slate-100 border w-full py-1 px-2 rounded-md space-y-2">
              {file && (
                <div className="h-16 w-16 rounded-md border  relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                  <button
                    className="absolute top-0 right-1"
                    onClick={() => setFile(null)}
                  >
                    x
                  </button>
                </div>
              )}
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="type your message"
                value={message}
                onChange={handleChatValueChange}
              />{" "}
            </div>
            <button
              type="submit"
              className={`bg-${theme} h-fit text-white py-1 px-3 mt-auto font-semibold rounded-md  text-center`}
            >
              Send
            </button>
          </form>{" "}
          <div ref={emojiRef} className="fixed bottom-[70px] right-[40px]">
            {" "}
            {emoji && (
              <EmojiPicker
                previewConfig={{ showPreview: false }}
                skinTonesDisabled={true}
                onEmojiClick={(e) =>
                  setMessage((prevstate) => prevstate + " " + e.emoji)
                }
              />
            )}
            <button
              className="fixed bottom-[15px] right-[87px] text-[22px]"
              onClick={() => setEmoji(!emoji)}
            >
              😊
            </button>{" "}
          </div>
        </div>
      </div>

      {/* information bar  */}

      <div
        onClick={() => setInfo(false)}
        className={cn(
          `fixed top-0 left-0 h-full w-4/12 md:hidden bg-white   bg-opacity-50 backdrop-blur-sm dark:bg-opacity-70`,
          {
            hidden: !info,
          }
        )}
      ></div>
      <div
        className={cn(
          "h-full duration-75 sm:duration-300 ease-in bg-slate-200 dark:bg-slate-800  dark:border-l dark:border-slate-600  w-0  z-30  ",
          {
            "w-10/12   md:w-3/12": info,
          }
        )}
      >
        <div className="bg-white dark:bg-darkBg dark:text-white p-3 font-semibold border dark:border-slate-600">
          <p>Information</p>
        </div>

        <div className="w-24 h-24  mx-auto my-4                                                                                                                         ">
          <AvaterUI
            name={activeUser?.userInfo.name}
            photo={activeUser?.userInfo.photo}
          />
        </div>

        <div className="bg-white dark:bg-slate-400   m-4 p-4 text-center font-semibold text-xl rounded-md">
          <p className="dark:text-white">{activeUser?.userInfo.name}</p>
          <p className="py-2 text-base text-slate-500 dark:text-slate-200">
            {activeUser?.userInfo.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
