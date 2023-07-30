import React, { useState, useEffect } from 'react';
import axios from "configs/axios";
import { useParams, Link } from 'react-router-dom';
import './DoctorDetail.scss';

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'admin') {
        window.location.href = '/';
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const doctorPromise = axios.get(`account/doctor/details?id=${doctorId}`);
        const slotsPromise = axios.get(`slot/getSlotbyDoctor?doctorId=${doctorId}`);

        const [doctorResponse, slotsResponse] = await Promise.all([doctorPromise, slotsPromise]);

        const doctorData = doctorResponse.data.doctor;
        const slotsData = slotsResponse.data.slots;

        setDoctorInfo(doctorData);
        setSlots(slotsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleEditInfo = () => {
    console.log('Chỉnh sửa thông tin bác sĩ');
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSlotClick = (slotTime) => {
    console.log('Selected slot time:', slotTime);
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredSlots = selectedDate ? slots.filter((slot) => slot.date === selectedDate) : slots;

  return (
    <div id="DoctorDetail" className="doctor-detail">
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="info-container row">
          <div className='col-4 avatar'>
            <img src={doctorInfo.avatar} className="doctor-avatar" />
          </div>
          <div className='col-8'>
            <div className="doctor-name">{doctorInfo.fullname}</div>
            <div className="doctor-info">
              <span className="info-label">ID Bác Sĩ:</span>
              <span>{doctorInfo.idCard}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Giới Tính:</span>
              <span>{doctorInfo.gender}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Ngày Sinh:</span>
              <span>{doctorInfo.dateOfBirth}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Số điện thoại:</span>
              <span>{doctorInfo.phone}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Email:</span>
              <span>{doctorInfo.email}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Địa Chỉ:</span>
              <span>{doctorInfo.address}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Bằng Cấp:</span>
              <span>{doctorInfo.qualification}</span>
            </div>
            <div className="doctor-info">
              <span className="info-label">Kinh Nghiệm:</span>
              <span>{doctorInfo.experience}</span>
            </div>

            <div className="filter-container">
              <label for="date" class="col-form-label">Chọn ngày: </label>
              <div class="d-inline-block col-5">
                <div class="input-group date" id="datepicker">
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    min={getMinDate()} 
                    value={selectedDate}
                    onChange={handleDateChange} />
                </div>
              </div>
            </div>

            <div className="slots-container">
              <h3>Slots:</h3>
              {filteredSlots.length > 0 ? (
                filteredSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button" class="btslot btn btn-primary"
                    onClick={() => handleSlotClick(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))
              ) : (
                <div>No slots available</div>
              )}
            </div>         
            <div className="edit-button-container">
              <Link to={`/admin/doctor/addslot/${doctorId}`} type="button" class="btn btn-primary mb-3">
                Thêm lịch làm việc 
              </Link>
              <br/>
              <Link to={`/admin/doctor/update/${doctorId}`} type="button" class="btn btn-secondary">
                Chỉnh sửa thông tin
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetail;
