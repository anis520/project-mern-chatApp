import React from "react";
import welcomeLogo from "../../../public/chat.gif";

const Welcome = () => {
  return (
    <div className="fixed bg-white dark:bg-darkBg top-0 right-0 w-10/12 lg:w-9/12 h-screen flex items-center justify-center  border-r-2 ">
      <img
        src={welcomeLogo}
        className=" w-8/12 lg:w-5/12 lg:h-3/6 object-cover mx-auto m-10 "
        alt="chat-app"
      />
    </div>
  );
};

export default Welcome;
