import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapPin, Clock } from "lucide-react";
import { UserContext } from "../../context/UserContext";

export default function JobFiltering() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5099/api/Job", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user.token]);

  const getExperienceRange = (level) => {
    switch (level) {
      case "Entry-Level":
        return [0, 1];
      case "Junior":
        return [1, 3];
      case "Mid-Level":
        return [3, 5];
      case "Senior":
        return [5, Infinity];
      default:
        return [0, Infinity];
    }
  };

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const titleMatch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const typeMatch = selectedType === "" || job.jobType === selectedType;
      const locationMatch =
        selectedLocation === "" ||
        job.location.toLowerCase() === selectedLocation.toLowerCase();
      const salaryMatch =
        selectedSalary === "" || job.salary >= parseInt(selectedSalary);
      const [minExp, maxExp] = getExperienceRange(selectedExperience);
      const experienceMatch =
        selectedExperience === "" ||
        (job.experience >= minExp && job.experience <= maxExp);

      return (
        titleMatch &&
        typeMatch &&
        locationMatch &&
        salaryMatch &&
        experienceMatch
      );
    });

    setFilteredJobs(filtered.slice(0, 9));
  }, [
    searchTerm,
    selectedType,
    selectedLocation,
    selectedSalary,
    selectedExperience,
    jobs,
  ]);

  const handleApply = async (jobId) => {
    if (user.role !== "JobSeeker") {
      alert("Only job seekers can apply for jobs.");
      return;
    }

    const applicationData = {
      applicantId: user.jobSeekerId,
      jobId: jobId,
      status: "pending",
      applyDate: new Date().toISOString(),
    };

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
      alert("Application successful");
    } catch (error) {
      console.error("Error applying for job", error);
      alert("Error applying for job. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div className="container-fluid job-portal">
      <header
        className="py-5 text-white"
        style={{
          backgroundColor: "rgb(241, 241, 255)",
          color: "black",
          borderRadius: "15px",
          maxWidth: "94%",
          margin: "0 auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 mb-4" style={{ color: "black" }}>
            Find Your Dream Job⚡
          </h1>
          <p className="lead mb-4" style={{ color: "grey" }}>
            Explore thousands of job opportunities that match your skills and
            ambitions.
          </p>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          {error && <div>{error}</div>}

          <section className="filters mb-5">
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">All Job Types</option>
                  <option value="Full-Time">Full-time</option>
                  <option value="Part-Time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                >
                  <option value="">All Salaries</option>
                  <option value="200000">₹200,000+</option>
                  <option value="500000">₹500,000+</option>
                  <option value="1000000">₹1,000,000+</option>
                  <option value="2500000">₹2,500,000+</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  <option value="">All Experience Levels</option>
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>
          </section>

          <section className="job-listings">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredJobs.map((job) => (
                <div key={job.jobId} className="col">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{job.title}</h5>
                      <p className="card-text text-muted mb-2">
                        <strong>Description:</strong> {job.description}
                      </p>
                      <p className="card-text">
                        <strong>Requirements:</strong> {job.requirements}
                      </p>
                      <p className="card-text">
                        <MapPin size={16} className="me-2" />
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="card-text">
                        <span className="fw-bold">
                          Salary: ₹{job.salary.toLocaleString("en-IN")}
                        </span>
                      </p>
                      <p className="card-text">
                        <strong>Job Type:</strong> {job.jobType}
                      </p>
                      <p className="card-text">
                        <strong>Category:</strong> {job.category}
                      </p>
                      <p className="card-text">
                        <strong>Experience:</strong> {job.experience} years
                      </p>
                      <p className="card-text">
                        <strong>Qualification:</strong> {job.qualification}
                      </p>
                      <p className="card-text">
                        <Clock size={16} className="me-2" />
                        <strong>Posted On:</strong>{" "}
                        {new Date(job.postDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                      {user.role === "JobSeeker" ? (
                        <button
                          className="btn btn-outline-primary w-100"
                          onClick={() => handleApply(job.jobId)}
                        >
                          Apply Now
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-secondary w-100"
                          disabled
                        >
                          Only Job Seekers Can Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
