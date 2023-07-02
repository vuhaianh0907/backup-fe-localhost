import React from 'react';
import './ViewTreatmentIn.css'; // Import the CSS file for styling

function ViewTreatmentIn() {
  const treatmentProgress = [
    {
      profileName: 'John Doe',
      time: '10:00 AM',
      progress: 'In progress',
      result: 'N/A',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id gravida elit.',
    },
    {
      profileName: 'John Doe',
      time: '11:30 AM',
      progress: 'In progress',
      result: 'N/A',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id gravida elit.',
    },
    {
      profileName: 'John Doe',
      time: '09:45 AM',
      progress: 'In progress',
      result: 'N/A',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id gravida elit.',
    },
  ];

  return (
    <div className="treatment-container">
      <h2>View Treatment In</h2>
      {treatmentProgress.map((progress, index) => (
        <div key={index} className="progress-box" onClick={() => alert(`Clicked Treatment Progress ${index + 1}`)}>
          <p><strong>Profile Name:</strong> {progress.profileName}</p>
          <p><strong>Treatment Time:</strong> {progress.time}</p>
          <p><strong>Treatment Progress:</strong> {progress.progress}</p>
          <p><strong>Result:</strong> {progress.result}</p>
          <p><strong>Note:</strong> {progress.note}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewTreatmentIn;
