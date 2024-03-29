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
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import AvaterUI from "../AvaterUI/AvaterUI";
import { getAllUsers } from "../../features/user/userApiSlice";
import cn from "../../utils/cn";

const Sidebar = ({ onlineUser }) => {
  const { users, loader } = useSelector((state) => state.user);
  const [filterUser, setFilterUser] = useState(null);
  const { id } = useParams();

  const { user } = useAuthUser();

  useEffect(() => {
    const data = users?.filter((item) => item.userInfo._id != user._id);

    setFilterUser(data);
  }, [users, user._id]);

  return (
    <div className="fixed top-0 left-0  w-2/12 lg:w-3/12 h-screen bg-slate-200 dark:bg-slate-800 flex  border-r-2 dark:border-slate-600 ">
      <div className=" hidden sm:block w-4/12  lg:w-2/12 h-full bg-slate-700 relative">
        <div className="bg-black h-12 flex items-center justify-center">
          <Link to={"/"}>
            <BsJustifyRight className="text-white text-3xl rounded-md cursor-pointer  " />
          </Link>
        </div>
        <div className="h-full  flex flex-col items-center py-8 gap-8 ">
          <Link to={"/app"}>
            <BsFillChatDotsFill className="text-slate-50 text-2xl rounded-md cursor-pointer     " />
          </Link>

          {/* <BsFillChatDotsFill
            onClick={getAllUserHandler}
            className="text-slate-500 text-2xl rounded-md cursor-pointer     "
          /> */}

          <Link to="/profile">
            <div className="w-8   h-8   text-lg">
              <AvaterUI photo={user.photo} name={user.name} />
            </div>
          </Link>
          <BsBookmarkHeartFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          <div className="mt-auto mb-16 text-slate-500 text-2xl rounded-md cursor-pointer ">
            <Theme />
          </div>
        </div>
      </div>
      <div className="w-full  ">
        {/* search div  */}
        <div className="     bg-slate-300 dark:bg-darkBg dark:border-b  dark:border-slate-600 p-2 w-full   flex justify-center relative">
          <input
            placeholder="Search here"
            type="search"
            className="w-full border rounded-md p-1  "
          />
        </div>
        {/* chat list div  */}
        <div className="h-full   space-y-3 p-2 overflow-y-auto  ">
          {loader ? (
            <div className="space-y-3">
              <div className="bg-gray-400 dark:bg-gray-500 p-2 w-full mx-auto animate-pulse rounded-md flex  items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-200 p-1"></div>
                <div className="space-y-2 w-7/12 ">
                  <div className=" w-4/12 p-2 rounded-full bg-gray-200"></div>
                  <div className=" w-10/12 p-2 rounded-full bg-gray-200"></div>
                </div>
              </div>
              <div className="bg-gray-400 dark:bg-gray-500 p-2 w-full mx-auto animate-pulse rounded-md flex  items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-200 p-1"></div>
                <div className="space-y-2 w-7/12 ">
                  <div className=" w-4/12 p-2 rounded-full bg-gray-200"></div>
                  <div className=" w-10/12 p-2 rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          ) : (
            filterUser?.map((item, index) => {
              return (
                <Link
                  key={index}
                  className="block"
                  to={`/messages/t/${item.userInfo._id}`}
                >
                  <div
                    className={cn(
                      ` relative hover:bg-slate-100   cursor-pointer w-fit lg:w-full  bg-white dark:bg-darkBg mx-auto  p-2 rounded-md shadow-sm flex items-center sm:gap-2`,
                      {
                        " border-b-2 border-gray-500 dark:border-gray-300":
                          id == item.userInfo._id,
                      }
                    )}
                  >
                    {onlineUser?.some((d) => d._id == item.userInfo._id) && (
                      <p className="h-[8px] w-[8px] rounded-full bg-green-500 absolute bottom-1 left-1"></p>
                    )}
                    {/* <img
                  src={userAvatar}
                  className="  w-8 lg:w-14 rounded-full  "
                  alt=""
                /> */}
                    <div className="w-8 lg:w-14 h-8 lg:h-14 text-2xl">
                      <AvaterUI
                        photo={item.userInfo.photo}
                        name={item.userInfo.name}
                      />
                    </div>
                    <div className="font-semibold text-lg">
                      <div className="hidden lg:block">
                        <p className="text-slate-600 dark:text-white">
                          {item.userInfo.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {item?.lastMsg?.senderId == user._id && "you : "}
                          {item?.lastMsg?.message.slice(0, 8)} . .
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
