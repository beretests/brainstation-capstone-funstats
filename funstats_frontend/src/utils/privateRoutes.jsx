import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/authProvider";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const PrivateRoutes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("JWTtoken");
    const storedUserId = sessionStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign_in" state={{ from: location }} />
  );
};

export default PrivateRoutes;
