import React, { useRef, useState } from "react";
import { RiPushpinFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useOnclickOutside } from "../hooks/useOnclickOutside";
import cn from "../utils/cn";
import {
  FaCopy,
  FaRegHeart,
  FaRegTrashAlt,
  FaSmile,
  FaThumbsUp,
} from "react-icons/fa";
import { BsBookmarkHeartFill, BsThreeDotsVertical } from "react-icons/bs";
import { CiFaceSmile, CiHeart } from "react-icons/ci";
import { ImSad } from "react-icons/im";

const SingleChat = ({ side }) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const { theme } = useSelector((state) => state.theme);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenu(true);
  };

  useOnclickOutside(menuRef, () => setMenu(false));

  return (
    <div>
      <div
        className={cn(
          "mx-4 mt-5 w-fit max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[600px]  group    px-4",
          {
            "ms-0": side == "left",
          },
          {
            "ms-auto": !side,
          }
        )}
      >
        <div
          className={cn(
            ` bg-${theme} text-white dark:text-zinc-700 font-semibold sm:font-normal text-sm sm:text-base    w-fit py-1 px-2 rounded-lg relative  cursor-pointer`,
            { "text-black font-semibold": theme == "gray-200" }
          )}
          onContextMenu={handleContextMenu}
        >
          hello anis vai Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dicta, beatae! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Sint, architecto.
          <RiPushpinFill
            className={cn(
              `duration-100 absolute ease-linear opacity-100 top-[-8px] right-[-11px] text-red-500`,
              {
                "right-[-20px] top-[-15px] opacity-0": menu,
              }
            )}
          />
          <BsThreeDotsVertical
            onClick={() => setMenu(true)}
            className={cn(
              `duration-100 absolute ease-linear opacity-100 top-2 text-black dark:text-white  md:hidden  group-hover:block `,
              { "right-[-25px]": side },
              { "left-[-25px]": !side }
            )}
          />
          <div
            onClick={() => setMenu(true)}
            className="bg-slate-100 dark:bg-slate-200 shadow-md absolute bottom-[-22px] right-0 py-1 px-2 rounded-md"
          >
            <FaSmile className=" text-orange-300 h-5 w-5     " />
          </div>
          {menu && (
            <div
              ref={menuRef}
              className={cn(
                "absolute flex z-30 flex-col  font-semibold text-xs  rounded-md  top-full lg:top-0  p-1 bg-white border text-gray-500",
                { " right-0 lg:right-[-122px] ": side == "left" },
                { "left-0  lg:left-[-122px] ": !side }
              )}
            >
              <div className="p-1 mb-1 bg-slate-100  rounded-md flex gap-2 justify-center text-lg items-center">
                <FaSmile className="text-orange-300 h-6 w-6  ring-1 ring-orange-300 p-1 rounded-full hover:scale-125 duration-300" />
                <FaRegHeart className="text-red-400  animate-bounce hover:scale-125 duration-300" />
                <FaThumbsUp className="text-blue-400  animate-pulse hover:scale-125 duration-300" />
                <ImSad className="text-yellow-400   hover:scale-125 duration-300" />
              </div>
              <button className="duration-300 border-b w-full  px-2 flex items-center gap-2     py-1  rounded-sm hover:bg-gray-200 hover:text-black">
                <FaCopy /> Copy
              </button>
              <button className="duration-300  border-b w-full  px-2 flex items-center gap-2     py-1  rounded-sm hover:bg-gray-200 hover:text-black">
                <FaRegTrashAlt />
                Trash
              </button>
              <button
                onClick={() => setMenu(false)}
                className="duration-300 w-full    px-2 flex items-center gap-2     py-1  rounded-sm hover:bg-gray-200 hover:text-black"
              >
                <BsBookmarkHeartFill /> BookMark
              </button>
            </div>
          )}
        </div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300 px-2">
          12.00pm
        </p>{" "}
      </div>
    </div>
  );
};

export default SingleChat;
