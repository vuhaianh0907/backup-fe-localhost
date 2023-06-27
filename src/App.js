import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './Home/header';
import Banner from './BodyContent/banner.js';
import Login from './BodyContent/LoginBar';
import Doctor from './BodyContent/Doctor';
import Register from './BodyContent/Register';
import ForgotPassword from './BodyContent/ForgotPassword';
import Footer from './Footer/footer';
import DocDetail from './BodyContent/DocDetail';
import Worksheet from './BodyContent/Worksheet';
import crDoc from './function/crDoc';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Thực hiện các hành động cần thiết khi logout
  };

  return (
    <Router>
      <div className='App'>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
          <Route path='/doctor' exact component={Doctor} />
          <Route path='/doctor/:id' component={DocDetail} />
          <Route path='/Login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/' exact component={Banner} />
          <Route path='/Worksheet' component={Worksheet} />
          <Route path='/crDoc' component={crDoc} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
