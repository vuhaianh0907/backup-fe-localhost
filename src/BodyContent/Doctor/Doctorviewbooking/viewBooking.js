import React, { useState } from 'react';
import './viewBooking.css';

const ViewBooking = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPageToday, setCurrentPageToday] = useState(1); // Trang hiện tại cho lịch khám hôm nay
  const [currentPageFuture, setCurrentPageFuture] = useState(1); // Trang hiện tại cho lịch khám tương lai
  const bookingsPerPage = 3; // Số phiếu khám hiển thị trên mỗi trang

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const bookingList = [
    {
      id: 1,
      patientName: 'Nguyễn Văn A',
      reason: 'Đau bụng',
      date: currentDate,
      time: '08:00',
      status: 'Đang chờ',
    },
    {
      id: 2,
      patientName: 'Trần Thị B',
      reason: 'Sốt cao',
      date: currentDate,
      time: '09:30',
      status: 'Đang chờ',
    },
    {
      id: 3,
      patientName: 'Lê Văn C',
      reason: 'Đau họng',
      date: currentDate,
      time: '11:15',
      status: 'Đã hủy',
    },
    {
      id: 4,
      patientName: 'Phạm Thị D',
      reason: 'Mất ngủ',
      date: currentDate,
      time: '14:00',
      status: 'Đang chờ',
    },
    {
      id: 5,
      patientName: 'Nguyễn Thanh E',
      reason: 'Đau lưng',
      date: currentDate,
      time: '15:45',
      status: 'Đang chờ',
    },
    {
      id: 6,
      patientName: 'Trần Văn F',
      reason: 'Sổ mũi',
      date: '02/07/2023',
      time: '10:30',
      status: 'Đang chờ',
    },
    {
      id: 7,
      patientName: 'Lê Thị G',
      reason: 'Đau răng',
      date: '02/07/2023',
      time: '12:45',
      status: 'Đang chờ',
    },
    {
      id: 8,
      patientName: 'Nguyễn Văn H',
      reason: 'Sưng nước mắt',
      date: '02/07/2023',
      time: '16:30',
      status: 'Đang chờ',
    },
    {
      id: 9,
      patientName: 'Phạm Thị I',
      reason: 'Đau khớp',
      date: '02/07/2023',
      time: '17:45',
      status: 'Đang chờ',
    },
    {
      id: 10,
      patientName: 'Trần Văn J',
      reason: 'Buồn nôn',
      date: '02/07/2023',
      time: '18:30',
      status: 'Đang chờ',
    },
    {
      id: 11,
      patientName: 'Hoàng Thị K',
      reason: 'Mệt mỏi',
      date: '03/07/2023',
      time: '09:00',
      status: 'Đang chờ',
    },
    {
      id: 12,
      patientName: 'Vũ Văn L',
      reason: 'Chảy máu chân',
      date: '03/07/2023',
      time: '11:30',
      status: 'Đang chờ',
    },
    {
      id: 13,
      patientName: 'Nguyễn Thị M',
      reason: 'Đau đầu',
      date: '03/07/2023',
      time: '13:45',
      status: 'Đang chờ',
    },
    {
      id: 14,
      patientName: 'Trần Văn N',
      reason: 'Sổ mũi',
      date: '03/07/2023',
      time: '16:15',
      status: 'Đang chờ',
    },
    {
      id: 15,
      patientName: 'Lê Thị O',
      reason: 'Mất ngủ',
      date: '03/07/2023',
      time: '18:30',
      status: 'Đang chờ',
    },
    {
      id: 16,
      patientName: 'Nguyễn Văn P',
      reason: 'Đau cổ',
      date: '04/07/2023',
      time: '10:30',
      status: 'Đang chờ',
    },
    {
      id: 17,
      patientName: 'Trần Thị Q',
      reason: 'Đau bụng',
      date: '04/07/2023',
      time: '12:45',
      status: 'Đang chờ',
    },
    {
      id: 18,
      patientName: 'Lê Văn R',
      reason: 'Đau răng',
      date: '04/07/2023',
      time: '15:00',
      status: 'Đang chờ',
    },
    {
      id: 19,
      patientName: 'Phạm Thị S',
      reason: 'Sưng mắt',
      date: '04/07/2023',
      time: '17:15',
      status: 'Đang chờ',
    },
    {
      id: 20,
      patientName: 'Nguyễn Thanh T',
      reason: 'Đau lưng',
      date: '04/07/2023',
      time: '19:30',
      status: 'Đang chờ',
    },
  ];
  

  // Tính toán thông tin phân trang cho lịch khám hôm nay
  const indexOfLastBookingToday = currentPageToday * bookingsPerPage;
  const indexOfFirstBookingToday = indexOfLastBookingToday - bookingsPerPage;
  const todayBookings = bookingList.filter((booking) => booking.date === currentDate);
  const totalTodayPages = Math.ceil(todayBookings.length / bookingsPerPage);
  const displayedTodayBookings = todayBookings.slice(
    indexOfFirstBookingToday,
    indexOfLastBookingToday
  );

  // Tính toán thông tin phân trang cho lịch khám tương lai
  const indexOfLastBookingFuture = currentPageFuture * bookingsPerPage;
  const indexOfFirstBookingFuture = indexOfLastBookingFuture - bookingsPerPage;
  const futureBookings = bookingList.filter((booking) => booking.date > currentDate);
  const totalFuturePages = Math.ceil(futureBookings.length / bookingsPerPage);
  const displayedFutureBookings = futureBookings.slice(
    indexOfFirstBookingFuture,
    indexOfLastBookingFuture
  );

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseProfile = () => {
    setSelectedBooking(null);
  };

  const handleTodayPageChange = (pageNumber) => {
    setCurrentPageToday(pageNumber);
  };

  const handleFuturePageChange = (pageNumber) => {
    setCurrentPageFuture(pageNumber);
  };

  const renderBookingList = (bookings) => {
    return (
      <>
        {bookings.map((booking) => (
          <li className="booking-item" key={booking.id}>
            <button className="booking-button" onClick={() => handleViewBooking(booking)}>
              Xem phiếu khám
            </button>
            <span className="booking-info">Họ tên: {booking.patientName}</span>
            <span className="booking-info">Lí do đến khám: {booking.reason}</span>
            <span className="booking-info">Ngày khám: {booking.date}</span>
            <span className="booking-info">Giờ khám: {booking.time}</span>
            <span className="booking-info">Trạng thái: {booking.status}</span>
            {booking.status === 'Đang chờ' && (
              <button className="cancel-button">Yêu cầu hủy</button>
            )}
          </li>
        ))}
      </>
    );
  };

  const renderPagination = (totalPages, currentPage, onPageChange) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-container">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="view-booking-container">
      <h2 className="booking-heading">Lịch khám hôm nay</h2>
      {displayedTodayBookings.length > 0 ? (
        <>
          <ul className="booking-list">{renderBookingList(displayedTodayBookings)}</ul>
          {totalTodayPages > 1 && renderPagination(totalTodayPages, currentPageToday, handleTodayPageChange)}
        </>
      ) : (
        <p className="no-booking-message">Không có lịch khám hôm nay.</p>
      )}

      <h2 className="booking-heading">Lịch khám tương lai</h2>
      {displayedFutureBookings.length > 0 ? (
        <>
          <ul className="booking-list">{renderBookingList(displayedFutureBookings)}</ul>
          {totalFuturePages > 1 && renderPagination(totalFuturePages, currentPageFuture, handleFuturePageChange)}
        </>
      ) : (
        <p className="no-booking-message">Không có lịch khám tương lai.</p>
      )}

      {selectedBooking && (
        <div className="selected-booking">
          <button className="close-button" onClick={handleCloseProfile}>
            Đóng
          </button>
          <h2 className="selected-booking-heading">Phiếu khám đang được xem:</h2>
          <span className="booking-info">Họ tên: {selectedBooking.patientName}</span>
          <span className="booking-info">Lí do đến khám: {selectedBooking.reason}</span>
          <span className="booking-info">Ngày khám: {selectedBooking.date}</span>
          <span className="booking-info">Giờ khám: {selectedBooking.time}</span>
          <span className="booking-info">Trạng thái: {selectedBooking.status}</span>
          {currentDate === selectedBooking.date && (
            <button className="view-profile-button">Xem hồ sơ</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewBooking;
