import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormControl } from "react-bootstrap";
import JobFiltering from "./Home/FilteringFeature";
import "./Home.css";
import hero from "../hero image.png";
import JobCategories from "./Home/JobCategories";
import FeaturedCompanies from "./Home/FeaturedCompanies";
import CategoryToCompanyBanner from "./Home/CategoryBanner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JobSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change and show/hide suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);

    try {
      const response = await axios.get(`http://localhost:5099/api/job/search`, {
        params: { query: value },
      });
      setSuggestions(response.data);
      setError(null); // Clear previous errors
    } catch {
      // Do not log the error, just set the error state
      setSuggestions([]);
      setError(
        "No jobs found matching your query. Please try a different search."
      );
    }
  };

  // Handle suggestion click and redirect
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/jobs/`+suggestion);
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "rgb(241 241 255)",
        color: "black",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="row w-100 mx-auto">
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold mb-2">Find Your Dream Job</h1>
          <p className="lead mb-4" style={{ color: "grey" }}>
            Search and apply for the best job opportunities in your field.
          </p>
          <Form className="mb-3">
            <div className="d-flex gap-2 position-relative">
              <FormControl
                type="text"
                placeholder="Job title, keywords, or company"
                value={query}
                onChange={handleInputChange}
                className="flex-grow-1"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  color: "black",
                  height: "50px",
                }}
              />

              <Button
                variant="primary"
                className="px-4"
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  height: "50px",
                  width: "120px",
                }}
              >
                Search
              </Button>

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <ul
                  className="list-group position-absolute"
                  style={{
                    top: "50px",
                    width: "100%",
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  {suggestions
                    .filter((suggestion) =>
                      suggestion.title
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={() => handleSuggestionClick(suggestion.jobId)}
                        style={{ cursor: "pointer" }}
                      >
                        {suggestion.title}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div
                className="alert alert-danger mt-3"
                role="alert"
                style={{ maxWidth: "500px" }}
              >
                {error}
              </div>
            )}
          </Form>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div
            className="bg-secondary rounded-3"
            style={{
              width: "100%",
              maxWidth: "500px",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <img
              src={hero}
              alt="Job search illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
        color: "#6c757d",
        textAlign: "center",
        borderTop: "1px solid #e9ecef",
        marginTop: "40px",
      }}
    >
      <div className="container">
        <div style={{ marginBottom: "10px" }}>
          <span style={{ marginRight: "15px" }}>
            <a
              href="#about"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              About Us
            </a>
          </span>
          <span style={{ marginRight: "15px" }}>
            <a
              href="#terms"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              Terms of Service
            </a>
          </span>
          <span>
            <a
              href="#privacy"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              Privacy Policy
            </a>
          </span>
        </div>
        <div style={{ fontSize: "14px" }}>
          &copy; 2024 JobSearch, Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <main>
        <JobSearch />
        <JobCategories />
        {/* <CategoryToCompanyBanner /> */}
        {/* <FeaturedCompanies /> */}
        <JobFiltering />
        <Footer />
      </main>
    </div>
  );
}

export default App;
