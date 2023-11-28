import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-teal-500 to-teal-300 flex items-center justify-center">
      <div
        className="w-10/12 md:w-6/12 lg:w-4/12 p-4
    rounded-md bg-white space-y-3"
      >
        <p className="text-2xl text-teal-400 font-semibold">Login</p>
        <div className="w-full h-2 bg-teal-400 my-3 space-y-3 rounded-md"></div>{" "}
        <p className="  font-semibold ">Email :</p>
        <input
          type="text"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <p className="  font-semibold ">Password :</p>
        <input
          type="password"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold ">
          login
        </button>
        <div className="flex justify-between">
          <p className="text-teal-400 font-semibold">
            <Link to={"/register"}>Create an account ?</Link>
          </p>{" "}
          <p className="text-teal-400 font-semibold">
            <Link to={"/resetpassword"}>Forgot password ?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
