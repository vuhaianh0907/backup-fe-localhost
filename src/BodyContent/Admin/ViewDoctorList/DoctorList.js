import React from 'react';
import './DoctorList.css';

const DoctorList = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Emily Nguyen',
      avatar: 'https://via.placeholder.com/150',
      specialization: 'General Medicine',
    },
    {
      id: 2,
      name: 'Dr. John Smith',
      avatar: 'https://via.placeholder.com/150',
      specialization: 'Dentistry',
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      avatar: 'https://via.placeholder.com/150',
      specialization: 'Pediatrics',
    },
  ];

  const handleViewDetails = (doctor) => {
    console.log('View details of:', doctor);
    // Thực hiện hành động khi nhấp vào nút "Xem thông tin"
  };

  return (
    <div className="doctor-list">
      <h2 className="doctor-list__title">Danh sách bác sĩ</h2>
      <ul className="doctor-list__items">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="doctor-item">
            <div className="doctor-item__avatar">
              <img src={doctor.avatar} alt="Doctor Avatar" />
            </div>
            <div className="doctor-item__details">
              <p className="doctor-item__name">{doctor.name}</p>
              <p className="doctor-item__specialization">{doctor.specialization}</p>
            </div>
            <button
              className="view-details-button"
              onClick={() => handleViewDetails(doctor)}
            >
              Xem thông tin
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
