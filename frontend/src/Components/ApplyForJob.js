import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access the jobId
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const ApplyForJob = () => {
  const { user } = useContext(UserContext);
  const { jobId } = useParams(); // Retrieve the jobId from the URL
  const [jobDetails, setJobDetails] = useState(null); // State to store job details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  const [applicationData, setApplicationData] = useState({
    applicantId: user.userId, // Assuming the job seeker ID is stored in localStorage
    jobId: jobId, // Use the jobId from the URL
    status: "rejected", // Initial status for the application
    applyDate: new Date().toISOString(), // Automatically set the current date
  });

  // Fetch job details when the component loads
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5099/api/job/${jobId}`
        );
        setJobDetails(response.data); // Assuming response.data contains job details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details", error);
        setError("Failed to fetch job details.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5099/api/application/",
        applicationData
      );
      console.log("Application successful", response.data);
    } catch (error) {
      console.error("Error applying for job", error);
    }
  };

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {jobDetails && (
        <>
          <h2>Apply for {jobDetails.title}</h2>
          <p>
            <strong>Job Description:</strong> {jobDetails.description}
          </p>
          <p>
            <strong>Requirements:</strong> {jobDetails.requirements}
          </p>
          <p>
            <strong>Location:</strong> {jobDetails.location}
          </p>
          <p>
            <strong>Salary:</strong> {jobDetails.salary}
          </p>
          <p>
            <strong>Posted on:</strong>{" "}
            {new Date(jobDetails.postDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Expires on:</strong>{" "}
            {new Date(jobDetails.expiryDate).toLocaleDateString()}
          </p>
          <button onClick={handleApply}>Apply</button>
        </>
      )}
    </div>
  );
};

export default ApplyForJob;
