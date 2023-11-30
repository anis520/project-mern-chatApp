import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  activateAccountByOTP,
  activation,
} from "../../features/auth/authApiSlice";
import Cookies from "js-cookie";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
const Activation = () => {
  const { error, message } = useSelector(getAuthData);
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  let { paramstoken } = useParams();
  let dispatch = useDispatch();
  const token = Cookies.get("verifyToken");
  console.log(token);
  const handleOtpHandler = () => {
    dispatch(activateAccountByOTP({ token: token, otp: otp }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    dispatch(activation(paramstoken));
    dispatch(setMessageEmpty());
  }, [paramstoken, dispatch, token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);
      navigate("/login");

      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, navigate]);

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
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Actvation code"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button
          onClick={handleOtpHandler}
          className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold "
        >
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
