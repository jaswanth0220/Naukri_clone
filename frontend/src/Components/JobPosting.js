import React, { useState, useContext } from "react";
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
    jobType: "",
    category: "",
    experience: "",
    qualification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobDataWithEmployer = {
      postedBy: user.employerId,
      ...jobData,
    };
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
      navigate("/employer-dashboard");
      console.log("Job posted successfully", response.data);
      setJobData({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        postDate: "",
        expiryDate: "",
        jobType: "",
        category: "",
        experience: "",
        qualification: "",
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
        <div className="form-group">
          <label>Job Type</label>
          <select
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div className="form-group">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 3 years)"
            value={jobData.experience}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Qualification</label>
          <input
            type="text"
            name="qualification"
            placeholder="Qualification (e.g., Bachelor’s Degree in Computer Science)"
            value={jobData.qualification}
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
