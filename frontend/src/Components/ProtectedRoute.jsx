import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  const isAuthenticatedValue = typeof isAuthenticated === "function" ? isAuthenticated() : !!isAuthenticated;

  if (!isAuthenticatedValue) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
};

export default ProtectedRoute;
