import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext
import { useLocation } from "react-router-dom"; // To get query parameters

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applyingJobId, setApplyingJobId] = useState(null); // Track job application state
  const { user } = useContext(UserContext); // Access user details from context
  const location = useLocation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5099/api/job", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.data) {
          setJobs(response.data);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
    fetchJobs();
  }, [user.token]);

  useEffect(() => {
    // Get category from URL query params
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    // Filter jobs by selected category
    if (selectedCategory) {
      const filtered = jobs.filter((job) => job.category === selectedCategory);
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs); // Show all jobs if no category is selected
    }
  }, [jobs, location.search]);

  const handleApply = async (jobId) => {
    const applicationData = {
      applicantId: user.jobSeekerId, // User's ID from the context
      jobId: jobId, // The job ID
      status: "pending", // Initial status for the application
      applyDate: new Date().toISOString(), // Automatically set the current date
    };

    try {
      const response = await axios.post(
        "http://localhost:5099/api/application/",
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Application successful", response.data);
      setApplyingJobId(null); // Reset the applying state after success
    } catch (error) {
      console.error("Error applying for job", error);
    }
  };

  const handleApplyClick = (jobId) => {
    setApplyingJobId(jobId); // Set the jobId of the job being applied to
    handleApply(jobId); // Automatically apply
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
    },
    heading: {
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "30px",
      color: "#333",
      fontWeight: "bold",
    },
    jobCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "25px",
      marginBottom: "25px",
      transition: "transform 0.3s ease-in-out",
    },
    jobCardHover: {
      transform: "translateY(-10px)",
    },
    jobTitle: {
      fontSize: "1.75rem",
      marginBottom: "10px",
      color: "#2c3e50",
      fontWeight: "bold",
    },
    jobDetails: {
      fontSize: "1rem",
      color: "#7f8c8d",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      padding: "12px 30px",
      borderRadius: "6px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
    },
    buttonHover: {
      backgroundColor: "#2980b9",
    },
    ul: {
      listStyle: "none",
      padding: "0",
    },
    label: {
      fontWeight: "bold",
      color: "#34495e",
    },
    detailsRow: {
      marginBottom: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Openings</h2>
      <ul style={styles.ul}>
        {filteredJobs.map((job) => (
          <li
            key={job.jobId}
            style={{
              ...styles.jobCard,
              ...(applyingJobId === job.jobId ? styles.jobCardHover : {}),
            }}
          >
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <div style={styles.jobDetails}>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Description: </span>
                {job.description}
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Requirements: </span>
                {job.requirements}
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Location: </span>
                {job.location}
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Salary: </span>₹
                {job.salary.toLocaleString()}
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Job Type: </span>
                {job.jobType}
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Category: </span>
                {job.category}
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Experience: </span>
                {job.experience} years
              </div>
              <div style={styles.detailsRow}>
                <span style={styles.label}>Qualification: </span>
                {job.qualification}
              </div>
            </div>

            {user.role === "JobSeeker" ? (
              <button
                onClick={() => handleApplyClick(job.jobId)}
                disabled={applyingJobId === job.jobId}
                style={{
                  ...styles.button,
                  ...(applyingJobId === job.jobId ? styles.buttonHover : {}),
                }}
              >
                {applyingJobId === job.jobId ? "Applying..." : "Apply"}
              </button>
            ) : (
              <span>Employers can't apply for jobs</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
