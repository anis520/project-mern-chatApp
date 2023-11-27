import React from "react";
import {
  BsCameraVideoFill,
  BsDot,
  BsFillTelephoneFill,
  BsReception0,
} from "react-icons/bs";

import userAvatar from "../../../public/user.avif";

const ChatArea = () => {
  const handleContextMenu = (event) => {
    // Prevent right-click
    alert("nice");
    event.preventDefault();
  };
  return (
    <div className="fixed top-0 right-0 w-9/12 h-screen flex  border-r-2 ">
      <div
        // style={{
        //   backgroundImage: `url(${"https://images.unsplash.com/photo-1629197238245-3c7497e96b41?q=80&w=1442&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
        // }}
        className="h-full bg-slate-50    w-9/12 relative"
      >
        {/* chat body  header  */}
        <div className="h-16   w-full bg-white shadow-sm absolute top-0 left-0 px-4 flex items-center">
          <div>
            <p className="text-zinc-900 text-xl font-semibold">Raza miya</p>
            <div className="text-sm font-semibold text-zinc-500 flex items-center">
              {" "}
              <BsDot className="text-2xl text-green-400" />
              Online
            </div>
          </div>
          <div className="ms-auto flex items-center gap-4">
            <BsFillTelephoneFill className="text-xl" />
            <BsCameraVideoFill className="text-xl" />
          </div>
        </div>

        {/* chat body  */}
        <div className="w-full h-full   py-16 overflow-y-auto">
          {/* single text  */}
          <div className="mx-4 mt-5 ">
            <div className=" bg-teal-400 text-white  w-fit p-2 rounded-lg  ">
              hello anis vai
            </div>
            <p className="text-sm font-semibold text-slate-500 px-2">12.00pm</p>{" "}
          </div>

          {/* single text  */}
          <div className="mx-4 mt-5  flex flex-col items-start  ">
            <div className=" bg-teal-400 text-white  w-fit p-2 rounded-lg  ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
              dignissimos.
            </div>
            <p className="text-sm font-semibold text-slate-500 px-2">12.05pm</p>{" "}
          </div>
          {/* single text  */}
          <div className="mx-4 mt-5  flex flex-col items-end ">
            <div
              onContextMenu={handleContextMenu}
              className=" bg-teal-400 text-white  max-w-[550px] p-2 rounded-lg  "
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
              di simos.
            </div>
            <p className="text-sm font-semibold text-slate-500 px-2">12.05pm</p>{" "}
          </div>
          {/* single text  */}
          <div className="mx-4 mt-5 ">
            <div className=" bg-teal-400 text-white  w-fit p-2 rounded-lg  ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
              dignissimos.
            </div>
            <p className="text-sm font-semibold text-slate-500 px-2">12.05pm</p>{" "}
          </div>
          {/* single text  */}
          <div className="mx-4 mt-5  flex flex-col items-end ">
            <div
              onContextMenu={handleContextMenu}
              className=" bg-teal-400 text-white  max-w-[550px] p-2 rounded-lg  "
            >
              Lorem ipsum elit. Aliquid, di simos.
            </div>
            <p className="text-sm font-semibold text-slate-500 px-2">12.05pm</p>{" "}
          </div>
          {/* single text  */}
          <div className="mx-4 mt-5  flex flex-col items-end ">
            <div
              onContextMenu={handleContextMenu}
              className=" bg-teal-400 text-white  max-w-[550px] p-2 rounded-lg  "
            >
              Lorem ipsum dolor sit, Aliquid, di simos.
            </div>
            <p className="text-sm font-semibold text-slate-500 px-2">12.05pm</p>{" "}
          </div>
        </div>

        {/* chat body  footer  */}
        <div className="h-16 p-4 w-full bg-white border-t absolute bottom-0 left-0 flex items-center gap-2">
          <input
            type="text"
            className="bg-slate-100 border w-full py-1 px-2 rounded-md"
            placeholder="type your message"
          />
          <button className="bg-teal-400 text-white py-1 px-3 font-semibold rounded-md  text-center">
            Send
          </button>
        </div>
      </div>

      {/* information bar  */}
      <div className="h-full bg-slate-200 w-3/12  ">
        <div className="bg-white p-3 font-semibold border">
          <p>Information</p>
        </div>
        <img
          src={userAvatar}
          alt="user-photo"
          className="w-24 h-24  mx-auto my-4                                                                                                                         "
        />
        <div className="bg-white m-4 p-4 text-center font-semibold text-xl rounded-md">
          <p>Raza miya</p>
          <p className="py-2 text-base text-slate-500">0185256455</p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
