import React from "react";

const Activation = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-teal-500 to-teal-300 flex items-center justify-center">
      <div
        className="w-10/12 md:w-6/12 lg:w-4/12 p-4
       rounded-md bg-white space-y-3"
      >
        <p className="text-2xl text-teal-400 font-semibold text-center">
          Activation
        </p>
        <div className="w-full h-2 bg-teal-400 my-3 space-y-3 rounded-md"></div>{" "}
        <input
          type="text"
          placeholder="Actvation code"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold ">
          Activation now
        </button>
        <button className="text-center text-teal-400 font-semibold w-full">
          Resend OTP
        </button>
        <button className="text-center font-semibold text-teal-400 w-full">
          Resend Activation link to **abgmail.com
        </button>
      </div>
    </div>
  );
};

export default Activation;
