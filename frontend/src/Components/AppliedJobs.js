import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "./AppliedJobs.css"; // Ensure to import the CSS file

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
    return <p>Loading applied jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="applied-jobs-container">
      <h2>Applied Jobs</h2>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.jobId} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p>
                <strong>Status:</strong> {job.status}
              </p>
              <p>
                <strong>Applied on:</strong>{" "}
                {new Date(job.applyDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not applied for any jobs yet.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
