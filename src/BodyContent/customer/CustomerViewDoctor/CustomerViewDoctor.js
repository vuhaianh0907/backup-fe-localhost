import React, { useState, useEffect } from 'react';
import './CustomerViewDoctor.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const timeOptions = [
  { label: '8h - 9h' },
  { label: '9h - 10h' },
  { label: '10h - 11h' },
  { label: '13h - 14h' },
  { label: '14h - 15h' },
  { label: '15h - 16h' },
];

function CustomerViewDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmationEnabled, setIsConfirmationEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3);

  useEffect(() => {
    // Set selectedDate to today's date by default
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate()
    ).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    setIsConfirmationEnabled(selectedTime !== '');
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setIsConfirmationEnabled(selectedDate !== '');
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

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(doctors.length / perPage);

  return (
    <div id="CustomerViewDoctor" className="customer-view-doctor">
      <div className="time-selection">
        <h2>Chọn thời gian trong ngày</h2>
        <div className="date-input">
          <label htmlFor="date">Ngày:</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
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


      {doctors.length > 0 && (
        <div className="doctor-list">
          <h3>Danh sách bác sĩ:</h3>
          <ul className="doctor-list__container">
            {doctors.slice(startIndex, endIndex).map((doctor) => (
              <li key={doctor.id} className="doctor-item">
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

          {/* Pagination */}
          <div className="pagination">
            <button
              id="paging-btn"
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <button id="paging-btn">
              <span>{currentPage}</span>
            </button>
            <button
              id="paging-btn"
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerViewDoctor;
