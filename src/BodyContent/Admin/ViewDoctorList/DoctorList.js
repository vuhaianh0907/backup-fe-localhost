import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Gọi API để lấy danh sách bác sĩ
    axios
      .get('http://localhost:3000/api/account/doctor/alllist')
      .then((response) => {
        setDoctors(response.data.doctors); // Cập nhật danh sách bác sĩ
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Tính chỉ số của bác sĩ đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Chuyển đổi trang
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="doctor-list">
      <h2 className="doctor-list__title">Danh sách bác sĩ</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="doctor-list__items">
            {currentDoctors.map((doctor) => (
              <li key={doctor.id} className="doctor-item">
                <div className="doctor-item__avatar">
                  <img src={doctor.avatar} alt="Doctor Avatar" />
                </div>
                <div className="doctor-item__details">
                  <p className="doctor-item__name">{doctor.fullname}</p>
                  <p className="doctor-item__specialization">{doctor.qualification}</p>
                </div>
                <Link to={`/admin/doctordetail/${doctor.id}`} className="view-details-link">
                  Xem thông tin
                </Link>
              </li>
            ))}
          </ul>
          {/* Hiển thị thanh phân trang */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorList;
