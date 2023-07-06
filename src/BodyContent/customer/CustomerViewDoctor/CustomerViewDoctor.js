import React, { useState } from 'react';
import './CustomerViewDoctor.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const timeOptions = [
  { label: '8h - 9h' },
  { label: '9h - 10h' },
  { label: '10h - 11h' },
  { label: '13h - 14h' },
  { label: '15h - 16h' }
];

function CustomerViewDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmationEnabled, setIsConfirmationEnabled] = useState(false);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(selectedDate);
    setIsConfirmationEnabled(formattedDate !== '' && selectedTime !== '');
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setIsConfirmationEnabled(selectedDate !== '' && time !== '');
  };

  const handleConfirmation = () => {
    if (isConfirmationEnabled) {
      // Send POST request to the API
      axios
        .post('http://localhost:3000/api/slot/getDoctorByTime', {
          selectedDate,
          selectedTime,
        })
        .then((response) => {
          // Handle the response from the API
          setDoctors(response.data.doctors);
        })
        .catch((error) => {
          // Handle any error that occurs during the request
          console.error('API Error:', error);
        });
    }
  };

  return (
    <div className="customer-view-doctor">
      <div className="time-selection">
        <h2>Chọn thời gian trong ngày</h2>
        <div className="date-input">
          <label htmlFor="date">Ngày:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="time-options">
          {timeOptions.map((option) => (
            <button
              key={option.label}
              className={`time-option${selectedTime === option.label ? ' active' : ''}`}
              onClick={() => handleTimeSelection(option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          className="confirmation-button"
          disabled={!isConfirmationEnabled}
          onClick={handleConfirmation}
        >
          Xác nhận
        </button>
      </div>

      <div className="doctor-list">
        <h3>Danh sách bác sĩ:</h3>
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <div className="doctor-info">
                <div className="doctor-item__avatar">
                  <img src={doctor.avatar} alt="Doctor Avatar" />
                </div>
                <div className="doctor-name">{doctor.fullname}</div>
                <div className="doctor-action">
                  <Link to={`/customer/doctordetail/${doctor.id}`} className="doctor-link">
                    Chọn bác sĩ
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomerViewDoctor;
