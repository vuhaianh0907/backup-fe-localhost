import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "configs/axios";
import './UpdateProfile.scss';

function DoctorUpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctorInfo, setDoctorInfo] = useState({
    fullname: '',
    idCard: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    qualification: '',
    experience: '',
  });

  const [loading, setLoading] = useState(true);

  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'doctor') {
        window.location.href = '/';
      }
    }
  });

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorPromise = await axios.get(`account/doctor/details?id=${id}`);
        const doctorData = doctorPromise.data.doctor;
        setDoctorInfo(doctorData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching doctor info:', error);
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctorInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await axios.post(`account/doctor/update?doctorId=${id}`, doctorInfo);
      setLoading(false);
      navigate(`/doctor/profile/${id}`);
    } catch (error) {
      console.log('Error updating doctor info:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div id="UpdateProfile" className="update-profile">
      <form onSubmit={handleSubmit} className="form">
        <h2>Cập nhật thông tin cá nhân</h2>
        <div className="form-group">
          <label className="form-label">Họ tên:</label>
          <input
            type="text"
            name="fullname"
            value={doctorInfo.fullname}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">CMND/CCCD:</label>
          <input
            type="text"
            name="idCard"
            value={doctorInfo.idCard}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Giới tính:</label>
          <select
            name="gender"
            value={doctorInfo.gender}
            onChange={handleChange}
            className="form-input select-input"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Ngày tháng năm sinh:</label>
          <input
            type="text"
            name="dateOfBirth"
            value={doctorInfo.dateOfBirth}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="text"
            name="email"
            value={doctorInfo.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={doctorInfo.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={doctorInfo.address}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Bằng cấp:</label>
          <input
            type="text"
            name="qualification"
            value={doctorInfo.qualification}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Kinh nghiệm làm việc:</label>
          <input
            type="text"
            name="experience"
            value={doctorInfo.experience}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Cập nhật
        </button>
        <Link to={`/doctor/profile/${id}`} className="cancel-button">
          Hủy
        </Link>
      </form>
    </div>
  );
}

export default DoctorUpdateProfile;
