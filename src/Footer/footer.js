// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <div className="footer-column">
          <h3>Tên Công ty</h3>
          <p>
            Chúng tôi là một phòng khám nha khoa uy tín, chuyên cung cấp dịch vụ chăm sóc răng miệng
            với đội ngũ chuyên gia giàu kinh nghiệm. Chúng tôi cam kết mang đến cho bạn một nụ cười
            tự tin và răng miệng khỏe mạnh.
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
          <h3>Sản phẩm</h3>
          <p><a href="/" className="text-reset">Trồng răng Implant</a></p>
          <p><a href="/" className="text-reset">Niềng răng</a></p>
          <p><a href="/" className="text-reset">Tẩy trắng răng</a></p>
          <p><a href="/" className="text-reset">Chữa bệnh nướu</a></p>
        </div>
        <div className="footer-column">
          <h3>Liên kết hữu ích</h3>
          <p><a href="/" className="text-reset">Bảng giá dịch vụ</a></p>
          <p><a href="/" className="text-reset">Cài đặt</a></p>
          <p><a href="/" className="text-reset">Đặt hẹn khám</a></p>
          <p><a href="/" className="text-reset">Trợ giúp</a></p>
        </div>
        <div className="footer-column">
          <h3>Liên hệ</h3>
          <p><i className="fas fa-home me-3"></i> Địa chỉ: Hà Nội</p>
          <p><i className="fas fa-envelope me-3"></i> Email: cotienrangfpt@gmail.com</p>
          <p><i className="fas fa-phone me-3"></i> Điện thoại: + 01 234 567 88</p>
          <p><i className="fas fa-print me-3"></i> Fax: + 01 234 567 89</p>
        </div>
      </section>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Phòng Khám Nha Khoa. Bản quyền thuộc về chúng tôi.</p>
      </div>
    </footer>
  );
};

export default Footer;
