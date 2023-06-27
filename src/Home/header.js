import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-01-01.png';

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state isLoggedIn và hàm setIsLoggedIn

    const handleLogout = () => {
        setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    };

    return (
        <div className="nav">
            <nav>
                <ul className="nav-list">
                    <li className="nav-list--logo">
                        <a href="/">
                            <img src={logo} className="App-logo" alt="logo" />
                        </a>
                    </li>
                    <li className="nav-list--element">
                        <a href="/Banner">Banner</a>
                    </li>
                    <li className="nav-list--element nav-list--element-right">
                        <a href="/Booking">Booking</a>
                    </li>
                    <li className="nav-list--element">
                        <a href="/Doctor">Doctor</a>
                    </li>
                    <li className="nav-list--element">
                        <a href="/crDoc">crDoc</a>
                    </li>
                    <li className="nav-list--element">
                        <a href="/Worksheet">View Worksheet</a>
                    </li>
                </ul>

                <div className="nav-list--prior">
                    {isLoggedIn ? (
                        <div>
                            <div>Xin chào! Bạn đã đăng nhập thành công.</div>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <a href="/Login">Login</a>
                    )}
                </div>
            </nav>
        </div>
    );
}
