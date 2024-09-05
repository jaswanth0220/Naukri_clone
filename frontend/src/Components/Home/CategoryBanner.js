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

function CategoryToCompanyBanner() {
  return (
    <header
      className="py-5 text-white"
      style={{
        backgroundColor: "rgb(241, 241, 255)",
        color: "black",
        borderRadius: "15px",
        maxWidth: "94%",
        margin: "40px auto", // Add some margin for spacing
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container text-center">
        <h1 className="display-4 mb-4" style={{ color: "grey" }}>
          Unlock Your Career Potential 🚀
        </h1>
        {/* <p className="lead mb-4" style={{ color: "grey" }}>
            Connect with leading companies in your industry and discover opportunities that align with your goals and expertise.
          </p> */}
      </div>
    </header>
  );
}
