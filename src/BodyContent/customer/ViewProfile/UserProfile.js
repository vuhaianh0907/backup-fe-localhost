import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGenderless, FaCalendarAlt, FaUser, FaMoneyBillAlt } from 'react-icons/fa';
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State để kiểm soát hiển thị loading spinner
  const storedUserString = sessionStorage.getItem('token');
  const user1 = JSON.parse(storedUserString);

  useEffect(() => {
    if (user1 === null) {
      window.location.href = '/';
    } else {
      if (user1.role !== 'customer') {
        window.location.href = '/';
      }
    }
  }, [user1]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`);
        const userData = response.data.customer;
        setUser(userData);
        setIsLoading(false); // Dữ liệu đã được tải, đặt isLoading thành false
      } catch (error) {
        console.log('Error fetching user data:', error);
        setIsLoading(false); // Nếu xảy ra lỗi, đặt isLoading thành false
      }
    };

    fetchUserData();
  }, [id]);

  const handleEditProfile = () => {
    navigate(`/customer/profile/edit/${id}`);
  };

  const handleViewAppointments = () => {
    // Xử lý sự kiện xem danh sách phiếu khám
    console.log('Xem danh sách phiếu khám');
  };

  const handleViewMedicalRecords = () => {
    // Xử lý sự kiện xem danh sách hồ sơ bệnh
    console.log('Xem danh sách hồ sơ bệnh');
  };

  if (isLoading) {
    return (
      // Hiển thị loading spinner nếu đang tải dữ liệu
      <div className="user-profile-loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
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
        {/* Các nút xem danh sách phiếu khám và hồ sơ bệnh */}
        <button onClick={handleViewAppointments}>Xem danh sách phiếu khám</button>
        <button onClick={handleViewMedicalRecords}>Xem danh sách hồ sơ bệnh</button>
      </div>
    </div>
  );
};

export default UserProfile;
