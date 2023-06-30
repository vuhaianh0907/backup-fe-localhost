import React from 'react';

export default function AppointmentForm({ doctorName, selectedDate, selectedSlot }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lí việc xác nhận đặt khám
    };
    alert('Hello!');
    return (
        
        <div className="appointment-form-container">
            <h2>Xác nhận đặt khám</h2>

            {/* Hiển thị tên bác sĩ */}
            <div className="doctor-info">
                <h3>Bác sĩ: {doctorName}</h3>
            </div>

            {/* Hiển thị thông tin ngày giờ khám */}
            <div className="appointment-details">
                <h4>Ngày khám: {selectedDate}</h4>
                <h4>Giờ khám: {selectedSlot}</h4>
            </div>

            {/* Form đặt khám */}
            <form onSubmit={handleSubmit}>
                {/* Chọn dịch vụ */}
                <div className="service-selection">
                    <h4>Chọn dịch vụ</h4>
                    {/* Hiển thị danh sách các dịch vụ */}
                    <select>
                        <option value="service1">Dịch vụ 1</option>
                        <option value="service2">Dịch vụ 2</option>
                        <option value="service3">Dịch vụ 3</option>
                    </select>
                </div>

                {/* Nhập nội dung khám */}
                <div className="content-input">
                    <h4>Nội dung khám</h4>
                    {/* Trường văn bản để người dùng nhập nội dung khám */}
                    <textarea rows="4" cols="50"></textarea>
                </div>

                {/* Nút xác nhận đặt khám */}
                <button type="submit">Xác nhận</button>
            </form>
        </div>
    );
}