import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './DoctorDetail.scss';

const DoctorDetail = () => {
  const { doctorId } = useParams(); // Truy cập vào doctorId từ URL parameter

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorPromise = axios.get(`http://localhost:3000/api/account/doctor/details?id=${doctorId}`);
        const slotsPromise = axios.get(`http://localhost:3000/api/slot/getSlotbyDoctor?doctorId=${doctorId}`);

        const [doctorResponse, slotsResponse] = await Promise.all([doctorPromise, slotsPromise]);

        const doctorData = doctorResponse.data.doctor;
        const slotsData = slotsResponse.data.slots;

        setDoctorInfo(doctorData);
        setSlots(slotsData);
      } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu có
      }
    };

    fetchData();
  }, [doctorId]);
  useEffect(() => {
    // Đặt giá trị mặc định cho selectedDate là ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);


  const handleEditInfo = () => {
    // Thực hiện các thao tác cần thiết khi click vào nút chỉnh sửa
    console.log('Chỉnh sửa thông tin bác sĩ');
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSlotClick = (slotTime) => {
    // Xử lý khi người dùng nhấp vào slot time
    console.log('Selected slot time:', slotTime);
  };

  const filteredSlots = selectedDate
    ? slots.filter((slot) => slot.date === selectedDate)
    : slots;

  // Kiểm tra xem dữ liệu có được tải lên từ server hay chưa
  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  console.log(slots);

  return (
    <div id="DoctorDetail" className="doctor-detail">
      <div className="info-container row">
        <div className='col-4 avatar'>
          <img src={doctorInfo.avatar} className="doctor-avatar" />
        </div>
        <div className='col-8'>
          <div className="doctor-name">{doctorInfo.fullname}</div>
          <div className="doctor-info">
            <span className="info-label">ID Bác Sĩ:</span>
            <span>{doctorInfo.idCard}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Giới Tính:</span>
            <span>{doctorInfo.gender}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Ngày Sinh:</span>
            <span>{doctorInfo.dateOfBirth}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Số điện thoại:</span>
            <span>{doctorInfo.phone}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Email:</span>
            <span>{doctorInfo.email}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Địa Chỉ:</span>
            <span>{doctorInfo.address}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Bằng Cấp:</span>
            <span>{doctorInfo.qualification}</span>
          </div>
          <div className="doctor-info">
            <span className="info-label">Kinh Nghiệm:</span>
            <span>{doctorInfo.experience}</span>
          </div>

          <div className="filter-container">

            <label for="date" class="col-form-label">Chọn ngày: </label>
            <div class="d-inline-block col-5">
              <div class="input-group date" id="datepicker">
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange} />
              </div>
            </div>
          </div>

          <div className="slots-container">
            <h3>Slots:</h3>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button" class="btslot btn btn-primary"
                  onClick={() => handleSlotClick(slot.time)}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <div>No slots available</div>
            )}
          </div>         
          <div className="edit-button-container">
          <Link to={`/admin/doctor/addslot/${doctorId}`} type="button" class="btn btn-secondary">
            Thêm ca làm
            </Link>
            <br/>
            <Link to={`/admin/doctor/update/${doctorId}`} type="button" class="btn btn-secondary">
              Chỉnh sửa thông tin
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DoctorDetail;
