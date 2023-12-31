import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import useFormFields from "../../hooks/useFormFields";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { resendPassword } from "../../features/auth/authApiSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, user } = useSelector(getAuthData);
  const { input, handleInputChange, resetForm, setInput } = useFormFields({
    email: "",
  });
  const handleReset = () => {
    dispatch(resendPassword(input));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);
      resetForm();

      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, resetForm, navigate]);
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-teal-500 to-teal-300 flex items-center justify-center">
      <div
        className="w-10/12 md:w-6/12 lg:w-4/12 p-4
       rounded-md bg-white space-y-3"
      >
        <p className="text-2xl text-teal-400 font-semibold text-center">
          Reset password
        </p>
        <div className="w-full h-2 bg-teal-400 my-3 space-y-3 rounded-md"></div>{" "}
        <input
          type="text"
          name="email"
          value={input.email}
          onChange={handleInputChange}
          placeholder="type your email"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button
          onClick={handleReset}
          className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold "
        >
          Reset your password
        </button>
        <button className="w-full p-2 text-teal-400 border border-teal-400 rounded-md text-lg font-semibold ">
          <Link className="" to={"/login"}>
            Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
