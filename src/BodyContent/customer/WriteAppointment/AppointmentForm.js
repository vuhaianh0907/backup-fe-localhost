import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = () => {
  const [reason, setReason] = useState('');
  const doctorName = 'Dr. Emily Nguyen';
  const appointmentTime = '09:00 AM';
  const appointmentDate = '2023-06-30';
  const avatarUrl = 'https://via.placeholder.com/150'; // Thay bằng URL ảnh ngẫu nhiên từ internet

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện xử lý submit form
    console.log('Đã submit form');
    console.log('Lí do khám:', reason);
  };

  return (
    <div id='AppointmentForm ' className="appointment-form">
      <h2 className="appointment-form__title">Đặt phiếu khám bệnh</h2>
      <div className="doctor-info">
        <img src={avatarUrl} alt="Doctor Avatar" className="doctor-avatar" />
        <div className="doctor-details">
          <p className="doctor-name">{doctorName}</p>
          <p className="appointment-time">Thời gian: {appointmentTime}</p>
          <p className="appointment-date">Ngày khám: {appointmentDate}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Lí do khám:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="reason-input"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Đặt phiếu khám</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
