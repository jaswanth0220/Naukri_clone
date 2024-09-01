import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Cregister from "./Components/Cregistration";
import JobPostingForm from "./Components/JobPosting";
import JobList from "./Components/JobList";
import ApplyForJob from "./Components/ApplyForJob";
import Logout from "./Components/Logout";
import { UserProvider, UserContext } from "./context/UserContext";
import "./App.css";
import EmployerDashboard from "./Components/EmployerDashboard";
import AppliedJobs from "./Components/AppliedJobs";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <header className="header">
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/cregister">Register</Link>
              </li>
              <li>
                <Link to="/joblist">Job List</Link>
              </li>
              <li>
                <Link to="/postJob">Post Job</Link>
              </li>
              <li>
                <Link to="/apply/1">Apply for Job</Link> {/* Sample jobId */}
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cregister" element={<Cregister />} />
            <Route path="/postJob" element={<JobPostingForm />} />
            <Route path="/apply/:jobId" element={<ApplyForJob />} />
            <Route path="/joblist" element={<JobList />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard/>} />
            <Route path="*" element={<h1>Page not found</h1>} />

          </Routes>
        </main>
      </Router>
    </UserProvider>
  );
};

export default App;
