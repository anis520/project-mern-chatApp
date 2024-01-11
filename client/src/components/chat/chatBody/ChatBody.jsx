import { useEffect, useRef } from "react";
import SingleChat from "../../SingleChat";
import { useDispatch, useSelector } from "react-redux";
import { getChatByUser } from "../../../features/chat/chatApiSlice";
import AvaterUI from "../../AvaterUI/AvaterUI";

const ChatBody = ({ activeUser }) => {
  const div = useRef();
  const { chats, loader } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    div.current?.scrollIntoView({ behavior: "instant" });
  }, [chats]);

  return (
    <>
      <div className="w-full h-full bg-white dark:bg-darkBg  px-5 pt-16 pb-24 overflow-y-auto">
        {loader ? (
          <div className="flex flex-col justify-center h-full">
            <div className="bg-gray-200 p-6 w-4/12 animate-pulse rounded-md "></div>
            <div className="bg-gray-200 p-4 ms-auto w-5/12 animate-pulse rounded-md "></div>
            <div className="bg-gray-200 p-4  w-5/12 animate-pulse rounded-md "></div>
            <div className="bg-gray-200 p-4 ms-auto w-4/12 animate-pulse rounded-md "></div>
            <div className="bg-gray-200 p-4  w-3/12 animate-pulse rounded-md "></div>
          </div>
        ) : (
          <>
            {/* <========================activeUser info==========================> */}
            <div className="w-24 h-24 mx-auto mt-10">
              <AvaterUI name={activeUser?.name} photo={activeUser?.photo} />
            </div>
            <p className="text-center text-2xl font-semibold mt-2  ">
              {activeUser?.name}
            </p>
            <p className="text-center text-gray-400 text-sm font-semibold mt-2 mb-6">
              you can now chat with eatch others
            </p>
            <hr className="w-7/12 mx-auto mb-5" />

            {chats?.map((item, idex) => {
              return item.senderId == user?._id ? (
                <SingleChat side={"left"} key={idex} data={item} />
              ) : (
                <SingleChat side={"right"} key={idex} data={item} />
              );
            })}
            <div ref={div} />
          </>
        )}
      </div>{" "}
    </>
  );
};

export default ChatBody;
