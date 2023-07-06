import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminCreateSlot.css';

function CreateSchedulePage() {
  const [searchValue, setSearchValue] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [isScheduleCreated, setIsScheduleCreated] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);

  const fetchDoctorsByName = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/getAllDoctorByName?name=${searchValue}`);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error('Error fetching doctors by name:', error);
    }
  };

  const handleSearchDoctor = () => {
    fetchDoctorsByName();
  };

  useEffect(() => {
    fetchDoctorsByName();
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSelectStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleSelectEndDate = (e) => {
    setEndDate(e.target.value);
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
      const newSchedule = {
        doctor: selectedDoctor,
        startDate: startDate,
        endDate: endDate,
        shifts: selectedShifts,
      };
      
  
      axios.post('http://localhost:3000/api/slot/create', newSchedule)
        .then(response => {
          // Xử lý thành công khi gửi dữ liệu lịch làm việc
          console.log(response.data);
          setScheduleList([...scheduleList, newSchedule]);
          setIsScheduleCreated(true);
        })
        .catch(error => {
          // Xử lý khi gặp lỗi trong quá trình gửi dữ liệu
          console.error('Error creating schedule:', error);
        });
        console.log(newSchedule);   
    } else {
      // Hiển thị thông báo lỗi hoặc yêu cầu người dùng nhập đầy đủ thông tin
    }
  };

  return (
    <div className="page-container">
      <div className="admin-create-slot__container">
        <h2>Tạo Lịch Làm Việc</h2>

        {/* Tìm kiếm bác sĩ */}
        <div>
          <h3>Tìm kiếm bác sĩ</h3>
          <div className="admin-create-slot__search-doctor">
            <input
              type="text"
              placeholder="Nhập tên bác sĩ"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearchDoctor}>Tìm kiếm</button>
          </div>
          <ul className="admin-create-slot__doctor-list">
            {doctors.map((doctor) => (
              <li key={doctor.id} onClick={() => handleSelectDoctor(doctor)}>
                <img src={doctor.avatar} alt={doctor.fullname} />
                <p>{doctor.fullname}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Chọn khoảng thời gian */}
        {selectedDoctor && (
          <div>
            <h3>Chọn khoảng thời gian</h3>
            <div>
              <label htmlFor="startDate">Ngày bắt đầu:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleSelectStartDate}
              />
            </div>
            <div>
              <label htmlFor="endDate">Ngày kết thúc:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleSelectEndDate}
              />
            </div>
          </div>
        )}

        {/* Chọn ca làm việc */}
        {selectedDoctor && startDate && endDate && (
          <div>
            <h3>Chọn ca làm việc</h3>
            <div>
              <input
                type="checkbox"
                id="shift1"
                checked={selectedShifts.includes('Ca sáng')}
                onChange={() => handleSelectShift('Ca sáng')}
              />
              <label htmlFor="shift1">Ca sáng</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="shift2"
                checked={selectedShifts.includes('Ca chiều')}
                onChange={() => handleSelectShift('Ca chiều')}
              />
              <label htmlFor="shift2">Ca chiều</label>
            </div>
          </div>
        )}

        {/* Lưu */}
        {selectedDoctor && startDate && endDate && selectedShifts.length > 0 && (
          <div>
            <button onClick={handleSaveSchedule}>Lưu</button>
          </div>
        )}

        {/* Hiển thị lịch đã tạo */}
        {isScheduleCreated && (
          <div>
            <h3>Lịch đã tạo</h3>
            <p>Bác sĩ: {selectedDoctor.fullname}</p>
            <p>Ngày bắt đầu: {startDate}</p>
            <p>Ngày kết thúc: {endDate}</p>
            <p>Ca làm việc: {selectedShifts.join(', ')}</p>
          </div>
        )}

        {/* Bảng */}
        <div>
          <table>
            <thead>
              <tr>
                <th>Bác sĩ</th>
                <th>Ngày</th>
                <th>Ca làm việc</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.doctor.fullname}</td>
                  <td>{schedule.startDate} - {schedule.endDate}</td>
                  <td>{schedule.shifts.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateSchedulePage;
