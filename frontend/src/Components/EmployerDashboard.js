import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "./EmployerDashboard.css"; // Importing the CSS for styling

const EmployerDashboard = () => {
  const { user } = useContext(UserContext); // Assuming user info in context
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [status, setStatus] = useState({}); // To handle status updates

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5099/api/Employer/GetPostedJobs`,
          {
            params: { employerId: user.employerId }, // Assuming employerId in user context
          }
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    if (user?.employerId) {
      fetchJobs();
    }
  }, [user]);

  const viewApplicants = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:5099/api/Job/GetApplicantsForJob/${jobId}`
      );
      // Include applicationId in the state
      const applicantsWithId = response.data.map((applicant) => ({
        ...applicant,
        applicationId: applicant.applicationId, // Ensure applicationId is included
      }));
      setApplicants((prev) => ({
        ...prev,
        [jobId]: applicantsWithId,
      }));
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleStatusChange = async (jobId, applicationId, newStatus) => {
    try {
      if (!["Accepted", "Rejected"].includes(newStatus)) {
        throw new Error("Invalid status");
      }

      await axios.put(
        `http://localhost:5099/api/Application/${applicationId}/status`,
        newStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setApplicants((prev) => ({
        ...prev,
        [jobId]: prev[jobId].map((applicant) =>
          applicant.applicationId === applicationId
            ? { ...applicant, status: newStatus }
            : applicant
        ),
      }));
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Jobs Posted by You</h2>
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.jobId} className="job-item">
            <h3>{job.title}</h3>
            <button onClick={() => viewApplicants(job.jobId)}>
              View Applicants
            </button>

            {applicants[job.jobId] && (
              <ul className="applicants-list">
                {applicants[job.jobId].map((applicant) => (
                  <li key={applicant.applicationId} className="applicant-item">
                    <div>
                      <strong>{applicant.userName}</strong> - {applicant.status}
                    </div>
                    <div className="status-buttons">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            job.jobId,
                            applicant.applicationId,
                            "Accepted"
                          )
                        }
                        className="status-button"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            job.jobId,
                            applicant.applicationId,
                            "Rejected"
                          )
                        }
                        className="status-button reject"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployerDashboard;
