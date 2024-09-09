import React, { useState } from "react";

const EmployerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyLocation: "",
    contactEmail: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the data back to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Company Description:</label>
        <input
          type="text"
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Company Location:</label>
        <input
          type="text"
          name="companyLocation"
          value={formData.companyLocation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployerForm;
