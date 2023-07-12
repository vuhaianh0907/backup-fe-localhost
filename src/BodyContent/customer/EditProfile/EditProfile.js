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
    <div className="container">
      <h2>Chỉnh sửa thông tin</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
          <label htmlFor="fullname" className="form-label">Họ và tên</label>
          <input
            type="text"
            id="fullname"
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="address" className="form-label">Địa chỉ</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="phone" className="form-label">Điện thoại</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="gender">Giới tính</label>
          <div className='form-check form-check-inline'>
            <input
              type="radio"
              name='gender'
              id="male"
              className="form-check-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <label class="form-check-label" for="male">
              Nam
            </label>
          </div>
          <div className='form-check form-check-inline mb-3'>
            <input
              type="radio"
              name='gender'
              id="female"
              className="form-check-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <label class="form-check-label" for="female">
              Nữ
            </label>
          </div>
        </div>
        <button type="submit" className="edit-profile__button">Lưu thông tin</button>
      </form>

      {showConfirmation && (
        <div className='mt-4'>
          <h3>Xác nhận lưu thông tin</h3>
          <div>
            <span>Họ và tên: </span>
            <span>{fullname}</span>
          </div>
          <div>
            <div>Email:</div>
            <div>{email}</div>
          </div>
          <div>
            <div>Địa chỉ:</div>
            <div>{address}</div>
          </div>
          <div>
            <div>Điện thoại:</div>
            <div>{phone}</div>
          </div>
          <div>
            <div>Giới tính:</div>
            <div>{gender}</div>
          </div>
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
