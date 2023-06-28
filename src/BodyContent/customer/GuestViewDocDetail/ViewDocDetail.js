import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doctors } from '../shared/ListOfDoctors';
import './DoctorDetail.css';

export default function DoctorDetail() {
    const { id } = useParams();
    const doctor = doctors.find((doctor) => doctor.id === id);

    if (!doctor) {
        // Nếu không tìm thấy bác sĩ, hiển thị thông báo
        return <div>Bác sĩ không tồn tại.</div>;
    }

    // Sử dụng useState để lưu trữ ngày được chọn
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Xử lý sự kiện khi click vào mũi tên để chuyển sang ngày tiếp theo
    const handleNextDay = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDay);
    };

    // Dữ liệu lịch khám mẫu cho cả tuần
    const schedule = [
        { day: 'Sunday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
        { day: 'Monday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
        { day: 'Tuesday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
        { day: 'Wednesday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
        { day: 'Thursday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
        { day: 'Friday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
        { day: 'Saturday', slots: ['7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'] },
    ];

    // Tìm lịch khám cho ngày đã chọn
    const filteredSchedule = schedule.find((item) => item.day === selectedDate.toLocaleString('en-US', { weekday: 'long' }));

    return (
        <div className="doctor-detail-container">
            <div className="doctor-info">
                <img src={doctor.img} alt={doctor.name} />
                <h1>{doctor.name}</h1>
            </div>

            <div className="schedule">
                <h2>Lịch khám</h2>
                <div className="date-switch">
                    <button onClick={handleNextDay}>Ngày tiếp theo</button>
                    <p>{selectedDate.toLocaleDateString('en-US')}</p>
                </div>
                <div className="time-slots">
                    {filteredSchedule && (
                        <div className="day-slot">
                            <h3>{filteredSchedule.day}</h3>
                            <div className="slots">
                                {filteredSchedule.slots.map((slot, index) => (
                                    <div key={index} className="slot">
                                        <p>{slot}</p>
                                        <button>Đặt hẹn</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="doctor-details">
                <h2>Thông tin chi tiết</h2>
                <p>Chứng chỉ: {doctor.certificates}</p>
                <p>Quá trình đào tạo: {doctor.training}</p>
                <p>Quá trình công tác: {doctor.experience}</p>
                <p>Chứng chỉ trong nước hoặc nước ngoài: {doctor.certificates}</p>
                <p>Lĩnh vực chuyên môn: {doctor.specialization}</p>
            </div>
        </div>
    );
}
