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
import { useEffect, useRef, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import AvaterUI from "../AvaterUI/AvaterUI";

const Sidebar = ({ onlineUser }) => {
  const { users } = useSelector((state) => state.user);
  const [filterUser, setFilterUser] = useState(null);

  const icon = useRef(null);
  const { user } = useAuthUser();
  const handleChange = (e) => {
    if (e.target.value > 0) {
      icon.current.style.display = "none";
    }
  };

  useEffect(() => {
    const data = users?.filter((item) => item._id != user._id);

    setFilterUser(data);
  }, [users, user._id]);

  return (
    <div className="fixed top-0 left-0  w-2/12 lg:w-3/12 h-screen bg-slate-200 dark:bg-slate-800 flex  border-r-2 dark:border-slate-600 ">
      <div className=" hidden sm:block w-4/12  lg:w-2/12 h-full bg-slate-700 relative">
        <div className="bg-black h-12 flex items-center justify-center">
          <BsJustifyRight className="text-white text-3xl rounded-md cursor-pointer  " />
        </div>
        <div className="h-full  flex flex-col items-center py-8 gap-8 ">
          <Link to={"/"}>
            <BsFillHouseFill className="text-slate-50 text-2xl rounded-md cursor-pointer     " />
          </Link>
          <Link to={"/"}>
            <BsFillChatDotsFill className="text-slate-500 text-2xl rounded-md cursor-pointer     " />
          </Link>
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
          {filterUser?.map((item, index) => {
            return (
              <Link
                key={index}
                className="block"
                to={`/messages/t/${item._id}`}
              >
                <div
                  className={` relative hover:bg-slate-50  cursor-pointer w-fit lg:w-full  bg-white dark:bg-darkBg mx-auto  p-2 rounded-md shadow-sm flex items-center sm:gap-2`}
                >
                  {onlineUser?.some((d) => d._id == item._id) && (
                    <p className="h-[8px] w-[8px] rounded-full bg-green-500 absolute bottom-1 left-1"></p>
                  )}
                  {/* <img
                  src={userAvatar}
                  className="  w-8 lg:w-14 rounded-full  "
                  alt=""
                /> */}
                  <div className="w-8 lg:w-14 h-8 lg:h-14 text-2xl">
                    <AvaterUI photo={item.photo} name={item.name} />
                  </div>
                  <div className="font-semibold text-lg">
                    <div className="hidden lg:block">
                      <p className="text-slate-600 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-slate-400 text-sm">
                        last seen 1 minites ago
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
