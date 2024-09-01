import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./JobPostingForm.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const JobPostingForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    postDate: "",
    expiryDate: "",
  });

  const [employerId, setEmployerId] = useState(null);
  const userId = user.userId;
  // Fetch EmployerId based on UserId when component mounts
  // useEffect(() => {
  //   const fetchEmployerId = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5099/api/employer/GetEmployerByUserId/${userId}`);
  //       setEmployerId(response.data); // Store the fetched EmployerId
  //       console.log(employerId);
  //     } catch (error) {
  //       console.error("Error fetching EmployerId", error);
  //     }
  //   };

  //   if (userId) {
  //     fetchEmployerId(); // Call the API only if userId exists
  //   }
  // }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is called"+user.employerId);
    const jobDataWithEmployer = {
      postedBy: user.employerId, 
      ...jobData,
    };
    // Pass the token in the header to authenticate the user
    try {
      const response = await axios.post(
        "http://localhost:5099/api/job",
        jobDataWithEmployer,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/joblist");
      console.log("Job posted successfully", response.data);
      setJobData({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        postDate: "",
        expiryDate: "",
      });
    } catch (error) {
      console.error("Error posting job", error);
    }
  };

  return (
    <div className="job-posting-container">
      <h2 className="form-title">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="job-posting-form">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <textarea
            name="requirements"
            placeholder="Requirements"
            value={jobData.requirements}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={jobData.salary}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Post Date</label>
          <input
            type="date"
            name="postDate"
            value={jobData.postDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={jobData.expiryDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
