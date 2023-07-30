import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import './ViewDocDetail.scss';
import axios from "configs/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

export default function ViewDocDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  }, [user]);

  useEffect(() => {
    // Send GET request to fetch doctor details
    axios
      .get(`account/doctor/details?id=${id}`)
      .then((response) => {
        // Handle the response from the API
        setDoctor(response.data.doctor);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('API Error:', error);
        setIsLoading(false);
      });

    // Send GET request to fetch slots for the doctor
    axios
      .get(`slot/getSlotbyDoctor?doctorId=${id}`)
      .then((response) => {
        // Handle the response from the API
        const filteredSlots = response.data.slots.filter((slot) => slot.status === 'available');
        setSlots(filteredSlots);
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('API Error:', error);
      });
  }, [id]);

  useEffect(() => {
    const dateQuery = searchParams.get("date");
    setSelectedDate((dateQuery ? new Date(dateQuery) : new Date()).toISOString().split('T')[0]);
  }, []);

  const handleDateChange = (event) => {
    const selectedDateValue = event.target.value;
    const currentDate = new Date().toISOString().split('T')[0];

    if (selectedDateValue >= currentDate) {
      setSelectedDate(selectedDateValue);
    } else {
      console.log("Không thể chọn lịch quá khứ");
    }
  };

  const handleSlotClick = (slotId) => {
    // Xử lý khi người dùng nhấp vào lịch hẹn
    console.log("Selected slot:", slotId);
  };
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredSlots = selectedDate
    ? slots.filter((slot) => slot.date === selectedDate)
    : slots;

  return (
    <div id="ViewDocDetail">
      <div id="ViewDocDetail" className="viewdocdt">
        <div className='viewdocdt2'>
          {isLoading ? (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {doctor ? (

                <div className="col-5">
                  <center><img src={doctor.avatar} alt="Doctor Profile" className="profile-picture" /></center>
                  <h2 className="doctor-name">{doctor.fullname}</h2>
                  <div className="doctor-information">
                    <div className="info-item">
                      <h4>Chứng chỉ:</h4>
                      <p>{doctor.qualification}</p>
                    </div>
                    <div className="info-item">
                      <h4>Kinh nghiệm:</h4>
                      <p>{doctor.experience}</p>
                    </div>
                  </div>
                </div>

              ) : (
                <p>Loading...</p>
              )}

              <div className="col-7">
                <label htmlFor="date" className="col-form-label">Chọn ngày: </label>
                <div className="col-5">
                  <div className="input-group date" id="datepicker">
                    <input type="date" className="form-control" id="date" value={selectedDate} onChange={handleDateChange} min={getMinDate()} />
                  </div>
                </div>

                <h3>Các lịch hẹn của bác sĩ</h3>
                <div className='row'>
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                      <Link className='col-3 mb-2' to={`/customer/slot/appointment/${slot.id}`} key={slot.id}>
                        <button className="mx-0 my-0 btn btn-primary w-100" onClick={() => handleSlotClick(slot.id)}>
                          {slot.time}
                        </button>
                      </Link>
                    ))
                  ) : (
                    <p>Không có lịch hẹn khả dụng</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
