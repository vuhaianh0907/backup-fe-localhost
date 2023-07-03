import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../assets/images/logo-01-01.png';
import avatar from '../assets/images/avatar.jpg';
import './header.css';

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = sessionStorage.getItem('token') !== null;

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    window.location.href = '/login';
  };

  const handleOptionClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="nav">
      <nav>
        <ul className="nav-list">
          <li className="nav-list--logo">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </li>
          <li className="nav-list--element">
            <Link to="/admin/doctorlist">List Doctor</Link>
          </li>
          <li className="nav-list--element">
            <Link to="/admin/createslot">Create Slot</Link>
          </li>
          
        </ul>
        <div className="nav-list--prior">
          {isLoggedIn ? (
            <div className="avatar" onClick={() => setIsModalOpen(true)}>
              <img src={avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} />
            </div>
          ) : (
            <Link to="/Login">Login</Link>
          )}
        </div>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Options Modal"
        className="options-modal"
      >
        <ul className="options-list">
          <li>
            <Link to="/customer/profile" onClick={handleOptionClick}>
              Xem thông tin cá nhân
            </Link>
          </li>
          <li>
            <Link to="/admin/createdoctor" onClick={handleOptionClick}>
              Tạo Bác Sĩ
            </Link>
          </li>
          <li>
            <Link to="/customer/profile/edit" onClick={handleOptionClick}>
              Chỉnh sửa thông tin
            </Link>
          </li>
          <li>
            <Link to="/customer/treatmentprofile/treatment" onClick={handleOptionClick}>
              Xem hồ sơ bệnh
            </Link>
          </li>
          <li>
            <Link to="/admin/changepass" onClick={handleOptionClick}>
              Đổi mật khẩu
            </Link>
          </li>
          <li>
            <Link to="/logout" onClick={() => {
                handleLogout();
                handleOptionClick();
              }}
            >
              Đăng xuất
            </Link>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
