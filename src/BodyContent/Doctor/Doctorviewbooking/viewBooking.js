import React, { useState } from 'react';
import './viewBooking.css';

const ViewBooking = () => {
    const [currentBookingsPage, setCurrentBookingsPage] = useState(1);
    const [futureBookingsPage, setFutureBookingsPage] = useState(1);
    const currentDate = new Date().toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const bookingsPerPage = 5;

    const initialBookingList = [
        {
            id: 1,
            avatar: 'avatar_url_1',
            service: 'Khám tổng quát',
            status: 'Đã khám',
            date: '2023-07-01',
        },
        {
            id: 2,
            avatar: 'avatar_url_2',
            service: 'Lấy men răng',
            status: 'Đang chờ khám',
            date: '2023-07-01',
        },
        {
            id: 3,
            avatar: 'avatar_url_3',
            service: 'Nhổ răng khôn',
            status: 'Đang chờ khám',
            date: '2023-07-01',
        },
        {
            id: 4,
            avatar: 'avatar_url_4',
            service: 'Lấy tủy',
            status: 'Đang chờ khám',
            date: '2023-07-01',
        },
        {
            id: 5,
            avatar: 'avatar_url_5',
            service: 'Cạo vôi răng',
            status: 'Đang chờ khám',
            date: '2023-07-01',
        },
        {
            id: 6,
            avatar: 'avatar_url_6',
            service: 'Trám răng',
            status: 'Đã khám',
            date: '2023-07-01',
        },
        {
            id: 7,
            avatar: 'avatar_url_7',
            service: 'Tẩy trắng răng',
            status: 'Đã khám',
            date: '2023-07-01',
        },
        {
            id: 8,
            avatar: 'avatar_url_8',
            service: 'Chỉnh nha',
            status: 'Đang chờ khám',
            date: '2023-07-01',
        },
        {
            id: 9,
            avatar: 'avatar_url_9',
            service: 'Niềng răng',
            status: 'Đang chờ khám',
            date: '2023-07-01',
        },
        {
            id: 10,
            avatar: 'avatar_url_10',
            service: 'Trồng răng',
            status: 'Đã khám',
            date: '2023-07-01',
        },
        // Thêm 7 mẫu dữ liệu đặt lịch khác
        {
            id: 11,
            avatar: 'avatar_url_11',
            service: 'Nhổ răng',
            status: 'Đã khám',
            date: '2023-07-08',
        },
        {
            id: 12,
            avatar: 'avatar_url_12',
            service: 'Chỉnh nha',
            status: 'Đang chờ khám',
            date: '2023-07-09',
        },
        {
            id: 13,
            avatar: 'avatar_url_13',
            service: 'Cạo vôi răng',
            status: 'Đang chờ khám',
            date: '2023-07-10',
        },
        {
            id: 14,
            avatar: 'avatar_url_14',
            service: 'Lấy tủy',
            status: 'Đang chờ hủy đơn',
            date: '2023-07-11',
        },
        {
            id: 15,
            avatar: 'avatar_url_15',
            service: 'Trám răng',
            status: 'Đang chờ khám',
            date: '2023-07-12',
        },
        {
            id: 16,
            avatar: 'avatar_url_16',
            service: 'Niềng răng',
            status: 'Đang chờ khám',
            date: '2023-07-13',
        },
        {
            id: 17,
            avatar: 'avatar_url_17',
            service: 'Trồng răng',
            status: 'Đã khám',
            date: '2023-07-14',
        },
    ];

    const currentBookings = [
        {
            id: 4,
            avatar: 'avatar_url_4',
            service: 'Lấy tủy',
            status: 'Đang chờ khám',
            date: '2023-07-02',
        },
        {
            id: 5,
            avatar: 'avatar_url_5',
            service: 'Cạo vôi răng',
            status: 'Đang chờ khám',
            date: '2023-07-03',
        },
        {
            id: 6,
            avatar: 'avatar_url_6',
            service: 'Trám răng',
            status: 'Đã khám',
            date: '2023-07-05',
        },
        // Thêm 4 mẫu dữ liệu đặt lịch hiện tại khác
        {
            id: 18,
            avatar: 'avatar_url_18',
            service: 'Nhổ răng',
            status: 'Đã khám',
            date: '2023-07-16',
        },
        {
            id: 19,
            avatar: 'avatar_url_19',
            service: 'Chỉnh nha',
            status: 'Đang chờ khám',
            date: '2023-07-17',
        },
        {
            id: 20,
            avatar: 'avatar_url_20',
            service: 'Cạo vôi răng',
            status: 'Đang chờ khám',
            date: '2023-07-18',
        },
        {
            id: 21,
            avatar: 'avatar_url_21',
            service: 'Lấy tủy',
            status: 'Đang chờ hủy đơn',
            date: '2023-07-19',
        },
    ];
    const [bookingList, setBookingList] = useState(initialBookingList);
    const totalBookingsPages = Math.ceil(bookingList.length / bookingsPerPage);
    const totalCurrentPages = Math.ceil(currentBookings.length / bookingsPerPage);
    const viewMedicalRecord = (bookingId) => {
        // Logic để lấy và hiển thị hồ sơ y tế cho bookingId đã cho
        console.log(`Đang xem hồ sơ y tế cho ID đặt lịch: ${bookingId}`);
    };

    const cancelBooking = (bookingId) => {
        const updatedBookingList = bookingList.map((booking) =>
            booking.id === bookingId && booking.status !== 'Đã hủy'
                ? { ...booking, status: 'Đã hủy' }
                : booking
        );
        setBookingList(updatedBookingList);
    };

    const requestCancellation = (bookingId) => {
        const updatedBookingList = bookingList.map((booking) =>
            booking.id === bookingId
                ? { ...booking, status: 'Đang chờ hủy đơn' }
                : booking
        );
        setBookingList(updatedBookingList);
    };

    const renderBookings = () => {
        const startIndex = (currentBookingsPage - 1) * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        const bookingsToRender = bookingList.slice(startIndex, endIndex);

        return (
            <ul>
                {bookingsToRender.map((booking) => (
                    <li className="booking-item" key={booking.id}>
                        <div>ID: {booking.id}</div>
                        <div>Avatar: {booking.avatar}</div>
                        <div>Service: {booking.service}</div>
                        <div>Status: {booking.status}</div>
                        <div>Date: {booking.date}</div>
                        {booking.status !== 'Đã hủy' && (
                            <button onClick={() => cancelBooking(booking.id)}>Hủy</button>
                        )}
                        <button onClick={() => viewMedicalRecord(booking.id)}>Xem phiếu khám</button>
                    </li>
                ))}
            </ul>
        );
    };

    const renderFutureBookings = () => {
        const startIndex = (futureBookingsPage - 1) * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        const bookingsToRender = currentBookings.slice(startIndex, endIndex);

        return (
            <ul>
                {bookingsToRender.map((booking) => (
                    <li className="booking-item" key={booking.id}>
                        <div>ID: {booking.id}</div>
                        <div>Avatar: {booking.avatar}</div>
                        <div>Service: {booking.service}</div>
                        <div>Status: {booking.status}</div>
                        <div>Date: {booking.date}</div>
                        <button onClick={() => requestCancellation(booking.id)}>Yêu Cầu Hủy Đơn</button>
                        <button onClick={() => viewMedicalRecord(booking.id)}>Xem phiếu khám</button>
                    </li>
                ))}
            </ul>
        );
    };


    const renderBookingsPagination = () => {
        const paginationItems = [];

        for (let i = 1; i <= totalBookingsPages; i++) {
            paginationItems.push(
                <button
                    key={i}
                    onClick={() => setCurrentBookingsPage(i)}
                    className={currentBookingsPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        return <div className="pagination">{paginationItems}</div>;
    };

    const renderFutureBookingsPagination = () => {
        const paginationItems = [];

        for (let i = 1; i <= totalCurrentPages; i++) {
            paginationItems.push(
                <button
                    key={i}
                    onClick={() => setFutureBookingsPage(i)}
                    className={futureBookingsPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        return <div className="pagination">{paginationItems}</div>;
    };


    return (
        <div className="booking-container">
            <div className="future-bookings">
                <h2>Lịch khám hôm nay {currentDate}</h2>
                {renderFutureBookings()}
                {renderFutureBookingsPagination()}
            </div>

            <div className="current-bookings">
                <h2>Lịch khám của các ngày tới</h2>
                {renderBookings()}
                {renderBookingsPagination()}
            </div>
        </div>
    );
};

export default ViewBooking;