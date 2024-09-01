// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  // If no user is logged in, navigate to the login page
  if (!user.userId) {
    return <Navigate to="/login" />;
  }

  // If the user role is not in the allowedRoles, restrict access
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // Render the children if the user has the correct role
  return children;
};

export default ProtectedRoute;
