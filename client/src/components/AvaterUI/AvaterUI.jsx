import React, { useEffect, useState } from "react";
import loaderImage from "../../../public/upload.gif";
import { useSelector } from "react-redux";
const AvaterUI = ({ photo, name }) => {
  const [ui, setUi] = useState(null);
  const { loader } = useSelector((state) => state.auth);

  const handleNameAvater = (value) => {
    const makeSplit = value?.split(" ");
    if (makeSplit.length == 1) {
      const firstCharacterOfHello = makeSplit[0]?.charAt(0);

      setUi(firstCharacterOfHello + firstCharacterOfHello);
    } else {
      const firstCharacterOfHello = makeSplit[0]?.charAt(0);
      const firstCharacterOfWorld = makeSplit[1]?.charAt(0);

      setUi(firstCharacterOfHello + firstCharacterOfWorld);
    }
  };
  useEffect(() => {
    handleNameAvater(name);
  }, []);

  return (
    <div className=" w-full h-full  bg-white rounded-full overflow-hidden cursor-pointer border">
      {photo ? (
        <img
          src={loader ? loaderImage : photo}
          className=" object-cover   w-full h-full"
          alt=""
        />
      ) : (
        <p
          className={`uppercase flex items-center justify-center w-full h-full font-mono  font-semibold  `}
        >
          {ui}
        </p>
      )}
    </div>
  );
};

export default AvaterUI;
