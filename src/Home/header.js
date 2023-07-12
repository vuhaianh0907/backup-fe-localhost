import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../assets/images/logo-01-01.png';
import avatar from '../assets/images/avatar.jpg';
import './header.css';

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);


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
          {user && user.role === 'doctor' && (
            <>
              <li className="nav-list--element">
                <Link to={`/Doctorviewbooking/${user.id}`}>Appointment</Link>
              </li>
              
            </>
          )}
          {user && user.role === 'admin' && (
            <>
              <li className="nav-list--element">
                <Link to="/admin/doctorlist">List Doctor</Link>
              </li>
              <li className="nav-list--element">
                <Link to="/admin/createslot">Create Slot</Link>
              </li>
            </>
          )}
          {user && user.role === 'customer' && (
            <>
              <li className="nav-list--element">
                <Link to="/customer/listdoctor">List Doctor</Link>
              </li>
              <li className="nav-list--element">
                <Link to={`/customer/booking/${user.id}`}>List Appointment</Link>
              </li>
              <li className="nav-list--element">
                <Link to={`/customer/treatmentprofilelist/${user.id}`}>Treatment Profile List</Link>
              </li>
            </>
          )}

        </ul>
        <div className="nav-list--prior">
          {isLoggedIn ? (
            <div className="avatar" onClick={() => setIsModalOpen(true)}>
              <img src={avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} />
            </div>
          ) : (
            <ul>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
              <Link to="/Register">Register</Link>
              </li>
            </ul>
            
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
          {user && user.role === 'doctor' && (
            <li>
              <Link to={`/doctor/profile/${user.id}`} onClick={handleOptionClick}>
                Xem thông tin cá nhân
              </Link>

            </li>
          )}
          {user && user.role === 'customer' && (
            <li>
              <Link to={`/customer/profile/${user.id}`} onClick={handleOptionClick}>
                Xem thông tin cá nhân
              </Link>

            </li>
          )}

          {user && user.role === 'admin' && (
            <li className="nav-list--element">
              <Link to="/admin/createdoctor" onClick={handleOptionClick}>
                Tạo Bác Sĩ
              </Link>
            </li>
          )}
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
            <Link to="/changepass" onClick={handleOptionClick}>
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
