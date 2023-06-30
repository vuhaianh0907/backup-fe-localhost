import React from 'react';
import './ViewBookingDetail.css';

function ViewBookingDetail({ booking, onClose }) {
  // Xử lý sự kiện xác nhận booking
  const handleConfirmBooking = () => {
    console.log('Xác nhận đặt lịch');
  };

  // Xử lý sự kiện hủy booking
  const handleCancelBooking = () => {
    console.log('Hủy đặt lịch');
  };

  return (
    <div className="booking-popup-overlay">
      <div className="booking-popup">
        <h2 className="popup-heading">Chi tiết đặt lịch</h2>
        <div className="booking-details">
          <div className="booking-info">
            <span className="label">Tên:</span>
            <span>{booking.name}</span>
          </div>
          <div className="booking-info">
            <span className="label">Ngày điều trị:</span>
            <span>{booking.treatmentDate}</span>
          </div>
          <div className="booking-info">
            <span className="label">Loại điều trị:</span>
            <span>{booking.treatmentType}</span>
          </div>
          <div className="booking-info">
            <span className="label">Thời gian:</span>
            <span>{booking.time}</span>
          </div>
          <div className="booking-info">
            <span className="label">Mô tả:</span>
            <span>{booking.description}</span>
          </div>
          <div className="booking-info">
            <span className="label">Trạng thái:</span>
            <span>{booking.status}</span>
          </div>
          <div className="booking-info">
            <span className="label">Tên bác sĩ:</span>
            <span>{booking.doctorName}</span>
          </div>
          <div className="booking-actions">
            <button className="confirm-booking-button" onClick={handleConfirmBooking}>
              Xác nhận
            </button>
            <button className="cancel-booking-button" onClick={handleCancelBooking}>
              Hủy đặt lịch
            </button>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default ViewBookingDetail;
