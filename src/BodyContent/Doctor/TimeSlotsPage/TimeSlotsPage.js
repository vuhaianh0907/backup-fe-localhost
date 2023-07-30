import React, { useEffect, useState } from 'react';
import './TimeSlotsPage.scss';

const TimeSlotsPage = () => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow.toISOString().slice(0, 10));
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState('');
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchTimeSlots = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchTimeSlots();
  }, []);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const renderTimeSlots = () => {
    const timeSlots = [
      '7:00 AM - 8:00 AM',
      '8:00 AM - 9:00 AM',
      '9:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 PM - 1:00 PM',
      '1:00 PM - 2:00 PM',
      '2:00 PM - 3:00 PM',
      '3:00 PM - 4:00 PM',
      '4:00 PM - 5:00 PM',
    ];

    return timeSlots.map((slot, index) => (
      <button
        key={index}
        className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
        onClick={() => handleSlotClick(slot)}
      >
        {slot}
      </button>
    ));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="time-slots-page">
      <h2 className="title">Chọn ngày</h2>
      <div className="date-picker">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <h2 className="date">Ngày: {selectedDate}</h2>
      <div className="time-slots">
        {renderTimeSlots()}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Phiếu khám</h2>
            <div className="patient-info">
              <p>Tên bệnh nhân: Nguyễn Văn A</p>
              <p>Ngày khám: {selectedDate}</p>
              <p>Giờ khám: {selectedSlot}</p>
            </div>
            <div className="form-group">
              <label htmlFor="reason">Lí do khám:</label>
              <input
                type="text"
                id="reason"
                value={reason}
                onChange={handleReasonChange}
                className="form-control"
              />
            </div>
            <div className="popup-buttons">
              <button className="btn btn-primary" onClick={handlePopupClose}>Xác nhận</button>
              <button className="btn btn-secondary" onClick={handlePopupClose}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotsPage;
