import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Image } from "react-bootstrap";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5099/api/User/GetProfile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /> Loading...</div>;

  if (!profileData) return <div className="text-center mt-5">No profile data available</div>;

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="profile-card">
            <Card.Header className="text-center">
              <Image
                src={`https://ui-avatars.com/api/?name=${profileData.userName}&background=random`}
                roundedCircle
                className="profile-picture"
              />
              <h2>{profileData.userName}</h2>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h4>Basic Information</h4>
                  <p><strong>Email:</strong> {profileData.email}</p>
                  <p><strong>Role:</strong> {profileData.role}</p>
                </Col>

                {profileData.role === "Employer" && (
                  <Col md={6}>
                    <h4>Company Information</h4>
                    <p><strong>Company Name:</strong> {profileData.companyName}</p>
                    <p><strong>Description:</strong> {profileData.companyDescription}</p>
                    <p><strong>Location:</strong> {profileData.companyLocation}</p>
                    <p><strong>Contact Email:</strong> {profileData.contactEmail}</p>
                    <p><strong>Contact Number:</strong> {profileData.contactNumber}</p>
                  </Col>
                )}

                {profileData.role === "JobSeeker" && (
                  <Col md={6}>
                    <h4>Personal Information</h4>
                    <p><strong>First Name:</strong> {profileData.firstName}</p>
                    <p><strong>Last Name:</strong> {profileData.lastName}</p>
                    <p><strong>Address:</strong> {profileData.address}</p>
                    <p><strong>City:</strong> {profileData.city}</p>
                    <p><strong>State:</strong> {profileData.state}</p>
                    <p><strong>Zip:</strong> {profileData.zip}</p>
                    <p><strong>Phone:</strong> {profileData.phone}</p>
                    <h4>Professional Information</h4>
                    <p><strong>Skills:</strong> {profileData.skills}</p>
                    <p><strong>Experience:</strong> {profileData.experience}</p>
                    <p><strong>Education:</strong> {profileData.education}</p>
                    <p><strong>Objective:</strong> {profileData.objective}</p>
                  </Col>
                )}
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="primary">Edit Profile</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
