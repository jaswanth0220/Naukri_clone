import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Updated import

const JobCategories = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const categories = [
    { id: 1, name: "Technology", icon: "bi bi-laptop" },
    { id: 2, name: "Finance", icon: "bi bi-currency-dollar" },
    { id: 3, name: "Marketing", icon: "bi bi-megaphone" },
    { id: 4, name: "Education", icon: "bi bi-book" },
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to JobList and pass the selected category as a query parameter
    navigate(`/jobs?category=${categoryName}`); // Updated navigation method
  };

  return (
    <section className="job-categories py-4 my-2">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h1 className="display-4 mb-2 text-center" style={{ color: "black" }}>
              Explore Jobs by Category
            </h1>
            <p style={{ color: "grey" }}>
              (Select a category to explore related job openings)
            </p>
          </Col>
        </Row>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <i className={`${category.icon} display-4 mb-3`}></i>
                  <Card.Title>{category.name}</Card.Title>
                  <Button
                    onClick={() => handleCategoryClick(category.name)}
                    variant="primary"
                  >
                    View Jobs
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default JobCategories;