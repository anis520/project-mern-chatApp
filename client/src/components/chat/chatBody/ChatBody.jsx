import { useEffect, useRef } from "react";
import SingleChat from "../../SingleChat";

const ChatBody = () => {
  const div = useRef(null);
  useEffect(() => {
    div.current.scrollTop = div.current.scrollHeight;
  }, []);

  return (
    <div
      ref={div}
      className="w-full h-full bg-white dark:bg-darkBg  px-5 pt-16 pb-24 overflow-y-auto"
    >
      <SingleChat side={"left"} />
      <SingleChat />
      <SingleChat side={"left"} />
      <SingleChat />
      <img
        src={"../../../../public/images.jpg"}
        className="w-5/12 mt-4 rounded-2xl dark:border border-gray-500 "
        alt=""
      />
      <SingleChat />
      <SingleChat />
    </div>
  );
};

export default ChatBody;
