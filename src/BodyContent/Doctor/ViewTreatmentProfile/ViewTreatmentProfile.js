import React from 'react';
import './ViewTreatmentProfile.css'; // Import the CSS file for styling

function ViewTreatmentProfile() {
  const profile = {
    name: 'John Doe',
    id: '123456',
    gender: 'Male',
    doctorName: 'Dr. Jane Smith',
    treatmentDate: 'June 28, 2023',
    symptoms: 'Fever, headache, cough',
    treatmentProgress: 'In progress'
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    alert('Profile confirmed');
  };

  return (
    <div className="profile-container">
      <h2>View Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Doctor Name:</strong> {profile.doctorName}</p>
        <p><strong>Treatment Date:</strong> {profile.treatmentDate}</p>
        <p><strong>Symptoms:</strong> {profile.symptoms}</p>
        <p><strong>Treatment Progress:</strong> {profile.treatmentProgress}</p>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default ViewTreatmentProfile;
