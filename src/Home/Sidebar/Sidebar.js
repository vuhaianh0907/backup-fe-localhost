import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendarCheck, faCalendarPlus, faChartLine, faGauge, faHouse, faMoneyBill, faMoneyBillTransfer, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

import logo from '../../assets/images/logo-01-01.png';

const Sidebar = () => {
  // const [isSidebarOpen, setSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    window.location.href = '/login';
  };

  return (

    <div id='sidebar' className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <Link className="logo" to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        {/* <span className="fs-4">ABC</span> */}
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                <FontAwesomeIcon icon={faHouse} className='mr-2' />
                <span className='ml-2'>Home</span>
              </Link>

            </li>

        {(user && user.role === 'admin') &&
          <>
            
            <li>
              <Link to="/admin/doctorlist" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faUserDoctor} className='mr-2' />
                <span className='ml-2'>List Doctor</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faChartLine} className='mr-2' />
                <span className='ml-2'>dashboard</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/admin/createslot" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faCalendarPlus} className='mr-2' />
                <span className='ml-2'>Create Slot</span>
              </Link>
            </li> */}
            <li>
              <Link to="/admin/transaction" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faGauge} className='mr-2' />
                <span className='ml-2'>Transaction</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/addamount" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faMoneyBillTransfer} className='mr-2' />
                <span className='ml-2'>Add amount</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/amount" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faMoneyBill} className='mr-2' />
                <span className='ml-2'>Update price bill</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/createdoctor" className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faMoneyBill} className='mr-2' />
                <span className='ml-2'>Tạo Bác Sĩ</span>
              </Link>
            </li>

          </>

        }

        {(user && user.role === 'doctor') &&
          <>

            <li>
              <Link to={`/Doctorviewbooking/${user.id}`} className="nav-link" aria-current="page">
                <FontAwesomeIcon icon={faCalendarCheck} className='mr-2' />
                <span className='ml-2'>Appointment</span>
              </Link>
            </li>

          </>
        }


        {/* <li>
          <Link to="/" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faGauge} className='mr-2' />
            <span className='ml-2'>Dashboard</span>
          </Link>
        </li> */}
        {/* <li>
          <Link to="/" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faUserDoctor} className='mr-2' />
            <span className='ml-2'>Doctor List</span>
          </Link>
        </li> */}
        {/* <li>
          <Link to="/" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faUserDoctor} className='mr-2' />
            <span className='ml-2'>Appointment List</span>
          </Link>
        </li> */}
        <li>
          <a href="#" className="nav-link text-white">
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg> */}
         
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg> */}
            
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li>
                      <Link
                        to={`/doctor/updateprofile/${user.id}`}
                      
                        className="dropdown-item"
                      >
                        Chỉnh sửa thông tin
                      </Link>
                    </li>
          
          <li>
                      <Link
                        to="/changepass"
                        className="dropdown-item"
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>
          <li>
          <li><hr className="dropdown-divider" /></li>
         
            <Link
              to="/logout"
              onClick={() => {
                handleLogout();
              }}
              className="dropdown-item"
            >
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
