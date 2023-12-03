import React, { useRef, useState } from "react";
import {
  BsCameraVideoFill,
  BsDot,
  BsFillTelephoneFill,
  BsReception0,
} from "react-icons/bs";

import userAvatar from "../../../public/user.avif";
import cn from "../../utils/cn";
import { RiPushpinFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import { useOnclickOutside } from "../../hooks/useOnclickOutside";
import SingleChat from "../SingleChat";

const ChatArea = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const { theme } = useSelector((state) => state.theme);
  const [info, setInfo] = useState(false);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenu(true);
  };

  useOnclickOutside(menuRef, () => setMenu(false));

  return (
    <div className="fixed  top-0 right-0 w-10/12 lg:w-9/12 h-screen flex  border-r-2 ">
      <div
        // style={{
        //   backgroundImage: `url(${"https://images.unsplash.com/photo-1629197238245-3c7497e96b41?q=80&w=1442&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
        // }}
        className={cn(
          "h-full duration-300 md:ease-in bg-slate-50  w-full md:w-9/12 relative",
          {
            "  md:w-full": !info,
            " w-2/12 ": info,
          }
        )}
      >
        {/* chat body  header  */}
        <div className="h-16   w-full bg-white dark:bg-darkBg dark:border-b  shadow-sm absolute top-0 left-0 px-4 flex items-center">
          <div className="cursor-pointer" onClick={() => setInfo(!info)}>
            <p className="text-zinc-900 dark:text-white text-xl font-semibold">
              Raza miya
            </p>
            <div className="text-sm font-semibold text-zinc-500 flex items-center">
              {" "}
              <BsDot className="text-2xl text-green-400" />
              Online
            </div>
          </div>
          <div className="ms-auto flex items-center gap-4 dark:text-white">
            <BsFillTelephoneFill className="text-xl" />
            <BsCameraVideoFill className="text-xl" />
          </div>
        </div>

        {/* chat body  */}
        <div className="w-full h-full bg-white dark:bg-darkBg  px-5 py-16 overflow-y-auto">
          <SingleChat side={"left"} />
          <SingleChat />
          <SingleChat />
        </div>

        {/* chat body  footer  */}
        <div className="h-16 p-4 w-full bg-white dark:bg-darkBg  border-t absolute bottom-0 left-0 flex items-center gap-2">
          <input
            type="text"
            className="bg-slate-100 border w-full py-1 px-2 rounded-md"
            placeholder="type your message"
          />
          <button
            className={`bg-${theme} text-white py-1 px-3 font-semibold rounded-md  text-center`}
          >
            Send
          </button>
        </div>
      </div>

      {/* information bar  */}

      <div
        onClick={() => setInfo(false)}
        className={cn(
          `fixed top-0 left-0 h-full w-4/12 md:hidden bg-white  bg-opacity-50 backdrop-blur-sm`,
          {
            hidden: !info,
          }
        )}
      ></div>
      <div
        className={cn(
          "h-full duration-300 ease-in bg-slate-200 dark:bg-slate-800  dark:border-l  w-0  z-30  ",
          {
            "w-10/12   md:w-3/12": info,
          }
        )}
      >
        <div className="bg-white dark:bg-darkBg dark:text-white p-3 font-semibold border">
          <p>Information</p>
        </div>
        <img
          src={userAvatar}
          alt="user-photo"
          className="w-24 h-24  mx-auto my-4                                                                                                                         "
        />
        <div className="bg-white  m-4 p-4 text-center font-semibold text-xl rounded-md">
          <p>Raza miya</p>
          <p className="py-2 text-base text-slate-500">0185256455</p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
