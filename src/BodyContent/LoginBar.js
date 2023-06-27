import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './LoginBar.css';

export default function LoginBar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = (response) => {
    // Lưu trữ token vào session storage
    sessionStorage.setItem('token', response.data.token);
    // Thực hiện các hành động khác sau khi đăng nhập thành công
    // Chuyển hướng đến trang đăng nhập
    window.location.href = '/';
    console.log('Logged in successfully');
  };

  const handleLoginFailure = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    };

    axios.post('https://dencelclinic.onrender.com/api/auth/login', data)
      .then(handleLoginSuccess)
      .catch(handleLoginFailure);
  };

  const handleGoogleLoginSuccess = (response) => {
    // Xử lý thành công khi đăng nhập bằng tài khoản Google
    // Gửi thông tin đăng nhập thành công lên server hoặc thực hiện hành động khác
    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    // Xử lý khi đăng nhập bằng tài khoản Google thất bại
    console.log(error);
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h3>Login Here</h3>

      <div className='form-group'>
        <label htmlFor='email'></label>
        <input
          type='email'
          placeholder='Email'
          id='email'
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='password'></label>
        <input
          type='password'
          placeholder='Password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <button type='submit'>Log In</button>

      <div className='login-links'>
        <a href='/register'>Register</a>
        <a href='/forgot-password'>Forgot Password</a>
      </div>

      <div className='social'>
        <GoogleLogin
          clientId='YOUR_GOOGLE_CLIENT_ID'
          buttonText='Google'
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </form>
  );
}