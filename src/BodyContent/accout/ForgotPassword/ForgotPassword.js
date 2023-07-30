import React, { useEffect, useState } from "react";

import './ForgotPassword.scss';
import axios from "configs/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect (() =>{
    if (user !== null){
      window.location.href = '/';
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('auth/forgetpassword', { email });
      if (response.status === 200) {
        alert('Vui lòng kiểm tra email để đặt lại mật khẩu.');
      } else {
        alert('Gửi yêu cầu đặt lại mật khẩu thất bại.');
      }
    } catch (error) {
      console.error('Error sending reset password request:', error);
      alert('Gửi yêu cầu đặt lại mật khẩu thất bại.');
    }
  };

  return (
    <div id="ForgotPassword" >
      <form className="card shadow-2-strong" style={{ borderRadius: '1rem' }} onSubmit={handleSubmit}>
        <h2>Quên mật khẩu</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit" name="action" value="reset">
          Đặt lại mật khẩu
        </button>
        <div className="back-to-login">
          <a href="/login" className="register-link">
            Quay lại đăng nhập
          </a>
        </div>
      </form>
    </div>
  );
}