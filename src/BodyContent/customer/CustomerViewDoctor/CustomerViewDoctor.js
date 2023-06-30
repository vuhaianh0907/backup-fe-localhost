import React, { useState } from 'react';
import './CustomerViewDoctor.css';

function CustomerViewDoctor() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Bác sĩ A',
      generalInfo: 'Thông tin chung về bác sĩ A',
      location: 'Địa chỉ A',
    },
    {
      id: 2,
      name: 'Bác sĩ B',
      generalInfo: 'Thông tin chung về bác sĩ B',
      location: 'Địa chỉ B',
    },
    {
      id: 3,
      name: 'Bác sĩ C',
      generalInfo: 'Thông tin chung về bác sĩ C',
      location: 'Địa chỉ C',
    },
  ]);

  const [selectedTime, setSelectedTime] = useState('');

  const filteredDoctors = doctors.filter((doctor) => {
    if (!selectedTime) {
      return true;
    }
    // Update the condition based on your actual data
    return selectedTime === 'morning' ? doctor.id % 2 === 0 : doctor.id % 2 !== 0;
  });

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="customer-view-doctor">
      <div className="time-selection">
        <h2>Chọn thời gian trong ngày</h2>
        <div className="time-options">
          <button
            className={`time-option ${selectedTime === 'morning' ? 'active' : ''}`}
            onClick={() => handleTimeChange('morning')}
          >
            Buổi sáng
          </button>
          <button
            className={`time-option ${selectedTime === 'afternoon' ? 'active' : ''}`}
            onClick={() => handleTimeChange('afternoon')}
          >
            Buổi chiều
          </button>
        </div>
      </div>
      <div className="doctor-list">
        <h2>Danh sách bác sĩ</h2>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div className="doctor-item" key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p>{doctor.generalInfo}</p>
              <p>Địa chỉ: {doctor.location}</p>
            </div>
          ))
        ) : (
          <p>Không có bác sĩ phù hợp.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerViewDoctor;
