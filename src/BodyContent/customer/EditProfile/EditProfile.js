import React, { useState, useEffect } from 'react';
import './EditProfile.scss';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`);
        const userData = response.data.customer;
        setUser(userData);
        setFullname(userData.fullname);
        setEmail(userData.email);
        setAddress(userData.address);
        setPhone(userData.phone);
        setGender(userData.gender);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        fullname,
        email,
        address,
        phone,
        gender,
      };
      await axios.post(`http://localhost:3000/api/account/customer/update?id=${id}`, updatedUser);
      console.log('User information updated');
      navigate(`/customer/profile/${id}`);
    } catch (error) {
      console.log('Error updating user information:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const isSaveDisabled = gender === '';

  return (

    <div id="EditProfile" className='editprofile mb-3'>
      
      <form  class="form-container" style={{ borderRadius: '1rem' }} onSubmit={handleFormSubmit}>
        <h2 className="edit-profile__title">Chỉnh sửa thông tin</h2>

        <div id="UpdateProfile" className="update-profile-container" />
        <div class="mb-3">
          <label for="disabledTextInput" class="form-label">Họ và tên</label>
          <input type="text" id="fullname" className="edit-profile__input" placeholder="Disabled input" value={fullname} onChange={(e) => setFullname(e.target.value)} />

        </div>

        <div class="mb-3">
          <label htmlFor="email" className="edit-profile__label">Email</label>
          <input class="mb-3"
            type="email"
            id="email"
            className="edit-profile__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="address" className="edit-profile__label">Địa chỉ</label>
          <input class="mb-3"
            type="text"
            id="address"
            className="edit-profile__input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="phone" className="edit-profile__label">Điện thoại</label>
          <input class="mb-3"
            type="text"
            id="phone"
            className="edit-profile__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="gender" className="edit-profile__label">Giới tính</label>
          <select class="mb-3"
            id="gender"
            className="edit-profile__select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="order">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
        <button type="submit" className="edit-profile__button" disabled={isSaveDisabled}>Lưu thông tin</button>
      </form>
      </div>
      );
   
};


export default EditProfile;
