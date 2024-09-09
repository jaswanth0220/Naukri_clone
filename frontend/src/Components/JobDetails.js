import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserContext } from "../context/UserContext";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Get user info from context
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5099/api/job/${jobId}`
        );
        setJob(response.data);
        setError(null); // Clear previous errors
      } catch {
        setJob(null);
        setError("Error fetching job details. Please try again later.");
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    if (user.role !== "JobSeeker") {
      setApplicationError("Only job seekers can apply for jobs.");
      return;
    }

    const applicationData = {
      applicantId: user.jobSeekerId,
      jobId: jobId,
      status: "pending",
      applyDate: new Date().toISOString(),
    };

    setIsApplying(true);
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
      setApplicationSuccess(true);
      setApplicationError(null); // Clear previous errors
    } catch (error) {
      console.error("Error applying for job", error);
      setApplicationError("Error applying for job. Please try again later.");
      setApplicationSuccess(false);
    } finally {
      setIsApplying(false);
    }
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h2">{job.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {job.location}
              </Card.Subtitle>
              <Card.Text>
                <strong>Description:</strong> {job.description}
              </Card.Text>
              <Card.Text>
                <strong>Requirements:</strong>{" "}
                {job.requirements || "Not specified"}
              </Card.Text>
              <Card.Text>
                <strong>Salary:</strong> ${job.salary.toLocaleString()}
              </Card.Text>
              <Card.Text>
                <strong>Post Date:</strong>{" "}
                {new Date(job.postDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Expiry Date:</strong>{" "}
                {new Date(job.expiryDate).toLocaleDateString()}
              </Card.Text>

              {user.role === "JobSeeker" ? (
                <Button
                  variant="primary"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Apply Now"
                  )}
                </Button>
              ) : (
                <Alert variant="warning" className="mt-3">
                  Only job seekers can apply for this job.
                </Alert>
              )}

              {applicationError && (
                <Alert variant="danger" className="mt-3">
                  {applicationError}
                </Alert>
              )}
              {applicationSuccess && (
                <Alert variant="success" className="mt-3">
                  Application successful!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default JobDetails;
