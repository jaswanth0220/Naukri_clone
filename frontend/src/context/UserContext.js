import React, { createContext, useState } from "react";

// Create UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: localStorage.getItem("userId") || null,
    userName: localStorage.getItem("userName") || "",
    email: localStorage.getItem("email") || "",
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
    employerId: localStorage.getItem("employerId") || null,
    jobSeekerId: localStorage.getItem("jobSeekerId") || null,
  });

  const login = (userData) => {
    setUser({
      userId: userData.userId,
      userName: userData.userName,
      email: userData.email,
      role: userData.role,
      token: userData.token,
      employerId: userData.employerId || null,
      jobSeekerId: userData.jobSeekerId || null,
    });

    // Save all user details to localStorage
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("userName", userData.userName);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("employerId", userData.employerId || null);
    localStorage.setItem("jobSeekerId", userData.jobSeekerId || null);
  };

  const logout = () => {
    setUser({
      userId: null,
      userName: "",
      email: "",
      role: "",
      token: "",
      employerId: null,
      jobSeekerId: null,
    });

    // Remove all user details from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("employerId");
    localStorage.removeItem("jobSeekerId");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
