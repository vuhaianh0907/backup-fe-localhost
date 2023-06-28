import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Navigation from './Home/header';
import Banner from './BodyContent/banner/banner.js';
import Login from './BodyContent/accout/login/LoginBar';
import Doctor from './BodyContent/Doctor';
import Register from './BodyContent/accout/Register/Register';
import ForgotPassword from './BodyContent/accout/ForgotPassword/ForgotPassword';
import Footer from './Footer/footer';
import DocDetail from './BodyContent/DocDetail';
import Worksheet from './BodyContent/Worksheet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Thực hiện các hành động cần thiết khi logout
  };

  return (
    
      <div className='App'>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path='/doctor' exact element={<Doctor/>} />
          <Route path='/doctor/:id' element={<DocDetail/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/' exact element={<Banner/>} />
          <Route path='/Worksheet' element={<Worksheet/>} />
          
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;
