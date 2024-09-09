import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployerForm from "./EmployerForm"; // Employer form component
import JobSeekerForm from "./JobSeekerForm"; // Job seeker form component
import "./Cregister.css";

const Cregister = () => {
  const [step, setStep] = useState(1); // Step 1: Basic registration, Step 2: Role-specific form
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For storing error message

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (additionalData) => {
    const userDto = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      role: role,
    };

    try {
      // Register user
      const registerResponse = await axios.post(
        "http://localhost:5099/api/User/Register",
        userDto
      );
      const userId = registerResponse.data.userId;

      // Register additional role-specific data
      if (role === "Employer") {
        await axios.post("http://localhost:5099/api/Employer/", {
          userId: userId,
          ...additionalData,
        });
      } else if (role === "JobSeeker") {
        await axios.post("http://localhost:5099/api/JobSeeker/", {
          userId: userId,
          ...additionalData,
        });
      }

      // On success, navigate to login
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);

      // Display user-friendly error message
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {step === 1 && (
          <>
            <h2>Register</h2>
            <form onSubmit={handleNext}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="role-select">
                <label>Role:</label>
                <select value={role} onChange={handleRoleChange} required>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="JobSeeker">Job Seeker</option>
                </select>
              </div>
              <button type="submit">Next</button>
            </form>
          </>
        )}

        {step === 2 && role === "Employer" && (
          <EmployerForm onSubmit={handleSubmit} />
        )}

        {step === 2 && role === "JobSeeker" && (
          <JobSeekerForm onSubmit={handleSubmit} />
        )}

        {/* Display error message if there is any */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Cregister;
