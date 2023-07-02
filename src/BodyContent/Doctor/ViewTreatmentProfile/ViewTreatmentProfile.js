import React, { useState } from 'react';
import './ViewTreatmentProfile.css'; // Import the CSS file for styling

function ViewTreatmentProfile() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [symptomPage, setSymptomPage] = useState(1);
  const [progressPage, setProgressPage] = useState(1);
  const symptomsPerPage = 4; // Số lượng symptoms hiển thị trên mỗi trang
  const progressPerPage = 3; // Số lượng treatment progress hiển thị trên mỗi trang

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
      { name: 'Cough', description: 'Expelling air from the lungs' },
      { name: 'Fatigue', description: 'Extreme tiredness' },
      { name: 'Sore throat', description: 'Pain or irritation in the throat' },
      { name: 'Nausea', description: 'Feeling of sickness or discomfort in the stomach' },
    ],
    treatmentProgress: [
      { time: '10:00 AM', date: 'June 28, 2023' },
      { time: '11:30 AM', date: 'June 29, 2023' },
      { time: '09:45 AM', date: 'June 30, 2023' },
      { time: '02:15 PM', date: 'July 1, 2023' },
      { time: '08:30 AM', date: 'July 2, 2023' },
    ],
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    alert('Profile confirmed');
  };

  // Tính số trang của symptoms
  const symptomTotalPages = Math.ceil(profile.symptoms.length / symptomsPerPage);

  // Lấy danh sách symptoms hiện tại trên trang hiển thị
  const currentSymptoms = profile.symptoms.slice(
    (symptomPage - 1) * symptomsPerPage,
    symptomPage * symptomsPerPage
  );

  // Chuyển đến trang đầu tiên của symptoms
  const firstSymptomPage = () => {
    setSymptomPage(1);
  };

  // Chuyển đến trang trước của symptoms
  const prevSymptomPage = () => {
    setSymptomPage((prevPage) => prevPage - 1);
  };

  // Chuyển đến trang sau của symptoms
  const nextSymptomPage = () => {
    setSymptomPage((prevPage) => prevPage + 1);
  };

  // Chuyển đến trang cuối cùng của symptoms
  const lastSymptomPage = () => {
    setSymptomPage(symptomTotalPages);
  };

  // Tính số trang của treatment progress
  const progressTotalPages = Math.ceil(
    profile.treatmentProgress.length / progressPerPage
  );

  // Lấy danh sách treatment progress hiện tại trên trang hiển thị
  const currentProgress = profile.treatmentProgress.slice(
    (progressPage - 1) * progressPerPage,
    progressPage * progressPerPage
  );

  // Chuyển đến trang đầu tiên của treatment progress
  const firstProgressPage = () => {
    setProgressPage(1);
  };

  // Chuyển đến trang trước của treatment progress
  const prevProgressPage = () => {
    setProgressPage((prevPage) => prevPage - 1);
  };

  // Chuyển đến trang sau của treatment progress
  const nextProgressPage = () => {
    setProgressPage((prevPage) => prevPage + 1);
  };

  // Chuyển đến trang cuối cùng của treatment progress
  const lastProgressPage = () => {
    setProgressPage(progressTotalPages);
  };

  return (
    <div className="profile-container">
      <h2>View Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>ID:</strong> {profile.id}
        </p>
        <p>
          <strong>Gender:</strong> {profile.gender}
        </p>
        <p>
          <strong>Doctor Name:</strong> {profile.doctorName}
        </p>
        <p>
          <strong>Treatment Date:</strong> {profile.treatmentDate}
        </p>
        <div className="symptom-list">
          <h3>Symptoms:</h3>
          {currentSymptoms.map((symptom, index) => (
            <div
              key={index}
              className="symptom"
              onClick={() => handleSymptomClick(symptom)}
            >
              <span>{symptom.name}</span>
            </div>
          ))}
          <div className="pagination">
            <button disabled={symptomPage === 1} onClick={firstSymptomPage}>
              First
            </button>
            <button disabled={symptomPage === 1} onClick={prevSymptomPage}>
              Prev
            </button>
            <span>
              Page {symptomPage} of {symptomTotalPages}
            </span>
            <button
              disabled={symptomPage === symptomTotalPages}
              onClick={nextSymptomPage}
            >
              Next
            </button>
            <button
              disabled={symptomPage === symptomTotalPages}
              onClick={lastSymptomPage}
            >
              Last
            </button>
          </div>
        </div>
        <div className="treatment-progress">
          <h3>Treatment Progress</h3>
          {currentProgress.map((progress, index) => (
            <a href="#" key={index} className="treatment-box">
              <p>{progress.time}</p>
              <p>{progress.date}</p>
            </a>
          ))}
          <div className="pagination">
            <button disabled={progressPage === 1} onClick={firstProgressPage}>
              First
            </button>
            <button disabled={progressPage === 1} onClick={prevProgressPage}>
              Prev
            </button>
            <span>
              Page {progressPage} of {progressTotalPages}
            </span>
            <button
              disabled={progressPage === progressTotalPages}
              onClick={nextProgressPage}
            >
              Next
            </button>
            <button
              disabled={progressPage === progressTotalPages}
              onClick={lastProgressPage}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>

      {selectedSymptom && (
        <div>
          <div className="overlay"></div>
          <div className="pop-up">
            {/* Pop-up content */}
            <h3>{selectedSymptom.name}</h3>
            <p>{selectedSymptom.description}</p>
            <button className="close-button" onClick={handleClosePopUp}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTreatmentProfile;
