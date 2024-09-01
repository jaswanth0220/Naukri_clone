import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [details, setDetails] = useState({
    userName: "",
    Password: "",
    Email: "",
    Role: "",
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5099/api/User/Register",
        details
      );
      if (response.status === 200) {
        console.log("User Registered Successfully");
        
            } else {
        console.log("User Registration Failed");
      }
      setDetails({
        userName: "",
        Password: "",
        Email: "",
        Role: "",
      });
    } catch (error) {
      console.error("something went wrong");
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form
        method="post"
        onSubmit={handleSumbit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "200px",
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setDetails({ ...details, userName: e.target.value })}
          value={details.userName}
        />
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setDetails({ ...details, Email: e.target.value })}
          value={details.Email}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setDetails({ ...details, Password: e.target.value })}
          value={details.Password}
        />
        <select
          name=""
          id=""
          onChange={(e) => setDetails({ ...details, Role: e.target.value })}
          value={details.Role}
        >
          <option value="Employer">Employer</option>
          <option value="JobSeeker">Job Seeker</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
