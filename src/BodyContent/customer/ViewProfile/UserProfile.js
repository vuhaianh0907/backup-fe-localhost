import React from 'react';
import './UserProfile.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGenderless, FaCalendarAlt, FaUser, FaMoneyBillAlt } from 'react-icons/fa';

const user = {
  fullname: 'John Doe',
  email: 'johndoe@example.com',
  address: '123 Street, City',
  phone: '1234567890',
  gender: 'Male',
  createdAt: '2022-01-01',
  updatedAt: '2022-02-01',
  role: 'customer',
  balance: 1000,
};

const UserProfile = () => {
  const handleEditProfile = () => {
    // Xử lý sự kiện chỉnh sửa thông tin
    console.log('Chỉnh sửa thông tin');
  };

  const handleViewAppointments = () => {
    // Xử lý sự kiện xem danh sách phiếu khám
    console.log('Xem danh sách phiếu khám');
  };

  const handleViewMedicalRecords = () => {
    // Xử lý sự kiện xem danh sách hồ sơ bệnh
    console.log('Xem danh sách hồ sơ bệnh');
  };

  return (
    <div id='UserProfile' className="user-profile">
      <div className="user-profile__avatar">
        <img src="https://source.unsplash.com/random/200x200" alt="Avatar" className="avatar-image" />
      </div>
      <div className="user-profile__info">
        <h2 className="user-profile__name">Tên: {user.fullname}</h2>
        <div className="user-profile__column">
          <p><FaEnvelope /> Email: {user.email}</p>
          <p><FaMapMarkerAlt /> Địa chỉ: {user.address}</p>
          <p><FaPhone /> Điện thoại: {user.phone}</p>
        </div>
        <div className="user-profile__column">
          <p><FaGenderless /> Giới tính: {user.gender}</p>
          <p><FaCalendarAlt /> Ngày tạo: {user.createdAt}</p>
          <p><FaCalendarAlt /> Ngày cập nhật: {user.updatedAt}</p>
          <p><FaUser /> Vai trò: {user.role}</p>
          <p><FaMoneyBillAlt /> Số dư: {user.balance}</p>
        </div>
      </div>
      <button className="edit-profile-button" onClick={handleEditProfile}>Chỉnh sửa thông tin</button>
      <div className="user-profile__actions">
        <button className="user-profile__action-button" onClick={handleViewAppointments}>
          Xem danh sách phiếu khám
        </button>
        <button className="user-profile__action-button" onClick={handleViewMedicalRecords}>
          Xem danh sách hồ sơ bệnh
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
