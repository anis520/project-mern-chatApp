import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvaterUI from "../AvaterUI/AvaterUI";
import { Link } from "react-router-dom";
import { logoutUser, uploadPhoto } from "../../features/auth/authApiSlice";
import cn from "../../utils/cn";

const Profile = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { user, loader } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      const data = new FormData();

      data.append("profile-photo", file);
      data.append("id", user._id);
      console.log(data);
      dispatch(uploadPhoto(data));
    }
    setFile(null);
  };

  return (
    <div
      className={`h-screen w-screen  bg-${theme} flex items-center justify-center`}
    >
      <div className="w-11/12 md:w-6/12  p-5 bg-white rounded-lg space-y-3 ">
        <div
          className={`relative w-44 h-44 rounded-full object-cover text-6xl 
          }`}
        >
          <label htmlFor="photo">
            <input
              onChange={handleFileUpload}
              type="file"
              name=""
              id="photo"
              className="hidden"
            />
            <AvaterUI
              name={user.name}
              photo={file ? URL.createObjectURL(file) : user.photo}
            />
          </label>
          {file && (
            <button
              onClick={handleSubmit}
              className={cn(
                "rounded-b-full    text-2xl p-2 absolute bottom-2   right-4  bg-blue-400 text-white px-1   w-10/12   "
              )}
            >
              update
            </button>
          )}
        </div>

        <p>{user.name}</p>

        <Link to="/">Home</Link>
        <br />
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
