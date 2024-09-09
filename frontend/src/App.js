import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Cregister from "./Components/Cregistration";
import JobPostingForm from "./Components/JobPosting";
import JobList from "./Components/JobList";
import ApplyForJob from "./Components/ApplyForJob";
import Logout from "./Components/Logout";
import EmployerDashboard from "./Components/EmployerDashboard";
import AppliedJobs from "./Components/AppliedJobs";
import { UserProvider, UserContext } from "./context/UserContext";
import JobDetails from "./Components/JobDetails";
import ProfilePage from "./Components/ProfilePage";

// Role-Based Route Protection for Job Seekers
const JobSeekerRoute = ({ element: Component }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== "JobSeeker") {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

// Role-Based Route Protection for Employers
const EmployerRoute = ({ element: Component }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== "Employer") {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

// Navigation Links Component
const UserNavLinks = () => {
  const { user } = useContext(UserContext);

  if (user && user.userId) {
    return (
      <>
        {user.role === "JobSeeker" && (
          <>
            <Nav.Link as={Link} to="/joblist">
              Job List
            </Nav.Link>
            <Nav.Link as={Link} to="/applied-jobs">
              Applied Jobs
            </Nav.Link>
          </>
        )}
        {user.role === "Employer" && (
          <>
            <Nav.Link as={Link} to="/postJob">
              Post Job
            </Nav.Link>
            <Nav.Link as={Link} to="/employer-dashboard">
              Employer Dashboard
            </Nav.Link>
          </>
        )}
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/logout">
          Logout
        </Nav.Link>
      </>
    );
  }

  return (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/cregister">
        Register
      </Nav.Link>
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              JobSearch
            </Navbar.Brand>
            {/* Moved Navbar.Toggle after the Brand */}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="ms-auto"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* Use ms-auto to align links to the right */}
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <UserNavLinks />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cregister" element={<Cregister />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/jobs/" element={<JobList />} />

            {/* Profile Page */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* Job Seeker Specific Routes */}
            <Route
              path="/joblist"
              element={<JobSeekerRoute element={JobList} />}
            />
            <Route
              path="/apply/:jobId"
              element={<JobSeekerRoute element={ApplyForJob} />}
            />
            <Route
              path="/applied-jobs"
              element={<JobSeekerRoute element={AppliedJobs} />}
            />

            {/* Employer Specific Routes */}
            <Route
              path="/postJob"
              element={<EmployerRoute element={JobPostingForm} />}
            />
            <Route
              path="/employer-dashboard"
              element={<EmployerRoute element={EmployerDashboard} />}
            />

            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </main>
      </Router>
    </UserProvider>
  );
};

export default App;
