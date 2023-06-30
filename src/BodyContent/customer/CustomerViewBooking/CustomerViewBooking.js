import React, { useState } from 'react';
import './CustomerViewBooking.css';
import ViewBookingDetail from '../ViewBookingDetail/ViewBookingDetail';

function CustomerViewBooking() {
  // Sử dụng useState để lưu trữ danh sách booking
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: 'Booking 1',
      treatmentDate: '2023-06-28',
      status: 'Confirmed',
    },
    {
      id: 2,
      name: 'Booking 2',
      treatmentDate: '2023-06-29',
      status: 'Pending',
    },
    // Thêm các đối tượng booking khác ở đây
  ]);

  // Sử dụng useState để lưu trữ booking được chọn
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Xử lý sự kiện xem chi tiết booking
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  // Xử lý sự kiện đóng chi tiết booking
  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="customer-view-booking">
      <h2>Danh sách đặt lịch</h2>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div className="booking-form" key={booking.id}>
            <div className="booking-info">
              <span className="label">Tên liệu trình:</span>
              <span>{booking.name}</span>
            </div>
            <div className="booking-info">
              <span className="label">Ngày điều trị:</span>
              <span>{booking.treatmentDate}</span>
            </div>
            <div className="booking-info">
              <span className="label">Trạng thái:</span>
              <span>{booking.status}</span>
            </div>
            <div className="booking-actions">
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(booking)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Hiển thị chi tiết booking nếu booking được chọn */}
      {selectedBooking && (
        <ViewBookingDetail booking={selectedBooking} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default CustomerViewBooking;
