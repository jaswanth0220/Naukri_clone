import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "./Cregister.css"; 

const Cregister = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    companyName: "",
    resume: "",
    skills: "",
    experience: "",
    education: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (role === "Employer") {
        const employerDto = {
          userId: userId,
          companyName: formData.companyName,
        };
        await axios.post("http://localhost:5099/api/Employer/", employerDto);
      } 
    
      else if (role === "JobSeeker") {
        const jobSeekerDto = {
          userId: userId,
          resume: formData.resume,
          skills: formData.skills,
          experience: formData.experience,
          education: formData.education,
        };
        await axios.post("http://localhost:5099/api/JobSeeker/", jobSeekerDto);
      }

      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
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

          {role === "Employer" && (
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {role === "JobSeeker" && (
            <>
              <div>
                <label>Resume:</label>
                <input
                  type="text"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Skills:</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Experience:</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Education:</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Cregister;
