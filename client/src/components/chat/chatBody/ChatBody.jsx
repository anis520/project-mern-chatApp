import { useEffect, useRef } from "react";
import SingleChat from "../../SingleChat";
import { useDispatch, useSelector } from "react-redux";
import AvaterUI from "../../AvaterUI/AvaterUI";
import typingImage from "../../../assets/dots-typing.gif";
import typingSound from "../../../assets/typing.wav";

import { Howl } from "howler";
const ChatBody = ({ activeUser }) => {
  const div = useRef();
  const { chats, loader } = useSelector((state) => state.chat);
  const { typing } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    div.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    div.current?.scrollIntoView({ behavior: "smooth" });
    const sound = new Howl({
      src: [typingSound], // Provide the path to your sound file
      volume: 0.5, // Adjust the volume as needed
    });
    if (typing?.msg) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [typing]);

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
              <AvaterUI
                name={activeUser?.userInfo?.name}
                photo={activeUser?.userInfo?.photo}
              />
            </div>
            <p className="text-center dark:text-white text-2xl font-semibold mt-2  ">
              {activeUser?.userInfo?.name}
            </p>
            <p className="text-center text-gray-400 text-sm font-semibold mt-2 mb-6">
              you can now chat with eatch others
            </p>
            <hr className="w-7/12 mx-auto mb-5" />

            {chats?.map((item, idex) => {
              return item.senderId == user?._id ? (
                <>
                  <SingleChat side={"left"} key={idex} data={item} />
                </>
              ) : (
                <div className="flex items-center">
                  <div className="w-6">
                    <AvaterUI
                      name={activeUser?.name}
                      photo={activeUser?.photo}
                    />
                  </div>
                  <SingleChat side={"right"} key={idex} data={item} />
                </div>
              );
            })}
            {user._id == typing?.reciverId && typing.msg !== "" && (
              <div className="my-10  text-gray-600  text-sm font-semibold flex items-center ">
                {activeUser.userInfo.name} typing
                <img
                  className="w-16 h-7 object-cover   rounded-lg    "
                  src={typingImage}
                />
                <div ref={div} />
              </div>
            )}
          </>
        )}
        <div ref={div} />
      </div>{" "}
    </>
  );
};

export default ChatBody;
