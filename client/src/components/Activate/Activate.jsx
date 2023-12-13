import React, { useEffect, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  activateAccountByOTP,
  activation,
  resendActivation,
} from "../../features/auth/authApiSlice";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Activate = () => {
  const { user } = useAuthUser();
  const { error, message } = useSelector(getAuthData);
  const navigate = useNavigate();
  const token = Cookies.get("verifyToken");

  const [otp, setOtp] = useState("");
  let dispatch = useDispatch();
  const handleOtpHandler = () => {
    dispatch(activateAccountByOTP({ token: token, otp: otp }));
  };

  const resendHandler = () => {
    dispatch(resendActivation({ email: user.email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);

      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, navigate]);

  return (
    !user.isverfied && (
      <div className="fixed bottom-0 left-0 z-40  w-full h-full bg-white flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
        <div
          className="w-10/12 md:w-6/12 lg:w-4/12 p-4
       rounded-md bg-white space-y-3 shadow-lg border dark:bg-darkBg"
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
          <button
            onClick={resendHandler}
            className="text-center font-semibold text-teal-400 w-full"
          >
            Resend Activation link to ***
            {user.email.slice(10, user.email.lenght)}
          </button>
        </div>
      </div>
    )
  );
};

export default Activate;
