import React, { useState, useEffect } from 'react';
import './CustomerViewDoctor.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

import doctorNoImage from '../../../assets/images/doctor-no-image.jpg';

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
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Add the isFirstLoad state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  })

  useEffect(() => {
    // Set selectedDate to tomorrow's date by default
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(
      tomorrow.getDate()
    ).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
  }, []);

  useEffect(() => {
    // Fetch doctors when the selectedDate or selectedTime changes
    if (selectedDate && selectedTime) {
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
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    // Auto-select the first time slot on initial load
    if (isFirstLoad && timeOptions.length > 0) {
      setSelectedTime(timeOptions[0].label);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, timeOptions]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại

    // Nếu ngày đã chọn lớn hơn ngày hiện tại, thì mới cập nhật selectedDate
    if (selectedDate > today) {
      setSelectedDate(selectedDate);
    }
  };
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  


  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(doctors.length / perPage);

  return (
    <div id="CustomerViewDoctor" className="customer-view-doctor">
      <div className='container'>
        <div className="customer-view-doctor2">
          <div className="time-selection">
            <h2>Chọn thời gian trong ngày</h2>
            <div className="date-input">
              <label htmlFor="date">Ngày:</label>
              <div className="date-input">
                <label htmlFor="date">Ngày:</label>
                <input type="date" id="date" class="form-control" value={selectedDate} onChange={handleDateChange} min={getMinDate()} />

              </div>


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
          </div>

          {doctors.length > 0 && (
            <div className="doctor-list">
              <h3 className='mb-2'>Danh sách bác sĩ:</h3>
              {/* <ul className="doctor-list__container">
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
              </ul> */}

              <div className='row'>
                {doctors.slice(startIndex, endIndex).map((doctor) => (
                  <div className="col-4 mb-3" key={doctor.id}>
                    <div className="card">
                      <img height="250" src={doctor.avatar ? doctor.avatar : doctorNoImage} alt="Doctor Avatar" className="card-img-top card-avatar" />
                      <div className="card-body">
                        <h5 className="card-title">{doctor.fullname}</h5>
                        <p class="card-text text-limit-1-lines">{doctor.experience}</p>
                        <Link to={`/customer/doctordetail/${doctor.id}?date=${selectedDate}`} className="btn btn-primary">
                          Chọn bác sĩ
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
      </div>
    </div>
  );
}

export default CustomerViewDoctor;
