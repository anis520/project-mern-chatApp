import { useEffect, useRef } from "react";
import SingleChat from "../../SingleChat";
import { useDispatch, useSelector } from "react-redux";
import { getChatByUser } from "../../../features/chat/chatApiSlice";
import AvaterUI from "../../AvaterUI/AvaterUI";

const ChatBody = ({ activeUser }) => {
  const div = useRef();
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    div.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="w-full h-full bg-white dark:bg-darkBg  px-5 pt-16 pb-24 overflow-y-auto">
      {/* <========================activeUser info==========================> */}
      <div className="w-24 h-24 mx-auto mt-10">
        <AvaterUI name={activeUser?.name} photo={activeUser?.photo} />
      </div>
      <p className="text-center text-2xl font-semibold mt-2 mb-10">
        {activeUser?.name}
      </p>
      <hr className="w-7/12 mx-auto mb-5" />

      {chats?.map((item, idex) => {
        return item.senderId == user?._id ? (
          <SingleChat side={"left"} key={idex} data={item.message} />
        ) : (
          <SingleChat side={"right"} key={idex} data={item.message} />
        );
      })}
      <div ref={div} />
    </div>
  );
};

export default ChatBody;
