import React, { useState } from 'react';
import './AdminCreateSlot.css';

function CreateSchedulePage() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [isScheduleCreated, setIsScheduleCreated] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestedDoctors, setSuggestedDoctors] = useState([]);

    const doctorList = [
        // Danh sách các bác sĩ trong hệ thống
    ];

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setSearchValue('');
        setSuggestedDoctors([]);
    };

    const handleSelectStartDate = (date) => {
        setStartDate(date);
    };

    const handleSelectEndDate = (date) => {
        setEndDate(date);
    };

    const handleSelectShift = (shift) => {
        const updatedShifts = [...selectedShifts];
        if (updatedShifts.includes(shift)) {
            updatedShifts.splice(updatedShifts.indexOf(shift), 1);
        } else {
            updatedShifts.push(shift);
        }
        setSelectedShifts(updatedShifts);
    };

    const handleSaveSchedule = () => {
        if (selectedDoctor && startDate && endDate && selectedShifts.length > 0) {
            setIsScheduleCreated(true);
        } else {
            // Hiển thị thông báo lỗi hoặc yêu cầu người dùng nhập đầy đủ thông tin
        }
    };

    const handleSearchDoctor = (value) => {
        setSearchValue(value);

        // Tìm kiếm các bác sĩ dựa trên giá trị nhập
        const filteredDoctors = doctorList.filter((doctor) =>
            doctor.name.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestedDoctors(filteredDoctors);
    };

    return (
        <div className="page-container">
            <div className="admin-create-slot__container">
                <h2>Tạo Lịch Làm Việc</h2>

                {/* Chọn bác sĩ */}
                <div>
                    <h3>Chọn bác sĩ</h3>
                    <div className="admin-create-slot__search-doctor">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bác sĩ"
                            value={searchValue}
                            onChange={(e) => handleSearchDoctor(e.target.value)}
                        />
                    </div>
                    <ul className="admin-create-slot__doctor-list">
                        {suggestedDoctors.map((doctor) => (
                            <li key={doctor.id} onClick={() => handleSelectDoctor(doctor)}>
                                <img src={doctor.image} alt={doctor.name} />
                                <p>{doctor.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chọn khoảng thời gian */}
                <div>
                    <h3>Chọn khoảng thời gian</h3>
                    <div className="admin-create-slot__date-input">
                        <label htmlFor="startDate">Ngày bắt đầu:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => handleSelectStartDate(e.target.value)}
                        />
                    </div>

                    <div className="admin-create-slot__date-input">
                        <label htmlFor="endDate">Ngày kết thúc:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => handleSelectEndDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Chọn ca làm việc */}
                <div className="admin-create-slot__shifts-container">
                    <h3>Chọn ca làm việc</h3>
                    <div className="admin-create-slot__shifts">
                        <div className="admin-create-slot__shift">
                            <input
                                type="checkbox"
                                id="shift1"
                                checked={selectedShifts.includes('Ca sáng')}
                                onChange={() => handleSelectShift('Ca sáng')}
                            />
                            <label htmlFor="shift1">Ca sáng</label>
                        </div>

                        <div className="admin-create-slot__shift">
                            <input
                                type="checkbox"
                                id="shift2"
                                checked={selectedShifts.includes('Ca chiều')}
                                onChange={() => handleSelectShift('Ca chiều')}
                            />
                            <label htmlFor="shift2">Ca chiều</label>
                        </div>
                    </div>
                </div>


                {/* Lưu */}
                <div>
                    <button className="admin-create-slot__save-btn" onClick={handleSaveSchedule}>
                        Lưu
                    </button>
                </div>

                {/* Hiển thị lịch đã tạo */}
                {isScheduleCreated && (
                    <div className="admin-create-slot__schedule-info">
                        <h3>Lịch làm việc đã tạo</h3>
                        <p>Bác sĩ: {selectedDoctor.name}</p>
                        <p>Ngày bắt đầu: {startDate}</p>
                        <p>Ngày kết thúc: {endDate}</p>
                        <p>Ca làm việc: {selectedShifts.join(', ')}</p>
                    </div>
                )}

                {/* Bảng */}
                <div className="admin-create-slot__table-wrapper">
                    <table className="admin-create-slot__table">
                        <thead>
                            <tr>
                                <th>Bác sĩ</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Ca làm việc</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedDoctor && selectedDoctor.name}</td>
                                <td>{startDate}</td>
                                <td>{endDate}</td>
                                <td>{selectedShifts.join(', ')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CreateSchedulePage;
