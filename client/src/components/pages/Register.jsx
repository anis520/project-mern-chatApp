import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/auth/authApiSlice";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, user } = useSelector(getAuthData);
  const { input, handleInputChange, resetForm, setInput } = useFormFields({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = () => {
    dispatch(createUser(input));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);
      resetForm();
      navigate("/activation/verify");

      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, resetForm, navigate]);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-teal-500 to-teal-300 flex items-center justify-center">
      <div
        className="w-10/12 md:w-6/12 lg:w-4/12 p-4
    rounded-md bg-white space-y-3"
      >
        <p className="text-2xl text-teal-400 font-semibold">Register</p>
        <div className="w-full h-2 bg-teal-400 my-3 space-y-3 rounded-md"></div>{" "}
        <p className="  font-semibold ">Name :</p>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={input.name}
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <p className="  font-semibold ">Email :</p>
        <input
          type="text"
          name="email"
          onChange={handleInputChange}
          value={input.email}
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <p className="  font-semibold ">Password :</p>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={input.password}
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button
          onClick={handleRegister}
          className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold "
        >
          register
        </button>
        <p className="text-teal-400 font-semibold">
          <Link to={"/login"}>Have an account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
