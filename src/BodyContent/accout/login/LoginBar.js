import React, { useEffect, useState } from "react";
import axios from "configs/axios";
import GoogleLogin from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginBar.scss';

export default function LoginBar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user !== null) {
      window.location.href = '/';
    }
  }, []);

  const showToastMessage = () => {
    toast.error('Login Failed, Incorrect email or password', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = (response) => {
    const userString = JSON.stringify(response.data.token);
    sessionStorage.setItem('token', userString);
    window.location.href = '/';
    console.log('Logged in successfully');
  };

  const handleLoginFailure = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
      showToastMessage();
    } else {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
      password: password,
    };

    axios
      .post('auth/login', data)
      .then(handleLoginSuccess)
      .catch(handleLoginFailure)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <div id="LoginBar">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className=" ">
          <div>
            <form className="card shadow-2-strong" style={{ borderRadius: '1rem' }} onSubmit={handleSubmit}>
              <div className="form-group">
                <h2>Đăng nhập</h2>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Nhập Mật khẩu"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>           
                <div className="login-links">
                  <div className="nutdangky col-6">
                  <a href="/register">Đăng ký</a>
                  </div>
               <div>
                <a href="/forgot-password">Quên mật khẩu</a>
                </div>
              </div>
              <div className="social">
                <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID"
                  buttonText="Google"
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  cookiePolicy={'single_host_origin'}
                  className="btn btn-primary btn-block"
                />
              </div>
            </form>

            {/* Phần loading */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-content">
                  <p>Loading..</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
