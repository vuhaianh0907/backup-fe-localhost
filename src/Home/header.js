import logo from '../assets/images/logo-01-01.png';
import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
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
            <a href="/crDoc">crDoc</a>
          </li>
          <li className="nav-list--element">
            <a href="/Worksheet">View Worksheet</a>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="nav-list--prior">
            <a href="/Logout" onClick={handleLogout}>
              Logout
            </a>
          </div>
        ) : (
          <div className="nav-list--prior">
            <a href="/Login">Login</a>
          </div>
        )}
      </nav>
    </div>
  );
}