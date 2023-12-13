import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice";
import useFormFields from "../../hooks/useFormFields";
import { resendPasswordToken } from "../../features/auth/authApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ResetPasswordConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { paramstoken } = useParams();

  const { error, message, user } = useSelector(getAuthData);
  const { input, handleInputChange, resetForm, setInput } = useFormFields({
    password: "",
    confirmPassword: "",
    token: null,
  });
  const handleReset = () => {
    if (input.password != input.confirmPassword) {
      return toast.warn("confirmPassword not match");
    }
    input.token = paramstoken;
    dispatch(resendPasswordToken(input));
  };
  console.log(paramstoken);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toast.success(message);
      resetForm();
      navigate("/login");

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
          Reset your password
        </p>
        <div className="w-full h-2 bg-teal-400 my-3 space-y-3 rounded-md"></div>{" "}
        <input
          name="password"
          value={input.password}
          onChange={handleInputChange}
          type="text"
          placeholder="new password"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <input
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleInputChange}
          type="text"
          placeholder="Confirm password"
          className="w-full p-1 border border-teal-400 rounded-md"
        />
        <button
          onClick={handleReset}
          className="w-full p-2 bg-teal-400 text-white rounded-md text-lg font-semibold "
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
