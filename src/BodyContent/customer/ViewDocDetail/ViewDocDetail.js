import React, { useState } from 'react';
import './ViewDocDetail.css';

export default function ViewDocDetail() {
    // Dummy data for the doctor's profile
    const profile = {
        profilePicture: 'path_to_image',
        name: 'Nguyễn Văn Bác Sĩ',
        currentDate: '2023-06-28',
        workingSlots: [
            { time: '08:00', available: true },
            { time: '09:00', available: false },
            { time: '10:00', available: true },
            { time: '11:00', available: true },
            { time: '13:00', available: false },
            { time: '14:00', available: true },
            { time: '15:00', available: false },
            { time: '16:00', available: true },
        ],
        information: {
            certificates: 'Certificate 1, Certificate 2',
            training: 'Training 1, Training 2',
            experiences: 'Experience 1, Experience 2',
            specialization: 'Răng hàm mặt',
        },
    };

    const [selectedDate, setSelectedDate] = useState(profile.currentDate);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className="container">
            <div className='line-1'>
                <div className="doctor-profile">
                    <img src={profile.profilePicture} alt="Doctor Profile" className="profile-picture" />
                    <h2 className="doctor-name">{profile.name}</h2>
                    <div className="date-selection">
                        <label htmlFor="date">Chọn ngày:</label>
                        <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <h3 className="selected-date">Ngày: {selectedDate}</h3>
                </div>

                <div className="working-slots">
                    <div className="date-selection">
                        <label htmlFor="date">Chọn ngày:</label>
                        <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <h3 className="selected-date">Ngày: {selectedDate}</h3>
                    <h3>Khung giờ làm việc</h3>
                    <ul className="slots-list">
                        {profile.workingSlots.map((slot, index) => (
                            <li key={index} className={`slot ${slot.available ? '' : 'unavailable'}`}>
                                {slot.time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <br />
            <div className="doctor-information">
                <h3>Thông tin bác sĩ</h3>
                <div className="info-item">
                    <h4>Chứng chỉ:</h4>
                    <p>{profile.information.certificates}</p>
                </div>
                <div className="info-item">
                    <h4>Đào tạo:</h4>
                    <p>{profile.information.training}</p>
                </div>
                <div className="info-item">
                    <h4>Kinh nghiệm:</h4>
                    <p>{profile.information.experiences}</p>
                </div>
                <div className="info-item">
                    <h4>Chuyên ngành:</h4>
                    <p>{profile.information.specialization}</p>
                </div>
            </div>
        </div>
    );
}
