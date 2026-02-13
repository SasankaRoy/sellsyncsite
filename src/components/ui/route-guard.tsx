import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RouteGuard = () => {
  const token = Cookies.get("authToken");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default RouteGuard;