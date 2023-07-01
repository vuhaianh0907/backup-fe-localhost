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
    // Xử lý logout tại đây
    // Xóa token và các thông tin khác khỏi sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    // Chuyển hướng đến trang đăng nhập
    window.location.href = '/login';
  };

  return (
    <div className="nav">
      <nav>
        <ul className="nav-list">
          <li className="nav-list--logo">
            <Link to={'/'}>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </li>
          <li className="nav-list--element">
            <Link to={'/Banner'}>Banner</Link>
          </li>
          <li className="nav-list--element nav-list--element-right">
            <Link to={'/Booking'}>Booking</Link>
          </li>
          <li className="nav-list--element">
            <Link to={'/doctor'}>Doctor</Link>
          </li>
          <li className="nav-list--element">
            <Link to={'/crDoc'}>crDoc</Link>
          </li>
          <li className="nav-list--element">
            <Link to={'/Worksheet'}>View Worksheet</Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="nav-list--prior">
            <div className="avatar" onClick={() => setIsModalOpen(true)}>
              <div className="avatar" onClick={() => setIsModalOpen(true)}>
                <img src={avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} />
              </div>

            </div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Options Modal"
              className="options-modal"
            >
              <ul className="options-list">
                <li>
                  <Link to="/customer/profile">Xem thông tin cá nhân</Link>
                </li>
                <li>
                  <Link to="/customer/profile/edit">Chỉnh sửa thông tin</Link>
                </li>
                <li>
                  <Link to="/customer/treatmentprofile/treatment">Xem hồ sơ bệnh</Link>
                </li>
                <li>
                  <Link to="/admin/changepass">Đổi mật khẩu</Link>
                </li>
                <li>
                  <Link to="/logout" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </Modal>
          </div>
        ) : (
          <div className="nav-list--prior">
            <Link to={'/Login'}>Login</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
