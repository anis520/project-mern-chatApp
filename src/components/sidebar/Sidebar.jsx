import React from "react";
import {
  BsArrowClockwise,
  BsBookmarkHeartFill,
  BsFillChatDotsFill,
  BsFillHouseFill,
  BsFillPersonFill,
  BsGearFill,
  BsJustifyRight,
  BsPencilSquare,
  BsPersonCircle,
  BsSearch,
} from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-3/12 h-screen bg-slate-200 flex  border-r-2">
      <div className="w-2/12 h-full bg-slate-700">
        <div className="bg-black h-12 flex items-center justify-center">
          <BsJustifyRight className="text-white text-3xl rounded-md cursor-pointer  " />
        </div>
        <div className="h-full  flex flex-col items-center py-8 gap-8 ">
          <BsFillHouseFill className="text-slate-50 text-2xl rounded-md cursor-pointer     " />
          <BsFillChatDotsFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsPersonCircle className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsBookmarkHeartFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsGearFill className="mt-auto mb-16 text-slate-500 text-2xl rounded-md cursor-pointer     " />
        </div>
      </div>
      <div className="w-full ">
        {/* search div  */}
        <div className=" bg-slate-300  p-2 w-full  flex relative">
          <BsSearch className=" text-slate-400 absolute top-4 left-4 " />

          <input type="search" className="w-full border rounded-md p-1" />
          <button className="text-2xl w-12 flex items-center justify-center">
            <BsPencilSquare />
          </button>
        </div>
        {/* chat list div  */}
        <div className="h-full   space-y-3 p-2 overflow-y-auto ">
          <div className="w-full bg-white p-8 rounded-md shadow-sm"></div>

          <div className="w-full bg-white p-8 rounded-md shadow-sm"></div>
          <div className="w-full bg-white p-8 rounded-md shadow-sm"></div>
          <div className="w-full bg-white p-8 rounded-md shadow-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
