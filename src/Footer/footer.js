// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <div className="footer-column">
          <h3>Company name</h3>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
          <div className="social-icons">
            <a href="/" className="social-icon"><FaFacebookF /></a>
            <a href="/" className="social-icon"><FaTwitter /></a>
            <a href="/" className="social-icon"><FaGoogle /></a>
            <a href="/" className="social-icon"><FaInstagram /></a>
            <a href="/" className="social-icon"><FaLinkedin /></a>
            <a href="/" className="social-icon"><FaGithub /></a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Products</h3>
          <p><a href="/" className="text-reset">Angular</a></p>
          <p><a href="/" className="text-reset">React</a></p>
          <p><a href="/" className="text-reset">Vue</a></p>
          <p><a href="/" className="text-reset">Laravel</a></p>
        </div>
        <div className="footer-column">
          <h3>Useful links</h3>
          <p><a href="/" className="text-reset">Pricing</a></p>
          <p><a href="/" className="text-reset">Settings</a></p>
          <p><a href="/" className="text-reset">Orders</a></p>
          <p><a href="/" className="text-reset">Help</a></p>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <p><i className="fas fa-home me-3"></i> Bình Định</p>
          <p><i className="fas fa-envelope me-3"></i> lucdq@gmail.com</p>
          <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
      </section>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
