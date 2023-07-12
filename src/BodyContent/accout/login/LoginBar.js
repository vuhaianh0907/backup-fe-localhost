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

    axios.post('http://localhost:3000/api/auth/login', data)
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
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h2 className="mb-5">Đăng nhập</h2>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />

                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                  />

                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="btn btn-primary btn-lg btn-block" type="submit">Log In</button>

                <hr className="my-4" />

                <div className='social'>
                  <GoogleLogin
                    clientId='YOUR_GOOGLE_CLIENT_ID'
                    buttonText='Google'
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

