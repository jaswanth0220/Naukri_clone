// src/Components/Logout.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Clear user data from context
    navigate("/login");
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
