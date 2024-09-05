import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios for API calls
import { MapPin, Clock } from "lucide-react"; // Import necessary icons
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

  // Fetch jobs from the backend
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
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchJobs();
  }, [user.token]);

  // Filter jobs based on user's input
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === "" || job.type === selectedType) &&
        (selectedLocation === "" || job.location === selectedLocation) &&
        (selectedSalary === "" || job.salary >= parseInt(selectedSalary)) &&
        (selectedExperience === "" || job.experience === selectedExperience)
    );
    setFilteredJobs(filtered.slice(0, 9)); // Limit to 9 cards
  }, [
    searchTerm,
    selectedType,
    selectedLocation,
    selectedSalary,
    selectedExperience,
    jobs
  ]);

  // Display loading or error messages
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
          {/* Handle potential error message */}
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
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Hyderabad</option>
                  <option value="New York">Bangalore</option>
                  <option value="San Francisco">Chennai</option>
                  <option value="London">Pune</option>
                  <option value="Berlin">Mumbai</option>
                  <option value="Tokyo">Delhi</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                >
                  <option value="">All Salaries</option>
                  <option value="50000">₹50,000+</option>
                  <option value="75000">₹75,000+</option>
                  <option value="100000">₹100,000+</option>
                  <option value="125000">₹125,000+</option>
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
                        {job.description}
                      </p>
                      <p className="card-text">
                        <MapPin size={16} className="me-2" />
                        {job.location}
                      </p>
                      <p className="card-text">
                        <span className="fw-bold">₹{job.salary.toLocaleString("en-IN")}</span>
                      </p>
                      <p className="card-text">
                        <Clock size={16} className="me-2" />
                        Posted on: {new Date(job.postDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                      <button className="btn btn-outline-primary w-100">
                        Apply Now
                      </button>
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
