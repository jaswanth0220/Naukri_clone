import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function FeaturedCompanies() {
  const companies = [
    {
      name: "Datamatics",
      logo: "D",
      rating: 3.5,
      reviews: "1.8K+",
      description: "Global digital solutions & technology company.",
    },
    {
      name: "Reliance Retail",
      logo: "R",
      rating: 3.9,
      reviews: "20.1K+",
      description: "One of India's Top 100 workplaces in 2022.",
    },
    {
      name: "Amazon",
      logo: "A",
      rating: 4.1,
      reviews: "22.9K+",
      description: "World's largest Internet company.",
    },
    {
      name: "Optum",
      logo: "O",
      rating: 4.0,
      reviews: "3.6K+",
      description: "Leading digital health tech company in India.",
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="display-4 mb-4 text-center" style={{ color: "black" }}>
        Featured Companies
      </h1>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="light" className="mx-1">
          All
        </Button>
        <Button variant="light" className="mx-1">
          IT Services
        </Button>
        <Button variant="light" className="mx-1">
          BFSI
        </Button>
      </div>
      <Row className="row-cols-1 row-cols-md-4 g-4">
        {companies.map((company, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-3">
                  {company.logo.startsWith("/") ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      style={{ height: "50px" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgb(241, 241, 255)",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        borderRadius: "50%",
                        fontWeight: "bold",
                      }}
                    >
                      {company.logo}
                    </div>
                  )}
                </div>
                <Card.Title className="text-center">{company.name}</Card.Title>
                <div className="text-center text-warning mb-2">
                  {"★".repeat(Math.floor(company.rating))}
                  <span className="text-muted ml-1">
                    {company.rating} {company.reviews} reviews
                  </span>
                </div>
                <Card.Text className="text-center small flex-grow-1">
                  {company.description}
                </Card.Text>
                <div className="text-center mt-auto">
                  <Button variant="outline-primary" size="sm">
                    View jobs
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FeaturedCompanies;
