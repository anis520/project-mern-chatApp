import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const PrivateGard = () => {
  const { user } = useAuthUser();

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateGard;
