import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext
import "./JobList.css"; // Ensure to import the CSS file

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

  return (
    <div className="job-list-container">
      <h2>Job Openings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.jobId} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>

            {user.role === "JobSeeker" ? (
              <>
                {/* Show Apply button */}
                <button
                  onClick={() => handleApplyClick(job.jobId)}
                  disabled={applyingJobId === job.jobId}
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
