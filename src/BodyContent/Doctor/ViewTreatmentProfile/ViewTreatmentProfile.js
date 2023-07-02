import React, { useState } from 'react';
import './ViewTreatmentProfile.css'; // Import the CSS file for styling

function ViewTreatmentProfile() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);
  };

  const handleClosePopUp = () => {
    setSelectedSymptom(null);
  };

  const profile = {
    name: 'John Doe',
    id: '123456',
    gender: 'Male',
    doctorName: 'Dr. Jane Smith',
    treatmentDate: 'June 28, 2023',
    symptoms: [
      { name: 'Fever', description: 'A high body temperature' },
      { name: 'Headache', description: 'Pain in the head' },
      { name: 'Cough', description: 'Expelling air from the lungs' }
    ],
    treatmentProgress: [
      { time: '10:00 AM', date: 'June 28, 2023' },
      { time: '11:30 AM', date: 'June 29, 2023' },
      { time: '09:45 AM', date: 'June 30, 2023' }
    ]
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
        <div className="symptom-list">
          <h3>Symptoms:</h3>
          {profile.symptoms.map((symptom, index) => (
            <div
              key={index}
              className="symptom"
              onClick={() => handleSymptomClick(symptom)}
            >
              <span>{symptom.name}</span>
              
            </div>
          ))}
        </div>
        <div className="treatment-progress">
          <h3>Treatment Progress</h3>
          {profile.treatmentProgress.map((progress, index) => (
            <a href="#" key={index} className="treatment-box">
              
              <p>{progress.time}</p>
              <p>{progress.date}</p>
            </a>
          ))}
        </div>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>Confirm</button>

      {selectedSymptom && (
      <div>
        <div className="overlay"></div>
        <div className="pop-up">
          {/* Pop-up content */}
          <h3>{selectedSymptom.name}</h3>
          <p>{selectedSymptom.description}</p>
          <button className="close-button" onClick={() => setSelectedSymptom(null)}>
            Close
          </button>
        </div>
      </div>
    )}
    </div>
  );
}

export default ViewTreatmentProfile;
