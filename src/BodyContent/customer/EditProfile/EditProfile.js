import React, { useState } from 'react';
import './EditProfile.css';

const user = {
  fullname: 'John Doe',
  email: 'johndoe@example.com',
  address: '123 Street, City',
  phone: '1234567890',
  gender: 'Male',
  createdAt: '2022-01-01',
  updatedAt: '2022-02-01',
  role: 'customer',
  balance: 1000,
};

const EditProfile = () => {
  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleConfirmationSave = () => {
    // Xử lý lưu thông tin
    console.log('Thông tin đã được lưu');
    setShowConfirmation(false);
  };

  return (
    <div className="edit-profile">
      <h2 className="edit-profile__title">Chỉnh sửa thông tin</h2>
      <form className="edit-profile__form" onSubmit={handleFormSubmit}>
        <div className="edit-profile__form-group">
          <label htmlFor="fullname" className="edit-profile__label">Họ và tên</label>
          <input
            type="text"
            id="fullname"
            className="edit-profile__input"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="edit-profile__form-group">
          <label htmlFor="email" className="edit-profile__label">Email</label>
          <input
            type="email"
            id="email"
            className="edit-profile__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="edit-profile__form-group">
          <label htmlFor="address" className="edit-profile__label">Địa chỉ</label>
          <input
            type="text"
            id="address"
            className="edit-profile__input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="edit-profile__form-group">
          <label htmlFor="phone" className="edit-profile__label">Điện thoại</label>
          <input
            type="text"
            id="phone"
            className="edit-profile__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="edit-profile__form-group">
          <label htmlFor="gender" className="edit-profile__label">Giới tính</label>
          <select
            id="gender"
            className="edit-profile__select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
        <button type="submit" className="edit-profile__button">Lưu thông tin</button>
      </form>

      {showConfirmation && (
        <div className="edit-profile__confirmation">
          <h3 className="edit-profile__confirmation-title">Xác nhận lưu thông tin</h3>
          <table className="edit-profile__confirmation-table">
            <tbody>
              <tr>
                <td>Họ và tên:</td>
                <td>{fullname}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Địa chỉ:</td>
                <td>{address}</td>
              </tr>
              <tr>
                <td>Điện thoại:</td>
                <td>{phone}</td>
              </tr>
              <tr>
                <td>Giới tính:</td>
                <td>{gender}</td>
              </tr>
            </tbody>
          </table>
          <div className="edit-profile__confirmation-buttons">
            <button className="edit-profile__confirmation-button edit-profile__confirmation-button--save" onClick={handleConfirmationSave}>
              Xác nhận
            </button>
            <button className="edit-profile__confirmation-button edit-profile__confirmation-button--cancel" onClick={handleConfirmationClose}>
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
