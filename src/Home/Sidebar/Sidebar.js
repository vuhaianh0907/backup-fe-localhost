import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGauge, faHouse, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
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
    // <nav className={`msb ${isSidebarOpen ? '' : 'msb-closed'}`}>
    //   <div >
    //     <a href="#" onClick={toggleSidebar}>
    //       <FontAwesomeIcon icon={faBars} />
    //     </a>
    //   </div>
    //   <div className="navbar-header">
    //     <div className="brand-wrapper">
    //       <div className="brand-name-wrapper">
    //         <a className="navbar-brand" href="#">
    //           Menu
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="side-menu-container">
    //     <ul className="nav navbar-nav">
    //       <li><a href="/customer/listdoctor"><i className="fa fa-dashboard"></i> List Doctor </a></li>
    //       <li className="active"><a href="#"><i className="fa fa-puzzle-piece"></i> Components</a></li>
    //       <li><a href="#"><i className="fa fa-heart"></i> Extras</a></li>
    //       <li className="panel panel-default" id="dropdown">
    //         <a data-toggle="collapse" href="#dropdown-lvl1">
    //           <i className="fa fa-diamond"></i> Apps
    //           <span className="caret"></span>
    //         </a>
    //         <div id="dropdown-lvl1" className="panel-collapse collapse">
    //           <div className="panel-body">
    //             <ul className="nav navbar-nav">
    //               <li><a href="#">Mail</a></li>
    //               <li><a href="#">Calendar</a></li>
    //               <li><a href="#">Ecommerce</a></li>
    //               <li><a href="#">User</a></li>
    //               <li><a href="#">Social</a></li>
    //               <li className="panel panel-default" id="dropdown">
    //                 <a data-toggle="collapse" href="#dropdown-lvl2">
    //                   <i className="glyphicon glyphicon-off"></i> Sub Level
    //                   <span className="caret"></span>
    //                 </a>
    //                 <div id="dropdown-lvl2" className="panel-collapse collapse">
    //                   <div className="panel-body">
    //                     <ul className="nav navbar-nav">
    //                       <li><a href="#">Link</a></li>
    //                       <li><a href="#">Link</a></li>
    //                       <li><a href="#">Link</a></li>
    //                     </ul>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </li>
    //       <li><a href="#"><span className="glyphicon glyphicon-signal"></span> Link</a></li>
    //     </ul>
    //   </div>

    // </nav>
    <div id='sidebar' className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <Link className="logo" to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <span className="fs-4">ABC</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">

        {(user && user.role === 'admin') &&
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faHouse} className='mr-2' />
              <span className='ml-2'>Home</span>
            </Link>
          </li>}

        {(user && user.role === 'doctor') &&
          <li className="nav-item">
            <Link to="/abc" className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faHouse} className='mr-2' />
              <span className='ml-2'>hohohoho</span>
            </Link>
          </li>}

        <li>
          <Link to="/" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faGauge} className='mr-2' />
            <span className='ml-2'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faUserDoctor} className='mr-2' />
            <span className='ml-2'>Doctor List</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faUserDoctor} className='mr-2' />
            <span className='ml-2'>Appointment List</span>
          </Link>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg> */}
            Treatment Profile List
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg> */}
            Momo
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
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li>
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
