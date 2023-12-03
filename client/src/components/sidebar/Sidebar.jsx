import {
  BsBookmarkHeartFill,
  BsFillChatDotsFill,
  BsFillHouseFill,
  BsJustifyRight,
  BsPencilSquare,
  BsPersonCircle,
  BsSearch,
} from "react-icons/bs";

import userAvatar from "../../../public/user-avatar.png";
import Theme from "../../features/theme/theme";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Sidebar = () => {
  const icon = useRef(null);
  const handleChange = (e) => {
    if (e.target.value > 0) {
      icon.current.style.display = "none";
    }
  };
  return (
    <div className="fixed top-0 left-0  w-2/12 lg:w-3/12 h-screen bg-slate-200 dark:bg-slate-800 flex  border-r-2 ">
      <div className=" w-10/12  lg:w-2/12 h-full bg-slate-700 relative">
        <div className="bg-black h-12 flex items-center justify-center">
          <BsJustifyRight className="text-white text-3xl rounded-md cursor-pointer  " />
        </div>
        <div className="h-full  flex flex-col items-center py-8 gap-8 ">
          <Link to={"/"}>
            <BsFillHouseFill className="text-slate-50 text-2xl rounded-md cursor-pointer     " />
          </Link>
          <Link to={"/id=57"}>
            <BsFillChatDotsFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          </Link>
          <BsPersonCircle className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <BsBookmarkHeartFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <div className="mt-auto mb-16 text-slate-500 text-2xl rounded-md cursor-pointer ">
            <Theme />
          </div>
        </div>
      </div>
      <div className="w-full  ">
        {/* search div  */}
        <div className=" bg-slate-300 dark:bg-darkBg dark:border-b  p-2 w-full  flex justify-center relative">
          <BsSearch
            ref={icon}
            className=" text-slate-400 absolute top-4 right-14   "
          />

          <input
            placeholder="Search here"
            type="search"
            className="w-full border rounded-md p-1 hidden lg:block"
          />
          <button className="text-2xl dark:text-white w-12 flex items-center justify-center">
            <BsPencilSquare />
          </button>
        </div>
        {/* chat list div  */}
        <div className="h-full   space-y-3  sm:p-2 overflow-y-auto ">
          <div className="w-fit lg:w-full  bg-white dark:bg-darkBg   p-1 lg:p-2 rounded-md shadow-sm flex items-center gap-2">
            <img
              src={userAvatar}
              className="  w-8 lg:w-14 rounded-full"
              alt=""
            />
            <div className="font-semibold text-lg">
              <div className="hidden lg:block">
                <p className="text-slate-600 dark:text-white">Raza miya</p>
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
