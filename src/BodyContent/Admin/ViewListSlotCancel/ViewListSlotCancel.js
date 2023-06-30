import React, { useState } from 'react';

export default function AdminViewCancelRequests() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);

    // Dữ liệu mẫu danh sách đang chờ phê duyệt
    const samplePendingRequests = [
        {
            id: 1,
            avatar: 'https://example.com/avatar1.png',
            doctor: 'Bác sĩ A',
            patient: 'Bệnh nhân A',
            reason: 'Bận công việc đột xuất',
            date: '01/06/2023',
        },
        {
            id: 2,
            avatar: 'https://example.com/avatar2.png',
            doctor: 'Bác sĩ B',
            patient: 'Bệnh nhân B',
            reason: 'Lý do khác',
            date: '02/06/2023',
        },
        // Thêm các yêu cầu khác vào đây
    ];

    // Dữ liệu mẫu danh sách đã phê duyệt
    const sampleApprovedRequests = [
        {
            id: 1,
            avatar: 'https://example.com/avatar3.png',
            doctor: 'Bác sĩ C',
            patient: 'Bệnh nhân C',
            reason: 'Bận công việc đột xuất',
            status: 'Đã hủy',
            date: '03/06/2023',
        },
        {
            id: 2,
            avatar: 'https://example.com/avatar4.png',
            doctor: 'Bác sĩ D',
            patient: 'Bệnh nhân D',
            reason: 'Lý do khác',
            status: 'Không duyệt',
            date: '04/06/2023',
        },
        // Thêm các yêu cầu khác vào đây
    ];

    // Xử lý khi nhấn vào nút "Xem phiếu khám"
    const handleViewAppointment = (requestId) => {
        // Chuyển hướng đến trang "AdminViewAppointment" với thông tin chi tiết về phiếu khám tương ứng
        console.log(`Viewing appointment ${requestId}`);
    };

    // Xử lý khi nhấn vào nút "Duyệt"
    const handleApproveRequest = (requestId) => {
        // Xử lý phê duyệt yêu cầu hủy lịch
        console.log(`Approving request ${requestId}`);
    };

    // Xử lý khi nhấn vào nút "Không duyệt"
    const handleRejectRequest = (requestId) => {
        // Xử lý từ chối yêu cầu hủy lịch
        console.log(`Rejecting request ${requestId}`);
    };

    return (
        <div>
            <h1>Danh sách đơn xin hủy lịch hẹn: Đang chờ phê duyệt</h1>
            {samplePendingRequests.map((request) => (
                <div key={request.id}>
                    <img src={request.avatar} alt="Avatar" />
                    <p>Bác sĩ: {request.doctor}</p>
                    <p>Bệnh nhân: {request.patient}</p>
                    <p>Lý do: {request.reason}</p>
                    <p>Ngày: {request.date}</p>
                    <button onClick={() => handleViewAppointment(request.id)}>
                        Xem phiếu khám
                    </button>
                    <button onClick={() => handleApproveRequest(request.id)}>
                        Duyệt
                    </button>
                    <button onClick={() => handleRejectRequest(request.id)}>
                        Không duyệt
                    </button>
                </div>
            ))}

            <h1>Đã phê duyệt:</h1>
            {sampleApprovedRequests.map((request) => (
                <div key={request.id}>
                    <img src={request.avatar} alt="Avatar" />
                    <p>Bác sĩ: {request.doctor}</p>
                    <p>Bệnh nhân: {request.patient}</p>
                    <p>Lý do: {request.reason}</p>
                    <p>Trạng thái: {request.status}</p>
                    <p>Ngày: {request.date}</p>
                    <button onClick={() => handleViewAppointment(request.id)}>
                        Xem phiếu khám
                    </button>
                </div>
            ))}
        </div>
    );
}
