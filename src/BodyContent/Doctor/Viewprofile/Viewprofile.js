import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './DoctorViewProfile.scss';
import axios from "configs/axios";

const DoctorViewProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'doctor') {
        window.location.href = '/';
      }
    }
  });

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorPromise = await axios.get(`account/doctor/details?id=${id}`);
        const slotsPromise = axios.get(`slot/getSlotbyDoctor?doctorId=${id}`);
        const [doctorResponse, slotsResponse] = await Promise.all([doctorPromise, slotsPromise]);
        const doctorData = doctorResponse.data.doctor;
        const slotsData = slotsResponse.data.slots;
        setDoctorInfo(doctorData);
        setSlots(slotsData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching doctor info:', error);
        setIsLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [id]);

  useEffect(() => {
    // Tính toán ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Định dạng ngày thành chuỗi yyyy-MM-dd
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    // Đặt giá trị mặc định cho selectedDate
    setSelectedDate(tomorrowFormatted);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      // Hiển thị popup và lưu slot đã chọn
      setShowPopup(true);
      setSelectedSlot(slot);
    }
  };

  const handlePopupClose = () => {
    // Đóng popup và xóa slot đã chọn
    setShowPopup(false);
    setSelectedSlot(null);
  };

  const handleConfirmClick = async () => {
    try {
      // Gửi yêu cầu API để cập nhật trạng thái slot
      const response = await axios.post(`slot/updateStatus`, {
        slotId: selectedSlot.id,
        status: 'closed',
      });
      console.log('Slot updated successfully:', response.data);

      // Đóng popup và làm mới danh sách slot
      setShowPopup(false);
      setSelectedSlot(null);
      fetchSlots();
    } catch (error) {
      console.log('Error updating slot:', error);
    }
  };

  const fetchSlots = async () => {
    try {
      const slotsPromise = axios.get(`slot/getSlotbyDoctor?doctorId=${id}`);
      const slotsResponse = await slotsPromise;
      const slotsData = slotsResponse.data.slots;
      setSlots(slotsData);
    } catch (error) {
      console.log('Error fetching slots:', error);
    }
  };

  const filteredSlots = selectedDate ? slots.filter((slot) => slot.date === selectedDate) : slots;

  const handleUpdateProfileClick = () => {
    navigate(`/doctor/updateprofile/${id}`); // Chuyển hướng đến trang chỉnh sửa
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="doctorViewProfile" className="doctor-detail">
      <div className='doctorbrc'>
        <div className="avatar-container">
          <img src="https://via.placeholder.com/150" alt="Doctor Avatar" className="doctor-avatar" />
        </div>
        <div className="info-container">
          <div className="doctor-name">{doctorInfo.fullname}</div>
          <div className="doctor-info">
            <span className="info-label">Chứng minh nhân dân: </span>
            <span>{doctorInfo.idCard}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Giới tính: </span>
            <span>{doctorInfo.gender}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Ngày sinh: </span>
            <span>{doctorInfo.dateOfBirth}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Số điện thoại: </span>
            <span>{doctorInfo.phone}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Email: </span>
            <span>{doctorInfo.email}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Địa chỉ: </span>
            <span>{doctorInfo.address}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Trình độ chuyên môn: </span>
            <span>{doctorInfo.qualification}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Kinh nghiệm: </span>
            <span>{doctorInfo.experience}</span>
          </div>
          <div className="filter-container">
            <label htmlFor="dateFilter">Chọn ngày: </label>
            <input type="date" id="dateFilter" value={selectedDate} onChange={handleDateChange} />
          </div>

          <div className="slots-container m-3">
            <h3>Slots:</h3>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <button
                  key={slot.id}
                  className={`slot-button ${slot.status === 'available' ? 'green' : 'gray'}`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <div>Không có chỗ trống</div>
            )}
          </div>

          <div className="options-button-container">
            <button className="options-button" onClick={handleUpdateProfileClick}>
              Chỉnh sửa
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Bạn có muốn đóng slot này không?</h3>
              <div className="popup-buttons">
                <button className="popup-button" onClick={handlePopupClose}>
                  Đóng
                </button>
                <button className="popup-button" onClick={handleConfirmClick}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorViewProfile;
