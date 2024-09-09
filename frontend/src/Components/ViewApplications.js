// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewApplications = ({ jobId }) => {
//     const [applications, setApplications] = useState([]);
//     const [status, setStatus] = useState('');

//     useEffect(() => {
//         const fetchApplications = async () => {
//             try {
//                 const response = await axios.get('API_URL/api/application');
//                 setApplications(response.data);
//             } catch (error) {
//                 console.error('Error fetching applications', error);
//             }
//         };
//         fetchApplications();
//     }, []);

//     const handleUpdateStatus = async (applicationId, newStatus) => {
//         try {
//             await axios.put(`API_URL/api/application/application/${applicationId}/status`, newStatus, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             alert('Status updated');
//         } catch (error) {
//             console.error('Error updating status', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Applications for Job {jobId}</h2>
//             {applications.map(application => (
//                 <div key={application.applicationId}>
//                     <p>Applicant ID: {application.applicantId}</p>
//                     <p>Status: {application.status}</p>
//                     <select onChange={(e) => setStatus(e.target.value)}>
//                         <option value="Pending">Pending</option>
//                         <option value="Accepted">Accepted</option>
//                         <option value="Rejected">Rejected</option>
//                     </select>
//                     <button onClick={() => handleUpdateStatus(application.applicationId, status)}>Update Status</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ViewApplications;
