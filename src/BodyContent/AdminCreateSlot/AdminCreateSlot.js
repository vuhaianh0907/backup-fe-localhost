import React, { useState } from 'react';

function CreateSchedulePage() {
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Lưu bác sĩ được chọn
    const [startDate, setStartDate] = useState(null); // Lưu ngày bắt đầu lịch làm việc
    const [endDate, setEndDate] = useState(null); // Lưu ngày kết thúc lịch làm việc
    const [selectedShifts, setSelectedShifts] = useState([]); // Lưu các ca làm việc được chọn
    const [isScheduleCreated, setIsScheduleCreated] = useState(false); // Kiểm tra xem lịch làm việc đã được tạo chưa

    const doctorList = [
        // Danh sách các bác sĩ trong hệ thống
    ];

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor); // Chọn bác sĩ
    };

    const handleSelectStartDate = (date) => {
        setStartDate(date); // Chọn ngày bắt đầu
    };

    const handleSelectEndDate = (date) => {
        setEndDate(date); // Chọn ngày kết thúc
    };

    const handleSelectShift = (shift) => {
        const updatedShifts = [...selectedShifts];
        if (updatedShifts.includes(shift)) {
            updatedShifts.splice(updatedShifts.indexOf(shift), 1); // Loại bỏ ca làm việc nếu đã được chọn trước đó
        } else {
            updatedShifts.push(shift); // Thêm ca làm việc vào danh sách đã chọn
        }
        setSelectedShifts(updatedShifts);
    };

    const handleSaveSchedule = () => {
        // Kiểm tra tính hợp lệ của dữ liệu đầu vào và lưu lịch làm việc đã tạo
        if (selectedDoctor && startDate && endDate && selectedShifts.length > 0) {
            // Lưu lịch làm việc đã tạo vào cơ sở dữ liệu hoặc thực hiện các hành động khác tương ứng
            setIsScheduleCreated(true); // Đánh dấu là đã tạo lịch làm việc
        } else {
            // Hiển thị thông báo lỗi hoặc yêu cầu người dùng nhập đầy đủ thông tin
        }
    };

    return (
        <div>
            <h2>Tạo Lịch Làm Việc</h2>

            <div>
                <h3>Chọn bác sĩ</h3>
                <ul>
                    {doctorList.map((doctor) => (
                        <li key={doctor.id}>
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                onClick={() => handleSelectDoctor(doctor)} // Gọi hàm khi chọn bác sĩ
                            />
                            <p>{doctor.name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Chọn khoảng thời gian</h3>
                <label htmlFor="startDate">Ngày bắt đầu:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => handleSelectStartDate(e.target.value)} // Gọi hàm khi chọn ngày bắt đầu
                />

                <label htmlFor="endDate">Ngày kết thúc:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => handleSelectEndDate(e.target.value)} // Gọi hàm khi chọn ngày kết thúc
                />
            </div>

            <div>
                <h3>Chọn ca làm việc</h3>
                <div>
                    <input
                        type="checkbox"
                        id="shift1"
                        checked={selectedShifts.includes('Ca sáng')} // Kiểm tra ca làm việc đã được chọn hay chưa
                        onChange={() => handleSelectShift('Ca sáng')} // Gọi hàm khi chọn ca làm việc
                    />
                    <label htmlFor="shift1">Ca sáng</label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="shift2"
                        checked={selectedShifts.includes('Ca chiều')} // Kiểm tra ca làm việc đã được chọn hay chưa
                        onChange={() => handleSelectShift('Ca chiều')} // Gọi hàm khi chọn ca làm việc
                    />
                    <label htmlFor="shift2">Ca chiều</label>
                </div>
            </div>

            <div>
                <button onClick={handleSaveSchedule}>Lưu</button> // Gọi hàm khi nhấn nút Lưu
            </div>

            {isScheduleCreated && (
                <div>
                    <h3>Lịch làm việc đã tạo</h3>
                    <p>Bác sĩ: {selectedDoctor.name}</p>
                    <p>Ngày bắt đầu: {startDate}</p>
                    <p>Ngày kết thúc: {endDate}</p>
                    <p>Ca làm việc: {selectedShifts.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default CreateSchedulePage;
