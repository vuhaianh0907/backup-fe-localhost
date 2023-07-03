import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DoctorDetail.css';

const DoctorDetail = () => {
  const { doctorId } = useParams(); // Truy cập vào doctorId từ URL parameter

  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    // Gửi yêu cầu GET tới API để lấy thông tin chi tiết của bác sĩ
    axios
      .get(`http://localhost:3000/api/admin/getDoctor?doctorId=${doctorId}`)
      .then((response) => {
        setDoctorInfo(response.data.doctor); // Cập nhật thông tin chi tiết của bác sĩ
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
  }, [doctorId]);

  const handleEditInfo = () => {
    // Thực hiện các thao tác cần thiết khi click vào nút chỉnh sửa
    console.log('Chỉnh sửa thông tin bác sĩ');
  };

  // Kiểm tra xem dữ liệu có được tải lên từ server hay chưa
  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-detail">
      <div className="avatar-container">
        <img src={doctorInfo.avatar} alt="Doctor Avatar" className="doctor-avatar" />
      </div>
      <div className="info-container">
        <div className="doctor-name">{doctorInfo.fullname}</div>
        <div className="doctor-info">
          <span className="info-label">ID Card:</span>
          <span>{doctorInfo.idCard}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Gender:</span>
          <span>{doctorInfo.gender}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Date of Birth:</span>
          <span>{doctorInfo.dateOfBirth}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Phone Number:</span>
          <span>{doctorInfo.phone}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Email:</span>
          <span>{doctorInfo.email}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Address:</span>
          <span>{doctorInfo.address}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">qualification:</span>
          <span>{doctorInfo.qualification}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Experience:</span>
          <span>{doctorInfo.experience}</span>
        </div>
        <div className="workday-container">
          <span className="workday-label">Workday:</span>
          <input
            type="date"
            value={doctorInfo.workday}
            onChange={(e) => {
              // Cập nhật workday của bác sĩ
              setDoctorInfo({ ...doctorInfo, workday: e.target.value });
            }}
            className="workday-input"
          />
        </div>
        <div className="edit-button-container">
          <button className="edit-button" onClick={handleEditInfo}>
            Edit Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
