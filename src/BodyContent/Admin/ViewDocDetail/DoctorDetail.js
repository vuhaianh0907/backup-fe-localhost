import React, { useState } from 'react';
import './DoctorDetail.css';

const DoctorDetail = () => {
  // Các thông tin bác sĩ
  const [doctorInfo, setDoctorInfo] = useState({
    fullName: 'Dr. Emily Nguyen',
    idCard: '123456789',
    gender: 'Female',
    dob: '1985-01-01',
    phoneNumber: '0123456789',
    email: 'emily.nguyen@example.com',
    address: '123 Example Street, City',
    diploma: 'Dentist Degree',
    experience: '5 years of experience',
  });

  // Các ca làm việc và ngày làm việc mặc định là ngày mai
  const [workday, setWorkday] = useState({
    day: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    timeSlots: [
      { time: '7-8h', selected: false },
      { time: '8-9h', selected: false },
      { time: '9-10h', selected: false },
      { time: '10-11h', selected: false },
      { time: '14-15h', selected: false },
      { time: '15-16h', selected: false },
      { time: '16-17h', selected: false },
    ],
  });

  // Handler khi click vào nút ca làm việc
  const handleTimeSlotClick = (index) => {
    const updatedTimeSlots = workday.timeSlots.map((slot, i) => {
      return i === index ? { ...slot, selected: !slot.selected } : slot;
    });
    setWorkday({ ...workday, timeSlots: updatedTimeSlots });
  };

  // Handler khi click vào nút chỉnh sửa thông tin
  const handleEditInfo = () => {
    // Thực hiện các thao tác cần thiết khi click vào nút chỉnh sửa
    console.log('Chỉnh sửa thông tin bác sĩ');
  };

  return (
    <div className="doctor-detail">
      <div className="avatar-container">
        <img src="https://via.placeholder.com/150" alt="Doctor Avatar" className="doctor-avatar" />
      </div>
      <div className="info-container">
        <div className="doctor-name">{doctorInfo.fullName}</div>
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
          <span>{doctorInfo.dob}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Phone Number:</span>
          <span>{doctorInfo.phoneNumber}</span>
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
          <span className="info-label">Diploma:</span>
          <span>{doctorInfo.diploma}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Experience:</span>
          <span>{doctorInfo.experience}</span>
        </div>
        <div className="workday-container">
          <span className="workday-label">Workday:</span>
          <input
            type="date"
            value={workday.day}
            onChange={(e) => setWorkday({ ...workday, day: e.target.value })}
            className="workday-input"
          />
        </div>
        <div className="timeslot-container">
          <span className="timeslot-label">Time Slots:</span>
          {workday.timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`timeslot-button ${slot.selected ? 'selected' : ''}`}
              onClick={() => handleTimeSlotClick(index)}
            >
              {slot.time}
            </button>
          ))}
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
