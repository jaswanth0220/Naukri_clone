import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Modal, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5099/api/Employer/GetPostedJobs`,
          {
            params: { employerId: user.employerId },
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
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5099/api/Job/GetApplicantsForJob/${jobId}`
      );
      const applicantsWithId = response.data.map((applicant) => ({
        ...applicant,
        applicationId: applicant.applicationId,
      }));
      setApplicants((prev) => ({
        ...prev,
        [jobId]: applicantsWithId,
      }));
      setExpandedJobId(jobId);
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

  const viewProfile = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="dashboard-container">
      <h2>Jobs Posted by You</h2>
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.jobId} className="job-item">
            <h3>{job.title}</h3>
            <button onClick={() => viewApplicants(job.jobId)}>
              {expandedJobId === job.jobId
                ? "Hide Applicants"
                : "View Applicants"}
            </button>

            {expandedJobId === job.jobId && applicants[job.jobId] && (
              <ul className="applicants-list">
                {applicants[job.jobId].length > 0 ? (
                  applicants[job.jobId].map((applicant) => (
                    <li key={applicant.applicationId} className="applicant-item">
                      <div>
                        <strong>{applicant.userName}</strong> - {applicant.status}
                        <button
                          onClick={() => viewProfile(applicant)}
                          className="view-profile-button"
                        >
                          View Profile
                        </button>
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
                          className="status-button accept"
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
                  ))
                ) : (
                  <li>No applicants for this job.</li> // Message for no applicants
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for Applicant Details */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="applicant-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Applicant Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplicant && (
            <Card className="applicant-card">
              <Card.Body>
                <Card.Title>
                  {selectedApplicant.firstName} {selectedApplicant.lastName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {selectedApplicant.email}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Phone:</strong> {selectedApplicant.phone}
                  <br />
                  <strong>Address:</strong> {selectedApplicant.address},{" "}
                  {selectedApplicant.city}, {selectedApplicant.state},{" "}
                  {selectedApplicant.zip}
                  <br />
                  <strong>Skills:</strong> {selectedApplicant.skills}
                  <br />
                  <strong>Experience:</strong> {selectedApplicant.experience}
                  <br />
                  <strong>Education:</strong> {selectedApplicant.education}
                  <br />
                  <strong>Objective:</strong> {selectedApplicant.objective}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployerDashboard;