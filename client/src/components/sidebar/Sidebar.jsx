import React, { useState } from "react";
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
import userAvatar from "../../../public/user-avatar.png";

const Sidebar = () => {
  const [setting, setSettiog] = useState(false);

  return (
    <div className="fixed top-0 left-0  w-2/12 lg:w-3/12 h-screen bg-slate-200 flex  border-r-2">
      <div className=" w-5/12  lg:w-2/12 h-full bg-slate-700 relative">
        <div className="bg-black h-12 flex items-center justify-center">
          <BsJustifyRight className="text-white text-3xl rounded-md cursor-pointer  " />
        </div>
        <div className="h-full  flex flex-col items-center py-8 gap-8 ">
          <BsFillHouseFill className="text-slate-50 text-2xl rounded-md cursor-pointer     " />
          <BsFillChatDotsFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsPersonCircle className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsBookmarkHeartFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsGearFill
            onClick={() => setSettiog(!setting)}
            className="mt-auto mb-16 text-slate-500 text-2xl rounded-md cursor-pointer     "
          />
        </div>

        {/* setting div  */}
        {setting && (
          <div className="p-2 bg-white border border-slate-400 absolute bottom-10 left-12 rounded-md">
            <p className="font-semibold px-5">Themes</p>
            <hr />
          </div>
        )}
      </div>
      <div className="w-full ">
        {/* search div  */}
        <div className=" bg-slate-300  p-2 w-full  flex justify-center relative">
          <BsSearch className=" text-slate-400 absolute top-4 left-4 " />

          <input
            type="search"
            className="w-full border rounded-md p-1 hidden lg:block"
          />
          <button className="text-2xl w-12 flex items-center justify-center">
            <BsPencilSquare />
          </button>
        </div>
        {/* chat list div  */}
        <div className="h-full   space-y-3 p-2 overflow-y-auto ">
          <div className="w-fit lg:w-full  bg-white p-1 lg:p-2 rounded-md shadow-sm flex items-center gap-2">
            <img
              src={userAvatar}
              className="  w-8 lg:w-14 rounded-full"
              alt=""
            />
            <div className="font-semibold text-lg">
              <div className="hidden lg:block">
                <p className="text-slate-600">Raza miya</p>
                <p className="text-slate-400 text-sm">
                  last seen 1 minites ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
