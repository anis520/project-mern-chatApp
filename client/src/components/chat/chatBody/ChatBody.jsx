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
      className="w-full h-full bg-white dark:bg-darkBg  px-5 pt-16 pb-20 overflow-y-auto"
    >
      <SingleChat side={"left"} />
      <SingleChat />
      <SingleChat side={"left"} />
      <SingleChat />
      <SingleChat />
      <SingleChat />
    </div>
  );
};

export default ChatBody;
