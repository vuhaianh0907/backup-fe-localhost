import React, { useState } from 'react';
import Pagination from './Pagination';

import './ViewTreatmentProfile.css'; // Import the CSS file for styling

function ViewTreatmentProfile() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedProgress, setSelectedProgress] = useState(null);

  //test phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  const data = [
    // Sample data array
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
    { id: 13, name: 'Item 13' },
    { id: 14, name: 'Item 14' },
    { id: 15, name: 'Item 15' },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate pagination values
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);


  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);
  };
  const handleProgressClick = (progress) => {
    setSelectedProgress(progress);
  };

  const handleClosePopUp = () => {
    setSelectedSymptom(null);
  };

  const handleCloseProgressPopUp = () => {
    setSelectedProgress(null);
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
      {
        time: '10:00 AM',
        date: 'June 28, 2023',
        process: 'Bệnh nhân bị ngố, ánh mắt thất thần, đôi bàn tay run rẩy',
        result: 'Hết cứu',
        note: 'Em đi lộn bệnh viện rồi.'
      },
      {
        time: '11:30 AM',
        date: 'June 29, 2023',
        process: 'Xue hue piao',
        result: 'Xém đi',
        note: 'Tha tao'
      },
      {
        time: '09:45 AM',
        date: 'June 30, 2023',
        process: 'Bệnh nhân trở nặng',
        result: 'Tái khám',
        note: 'Additional note for the treatment progress'
      }
    ]
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    alert('Profile confirmed');
  };

  return (
    <div className="profile-container">
      <h2>Khám Răng</h2>
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
            <div
              key={index}
              className="treatment-box"
              onClick={() => handleProgressClick(progress)}
            >
              <p>{progress.time}</p>
              <p>{progress.date}</p>
              {/* <p>Result: {progress.result}</p>
              <p>Note: {progress.note}</p> */}
            </div>
          ))}

        </div>
        {/* phân trang động */}
        {/* Pagination component */}
        {/* <h1>Pagination Example</h1>

        <ul>
          {currentItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul> */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
        />
        <div>

        </div>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>Write Treatment In</button>

      {selectedSymptom && (
        <div className="overlay">
          <div className="pop-up">
            <h3>{selectedSymptom.name}</h3>
            <p>{selectedSymptom.description}</p>
            <button className="close-button" onClick={handleClosePopUp}>
              Close
            </button>
          </div>
        </div>
      )}
      {selectedProgress && (
        <div className="overlay">
          <div className="pop-up">
            <h2>Khám răng</h2>
            <p><strong>Ngày khám:</strong>{selectedProgress.date}</p>
            <p><strong>Ca khám:</strong>{selectedProgress.time}</p>
            <p><strong>Quá trình điều trị:</strong>{selectedProgress.process}</p>
            <p><strong>Kết quả:</strong>{selectedProgress.result}</p>
            <p><strong>Ghi chú:</strong>{selectedProgress.note}</p>
            <button className="close-button" onClick={handleCloseProgressPopUp}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTreatmentProfile;
