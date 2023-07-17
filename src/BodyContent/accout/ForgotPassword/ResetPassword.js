import React, { useState, useEffect } from 'react';
import './ForgotPassword.scss';
import axios from 'axios';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Lấy token từ URL khi component được render
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Kiểm tra xem token có tồn tại không
    if (!token) {
      setErrorMessage('Token không hợp lệ.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Lấy token từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Kiểm tra xem token có tồn tại không
    if (!token) {
      setErrorMessage('Token không hợp lệ.');
      return;
    }

    // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp không
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu và mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/changepass', { token, password });

      if (response.status === 200) {
        setSuccessMessage('Đặt lại mật khẩu thành công.');
      } else {
        setErrorMessage('Đặt lại mật khẩu thất bại.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Đặt lại mật khẩu thất bại.');
    }
  };

  if (errorMessage) {
    return (
      <div id="ResetPassword" className="reset-password-container">
        <p className="error-message">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div id="ResetPassword" className="reset-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Đặt lại mật khẩu</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Đặt lại mật khẩu</button>
      </form>
    </div>
  );
}