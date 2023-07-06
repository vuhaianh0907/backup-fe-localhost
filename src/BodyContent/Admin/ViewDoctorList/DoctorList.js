import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách bác sĩ
    axios
      .get('http://localhost:3000/api/account/doctor/index')
      .then((response) => {
        setDoctors(response.data.doctors); // Cập nhật danh sách bác sĩ
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
  }, []);

  const handleViewDetails = (doctor) => {
    
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
              <p className="doctor-item__name">{doctor.fullname}</p>
              <p className="doctor-item__specialization">{doctor.qualification}</p>
            </div>
            <Link
              to={`/admin/doctordetail/${doctor.id}`}
              className="view-details-link"
              onClick={() => handleViewDetails(doctor)}
            >
              Xem thông tin
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
