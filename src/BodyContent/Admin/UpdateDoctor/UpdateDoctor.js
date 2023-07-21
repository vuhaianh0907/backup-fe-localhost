import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import './UpdateDoctor.scss'; // Custom styles

function AdminUpdateDoctor() {
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
    password: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { doctorId } = useParams();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/admin/getDoctor?doctorId=${doctorId}`);
        const doctorData = response.data.doctor;
        setDoctorInfo(doctorData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctorInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      try {
        setIsLoading(true);
        await axios.post(`http://localhost:3000/api/account/doctor/update?doctorId=${doctorId}`, doctorInfo);
        window.location.href = `http://localhost:3001/admin/doctordetail/${doctorId}`;
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // TODO: Handle cancellation logic, such as resetting the form or redirecting to another page
    }
  };

  return (
    <div id="UpdateDoctor" className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Cập nhật thông tin bác sĩ</h2>
          <div className="form-group">
            <label htmlFor="fullname">Họ tên:</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={doctorInfo.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idCard">CMND/CCCD:</label>
            <input
              type="text"
              className="form-control"
              id="idCard"
              name="idCard"
              value={doctorInfo.idCard}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Giới tính:</label>
            <div className="gender-options">
              
                <input
                  type="radio"
                  className="form-check-input"
                  id="genderMale"
                  name="gender"
                  value="Nam"
                  checked={doctorInfo.gender === 'Nam'}
                  onChange={handleChange}
                />
                <span>  Nam</span>
              <br/>
              
                <input
                  type="radio"
                  className="form-check-input"
                  id="genderFemale"
                  name="gender"
                  value="Nữ"
                  checked={doctorInfo.gender === 'Nữ'}
                  onChange={handleChange}
                />
                <span>  Nữ</span>
              
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Ngày tháng năm sinh:</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={doctorInfo.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={doctorInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={doctorInfo.email}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={doctorInfo.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Bằng cấp:</label>
            <input
              type="text"
              className="form-control"
              id="qualification"
              name="qualification"
              value={doctorInfo.qualification}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Kinh nghiệm làm việc:</label>
            <input
              type="text"
              className="form-control"
              id="experience"
              name="experience"
              value={doctorInfo.experience}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Cập nhật
            </button>
            <button type="button" className="btn btn-danger" onClick={handleCancel}>
              Hủy bỏ
            </button>
          </div>
        </form>
      )}

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn cập nhật/hủy bỏ?</p>
            <button className="btn btn-success" onClick={() => handleConfirmation(true)}>
              Cập nhật
            </button>
            <button className="btn btn-danger" onClick={() => handleConfirmation(false)}>
              Hủy bỏ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUpdateDoctor;