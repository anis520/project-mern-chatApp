import React, { useRef, useState } from "react";
import { RiPushpinFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
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
import moment from "moment";
import { getUpdateChat } from "../features/chat/chatApiSlice";

const SingleChat = ({ side, data }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const { theme } = useSelector((state) => state.theme);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenu(true);
  };

  useOnclickOutside(menuRef, () => setMenu(false));

  const handleUpdateChat = (d) => {
    setMenu(false);
    const ob = { id: d._id, bookmark: d.bookmark == true ? false : true };
    dispatch(getUpdateChat(ob));
  };

  return (
    <div>
      <div>
        <div
          className={cn(
            "mx-4 mt-5 w-fit max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[600px]  group    px-4",
            {
              "ms-0": side == "right",
            },
            {
              "ms-auto": side == "left",
            }
          )}
        >
          {data.trash ? (
            <p className="p-2 rounded-md border dark:text-white ">
              unsent a message
            </p>
          ) : (
            <div
              className={cn(
                `   text-white dark:text-zinc-700 font-semibold sm:font-normal text-sm sm:text-base    w-fit py-1 px-2 rounded-lg relative  cursor-pointer`,
                { "text-black font-semibold": theme == "gray-200" }
              )}
              onContextMenu={handleContextMenu}
            >
              {data.message && (
                <p
                  className={cn(
                    ` bg-${theme}  w-fit  text-white dark:text-zinc-800 font-semibold sm:font-normal text-sm sm:text-base      text-center  py-1 px-2 rounded-lg     `,
                    { "  ": theme == "gray-200" },
                    {
                      "ms-0": side == "right",
                    },
                    {
                      "ms-auto": side == "left",
                    }
                  )}
                >
                  {data.message}
                </p>
              )}
              {data.photo && (
                <img
                  src={data.photo}
                  className="w-[240px] h-[240px] border rounded-md object-cover"
                />
              )}
              {/* <===========book mark pin ====================> */}
              <RiPushpinFill
                className={cn(
                  `duration-100 absolute ease-linear opacity-100 top-[-5px] right-[-5px] text-red-500`,
                  {
                    "right-[-20px] top-[-15px] opacity-0": !data.bookmark,
                  }
                )}
              />
              <BsThreeDotsVertical
                onClick={() => setMenu(true)}
                className={cn(
                  `duration-100 absolute ease-linear opacity-100 top-2 text-black dark:text-white  md:hidden  group-hover:block `,
                  { "left-[-25px]": side == "left" },
                  { "right-[-25px]": side == "right" }
                )}
              />{" "}
              {data.reaction && (
                <div
                  onClick={() => setMenu(true)}
                  className="bg-slate-100 dark:bg-slate-200 shadow-md absolute bottom-[-20px] right-0 py-1 px-2 rounded-md"
                >
                  {data.reaction == "smile" && (
                    <FaSmile className=" text-orange-300 h-4 w-4     " />
                  )}
                  {data.reaction == "like" && (
                    <FaThumbsUp className=" text-blue-300 h-4 w-4     " />
                  )}
                  {data.reaction == "love" && (
                    <FaRegHeart className=" text-red-400 h-4 w-4     " />
                  )}
                  {data.reaction == "sad" && (
                    <ImSad className=" text-yellow-400 h-4 w-4     " />
                  )}
                </div>
              )}
              {menu && (
                <div
                  ref={menuRef}
                  className={cn(
                    "absolute flex z-30 flex-col  font-semibold text-xs  rounded-md  top-0 bg-white border text-gray-500",
                    { "w-fit right-[-150px]  ": side == "right" },
                    { "left-0  lg:left-[-122px] ": side == "left" },
                    { "left-0  top-1/2": data.photo }
                  )}
                >
                  <div className="p-1 mb-1 bg-slate-100  rounded-md flex gap-2 justify-center text-lg items-center">
                    <FaSmile
                      className={cn(
                        "text-orange-300 h-6 w-6   rounded-full hover:scale-125 duration-300",
                        {
                          "ring-1 ring-orange-300 p-1":
                            data.reaction == "smile",
                        }
                      )}
                    />
                    <FaRegHeart
                      className={cn(
                        "text-red-400  h-6 w-6 animate-bounce rounded-full  hover:scale-125 duration-300",
                        { "ring-1 ring-red-400 p-1": data.reaction == "love" }
                      )}
                    />
                    <FaThumbsUp
                      className={cn(
                        "text-blue-400    animate-pulse rounded-full  hover:scale-125 duration-300",
                        { "ring-1 ring-blue-400 p-1": data.reaction == "like" }
                      )}
                    />
                    <ImSad className="text-yellow-400   hover:scale-125 duration-300" />
                  </div>
                  <button className="duration-300 border-b w-full  px-2 flex items-center gap-2     py-1  rounded-sm hover:bg-gray-200 hover:text-black">
                    <FaCopy /> Copy
                  </button>
                  {side == "left" && (
                    <div>
                      <button className="duration-300  border-b w-full  px-2 flex items-center gap-2     py-1  rounded-sm hover:bg-gray-200 hover:text-black">
                        <FaRegTrashAlt />
                        Trash
                      </button>
                    </div>
                  )}{" "}
                  <button
                    onClick={() => handleUpdateChat(data)}
                    className="duration-300 w-full    px-2 flex items-center gap-2     py-1  rounded-sm hover:bg-gray-200 hover:text-black"
                  >
                    <BsBookmarkHeartFill />{" "}
                    {data.bookmark ? " Remove" : "Bookmark"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>{" "}
      </div>
      <div className="  text-sm text-center font-semibold text-slate-500 dark:text-slate-300 px-2 ">
        {moment(data.createdAt).startOf("").fromNow()}
      </div>{" "}
    </div>
  );
};

export default SingleChat;
