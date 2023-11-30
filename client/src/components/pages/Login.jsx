import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFormFields from "../../hooks/useFormFields";
import { toast } from "react-toastify";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authApiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, user } = useSelector(getAuthData);
  const { input, handleInputChange, resetForm, setInput } = useFormFields({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    dispatch(loginUser(input));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);
      resetForm();
      navigate("/");

      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, resetForm, navigate]);
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
          name="email"
          value={input.email}
          onChange={handleInputChange}
          type="text"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <p className="  font-semibold ">Password :</p>
        <input
          name="password"
          value={input.password}
          onChange={handleInputChange}
          type="password"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold "
        >
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
