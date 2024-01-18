import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner from "../../../public/banners1.png";
import banner2 from "../../../public/e31b752875679b64fce009922f9f0dda.gif";

const Landing = () => {
  return (
    <div className="  bg-white ">
      <div className=" px-4 lg:px-16 py-4 flex justify-between shadow-inner shadow-green-400">
        <Link
          className="font-mono text-2xl font-bold text-green-400 border border-green-400 px-4 rounded-md opacity-60 hover:opacity-80 duration-300"
          to={"/"}
        >
          Applogo
        </Link>
        <div className="flex items-center gap-5">
          <Link to={"/login"} className="font-semibold text-green-400">
            Login
          </Link>
          <Link
            to={"/register"}
            className="bg-green-400 px-3 py-1 rounded-md text-white font-semibold"
          >
            Register
          </Link>
        </div>
      </div>

      <div className=" p-4 lg:p-16">
        <h3 className="text-gray-700 text-2xl lg:text-4xl font-bold lg:text-center ">
          <span className="text-green-400">Text</span> Lorem ipsum dolor sit
          amet consectetur adipisicing <br /> elit. Doloribus, hic?
          <span className="text-green-400"> it</span>
        </h3>
        <p className="text-gray-500 mt-5 lg:text-center font-semibold">
          Beause this app is very Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Officia, enim? user friendly{" "}
        </p>

        <img src={banner2} className="lg:w-6/12 mx-auto" alt="" />
      </div>

      <div className=" p-4 lg:p-16 bg-green-400 w-full  flex  flex-col lg:flex-row lg:items-center ">
        <div className=" lg:w-7/12 space-y-4 mb-16 lg:mb-0">
          <h4 className="text-xl lg:text-3xl font-bold text-white">
            Why you choose this app
          </h4>
          <p className="text-white text-sm lg:text-base font-semibold">
            Beause this app is very user friendly{" "}
          </p>
          <Link to={"/login"}>
            <button className="  text-green-400 font-bold  text-lg shadow-sm bg-white px-5 py-1 rounded-md">
              Try it
            </button>
          </Link>
        </div>
        <div className=" lg:w-5/12 mx-auto grid grid-cols-2 gap-6  ">
          <div className="bg-slate-50 bg-opacity-20 font-semibold text-center  p-5 rounded-b-3xl rounded-l-3xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti,
            at.
          </div>
          <div className="bg-slate-50 bg-opacity-20 font-semibold text-center  p-5 rounded-t-3xl rounded-l-3xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti,
            at.
          </div>
          <div className="bg-slate-50 bg-opacity-20 font-semibold text-center  p-5 rounded-b-3xl rounded-r-3xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti,
            at.
          </div>
          <div className="bg-slate-50 bg-opacity-20 font-semibold text-center  p-5 rounded-t-3xl rounded-r-3xl text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti,
            at.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
