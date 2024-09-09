import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "./AppliedJobs.css"; // Import updated CSS

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5099/api/JobSeeker/${user.jobSeekerId}/applications`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs", error);
        setError("Failed to fetch applied jobs.");
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user.jobSeekerId, user.token]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading applied jobs...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="applied-jobs-container">
      <h2 className="section-heading">Applied Jobs</h2>
      {jobs.length > 0 ? (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.jobId} className="job-card">
              <div className="job-info">
                <h3 className="job-title">{job.jobTitle}</h3>
                <p className="job-detail">
                  <strong>Status:</strong> {job.status}
                </p>
                <p className="job-detail">
                  <strong>Applied on:</strong>{" "}
                  {new Date(job.applyDate).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-jobs-message">
          You haven't applied for any jobs yet. Start applying to land your
          dream job!
        </p>
      )}
    </div>
  );
};

export default AppliedJobs;
