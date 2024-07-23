import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import userContext from "../context/Users/UserContext";

// const ProtectedRoutes = () => {
//   const token = localStorage.getItem("token");
//   return token ? <Outlet /> : <Navigate to="/login" />;
// };
const ProtectedRoutes = ({ allowedTypes }) => {
  const { user, getUser } = useContext(userContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user.id && token) {
      getUser();
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedTypes && !allowedTypes.includes(user.type)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
export default ProtectedRoutes;
