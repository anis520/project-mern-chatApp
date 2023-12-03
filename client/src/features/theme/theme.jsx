import React, { useRef, useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { FaFeather } from "react-icons/fa";

import { useOnclickOutside } from "../../hooks/useOnclickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setTheme } from "../../features/theme/themeSlice";
import cn from "../../utils/cn";

const Theme = ({ style }) => {
  const { theme, mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const bar = useRef(null);
  const [setting, setSettiog] = useState(false);
  useOnclickOutside(bar, () => setSettiog(false));

  const handleTheme = (payload) => {
    dispatch(setTheme(payload));
  };
  const handleThemeDark = (payload) => {
    dispatch(setDark(payload));
  };
  return (
    <div ref={bar} className=" ">
      <BsGearFill
        onClick={() => setSettiog(!setting)}
        className={cn(`duration-300  `, {
          "text-slate-200  rotate-90": setting,
        })}
      />
      {/* setting div  */}
      {setting && (
        <div
          className={cn(
            "theme py-2 px-4 text-center bg-white dark:bg-darkBg dark:text-white    text-base absolute    bottom-10 left-14 rounded-md    drop-shadow-2xl",
            style
          )}
        >
          <p className="font-semibold px-5">Themes</p>
          <hr />

          <div className="flex gap-3 items-center p-3">
            <button
              onClick={() => handleTheme("purple-400")}
              className={cn(
                " duration-300  bg-purple-400 text-white h-8  w-8 p-1 rounded-full flex items-center justify-center",
                {
                  "ring-2 ring-offset-2 dark:ring-offset-darkBg ring-purple-400 animate-spin ease-in ":
                    theme == "purple-400",
                }
              )}
            >
              <FaFeather />
            </button>
            <button
              onClick={() => handleTheme("teal-400")}
              className={cn(
                " duration-300  bg-teal-400 text-white h-8  w-8 p-1 rounded-full flex items-center justify-center",
                {
                  "ring-2 ring-offset-2 dark:ring-offset-darkBg ring-teal-400 animate-spin ease-in ":
                    theme == "teal-400",
                }
              )}
            >
              <FaFeather />
            </button>
            <button
              onClick={() => handleTheme("cyan-400")}
              className={cn(
                " duration-300  bg-cyan-400 text-white h-8  w-8 p-1 rounded-full flex items-center justify-center",
                {
                  "ring-2 ring-offset-2 dark:ring-offset-darkBg ring-cyan-400 animate-spin ease-in ":
                    theme == "cyan-400",
                }
              )}
            >
              <FaFeather />
            </button>
          </div>
          <p className="font-semibold px-5">Appearance</p>
          <hr />
          <div className="flex gap-2 p-2 justify-center font-semibold text-sm ">
            <button
              onClick={() => handleThemeDark("dark")}
              className={cn(`  bg-slate-800 text-slate-100 px-2 rounded-md `, {
                "duration-300 ring-2 ring-slate-500  ring-offset-2 dark:ring-offset-darkBg ":
                  mode == "dark",
              })}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeDark("light")}
              className={cn(
                `bg-slate-200 text-slate-800 px-2 border rounded-md  `,
                {
                  "duration-300 ring-2 ring-slate-500  ring-offset-2 dark:ring-offset-darkBg ":
                    mode == "light",
                }
              )}
            >
              Light
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Theme;
