import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../assets/images/logo-01-01.png';
import avatar from '../assets/images/avatar.jpg';
import './header.scss';

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = sessionStorage.getItem('token') !== null;

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    window.location.href = '/login';
  };

  const handleOptionClick = () => {
    setIsModalOpen(false);
  };

  return (
    // <div className="nav">
    //   <nav>
    //     <ul className="nav-list">
    //       <li className="nav-list--logo">
    //         <Link to="/">
    //           <img src={logo} className="App-logo" alt="logo" />
    //         </Link>
    //       </li>
    //       <li className="nav-list--element">
    //         <Link to="/admin/doctorlist">List Doctor</Link>
    //       </li>
    //       <li className="nav-list--element">
    //         <Link to="/admin/createslot">Create Slot</Link>
    //       </li>

    //     </ul>
    //     <div className="nav-list--prior">
    //       {isLoggedIn ? (
    //         <div className="avatar" onClick={() => setIsModalOpen(true)}>
    //           <img src={avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} />
    //         </div>
    //       ) : (
    //         <Link className='btn' to="/Login">Login</Link>
    //       )}
    //     </div>
    //   </nav>

    //   <Modal
    //     isOpen={isModalOpen}
    //     onRequestClose={() => setIsModalOpen(false)}
    //     contentLabel="Options Modal"
    //     className="options-modal"
    //   >
    //     <ul className="options-list">
    //       <li>
    //         <Link to="/customer/profile" onClick={handleOptionClick}>
    //           Xem thông tin cá nhân
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/admin/createdoctor" onClick={handleOptionClick}>
    //           Tạo Bác Sĩ
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/customer/profile/edit" onClick={handleOptionClick}>
    //           Chỉnh sửa thông tin
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/customer/treatmentprofile/treatment" onClick={handleOptionClick}>
    //           Xem hồ sơ bệnh
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/admin/changepass" onClick={handleOptionClick}>
    //           Đổi mật khẩu
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/logout" onClick={() => {
    //           handleLogout();
    //           handleOptionClick();
    //         }}
    //         >
    //           Đăng xuất
    //         </Link>
    //       </li>
    //     </ul>
    //   </Modal>
    // </div>
    <>
      <nav id="header" class="navbar navbar-expand-lg bg-dark">

        <div class="container-fluid">
          <a className="nav-list--logo">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              <li class="nav-item">
                <Link class="nav-link text-light" to="/admin/doctorlist">List Doctor</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-light" to="/admin/createslot">Create Slot</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                {isLoggedIn &&
                  <a class="nav-link disabled">Disabled</a>
                }
              </li>
            </ul>
            {/* <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}
            <div>
              {isLoggedIn ? (
                // <div className="avatar" onClick={() => setIsModalOpen(true)}>
                //   <img src={avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} />
                // </div>
                // <div class="nav-item dropdown">
                //   <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                //     <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle" />
                //   </a>
                //   <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                //     <a class="dropdown-item" href="#">Dashboard</a>
                //     <a class="dropdown-item" href="#">Edit Profile</a>
                //     <a class="dropdown-item" href="#">Log Out</a>
                //   </div>
                // </div>
                <div class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle" />
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
              ) : (
                <Link className='btn btn-primary' to="/Login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Options Modal"
        className="options-modal"
      >
        <ul className="options-list">
          <li>
            <Link to="/customer/profile" onClick={handleOptionClick}>
              Xem thông tin cá nhân
            </Link>
          </li>
          <li>
            <Link to="/admin/createdoctor" onClick={handleOptionClick}>
              Tạo Bác Sĩ
            </Link>
          </li>
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
            <Link to="/admin/changepass" onClick={handleOptionClick}>
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
    </>
  );
}
