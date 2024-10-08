import React, { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For storing error message
  const { user, login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.userId) {
      try {
        const response = await axios.post(
          "http://localhost:5099/api/User/Login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);

        // Call login function from context with the response data
        login(response.data);

        // Navigate based on user role
        if (response.data.role === "Employer") {
          navigate("/employer-dashboard");
        } else if (response.data.role === "JobSeeker") {
          navigate("/");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error during login:", error);

        // Show user-friendly error message based on the error response
        if (error.response && error.response.data) {
          setErrorMessage(
            error.response.data.message || "Login failed. Please try again."
          );
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      alert("You are already logged in");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>

        {/* Display error message if there is any */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
