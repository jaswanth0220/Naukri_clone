import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [applyingJobId, setApplyingJobId] = useState(null); // Track job application state
  const { user } = useContext(UserContext); // Access user details from context

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
      backgroundColor: "#f0f4f8",
    },
    heading: {
      textAlign: "center",
      fontSize: "2rem",
      marginBottom: "30px",
      color: "#333",
    },
    jobCard: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      marginBottom: "20px",
      transition: "transform 0.3s ease-in-out",
    },
    jobCardHover: {
      transform: "translateY(-10px)",
    },
    jobTitle: {
      fontSize: "1.5rem",
      marginBottom: "10px",
      color: "#2c3e50",
    },
    jobDescription: {
      fontSize: "1rem",
      color: "#7f8c8d",
      marginBottom: "15px",
    },
    button: {
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
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
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Openings</h2>
      <ul style={styles.ul}>
        {jobs.map((job) => (
          <li
            key={job.jobId}
            style={{
              ...styles.jobCard,
              ...(applyingJobId === job.jobId ? styles.jobCardHover : {}),
            }}
          >
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <p style={styles.jobDescription}>{job.description}</p>

            {user.role === "JobSeeker" ? (
              <>
                {/* Show Apply button */}
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
              </>
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
