import React from "react";
import welcomeLogo from "../../../public/chathome.png";

const Welcome = () => {
  return (
    <div className="fixed top-0 right-0 w-10/12 lg:w-9/12 h-screen flex  border-r-2 ">
      <img
        src={welcomeLogo}
        className="lg:w-10/12 h-auto object-cover mx-auto p-10 "
        alt="chat-app"
      />
    </div>
  );
};

export default Welcome;
