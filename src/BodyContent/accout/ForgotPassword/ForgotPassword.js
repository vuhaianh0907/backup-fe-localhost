import React, { useState } from 'react';
import './ForgotPassword.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện xử lý gửi email đặt lại mật khẩu với địa chỉ email đã nhập
    // Trong ví dụ này, chỉ kiểm tra email hợp lệ để đơn giản
    if (!validateEmail(email)) {
      setErrorMessage('Email không hợp lệ');
      return;
    }
    // Tiến hành gửi email đặt lại mật khẩu...
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Quên mật khẩu</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" name="action" value="reset">
          Đặt lại mật khẩu
        </button>
        <div className='back-to-login'>
          <a href="/login" className='login-link'>
            Quay lại đăng nhập
          </a>
        </div>
      </form>
    </div>
  );
}
