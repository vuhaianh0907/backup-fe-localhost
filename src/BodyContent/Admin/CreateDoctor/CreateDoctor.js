import React, { useState, useEffect } from 'react';
import './CreateDoctor.scss';
import { useNavigate } from 'react-router-dom';
import axios from "configs/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminCreateDoctor() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'admin') {
        window.location.href = '/';
      }
    }
  }, []);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    idCard: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    qualification: '',
    experience: '',
  });

  const [accountInfo, setAccountInfo] = useState({
    password: '',
  });

  const [avatar, setAvatar] = useState(null);

  const handlePersonalChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleProfessionalChange = (event) => {
    const { name, value } = event.target;
    setProfessionalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAccountChange = (event) => {
    const { name, value } = event.target;
    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    if (
      personalInfo.fullName.trim() === '' ||
      personalInfo.idCard.trim() === '' ||
      personalInfo.gender === '' ||
      personalInfo.dateOfBirth === '' ||
      personalInfo.phone.trim() === '' ||
      personalInfo.email.trim() === '' ||
      personalInfo.address.trim() === '' ||
      professionalInfo.qualification.trim() === '' ||
      professionalInfo.experience.trim() === '' ||
      accountInfo.password.trim() === ''
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!avatar) {
      toast.error('Vui lòng chọn hình ảnh');
      return;
    }

    let avatarData = null;
    if (avatar) {
      avatarData = await convertImageToBase64(avatar);
    }

    setIsLoading(true);

    const formData = {
      personalInfo,
      professionalInfo,
      accountInfo,
      avatar: avatarData,
    };

    axios
      .post('admin/createdoctor', formData)
      .then((response) => {
        toast.success('Lưu thành công!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('Có lỗi xảy ra khi gửi yêu cầu đến server');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id="CreateDoctor" className="form1">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Hồ sơ bác sĩ</h2>
        <h3>Thông tin cá nhân</h3>
        {error !== null && <div className="error">{error}</div>}

        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Họ và tên:</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handlePersonalChange}
            placeholder="Nhập tên"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="idCard" className="form-label">CMND/CCCD:</label>
          <input
            type="text"
            className="form-control"
            id="idCard"
            name="idCard"
            value={personalInfo.idCard}
            onChange={handlePersonalChange}
            placeholder="Nhập CMND/CCCD"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Giới tính:</label>
          <div className="gender-options">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="gender-male"
                name="gender"
                value="Male"
                checked={personalInfo.gender === 'Male'}
                onChange={handlePersonalChange}
              />
              <label htmlFor="gender-male" className="form-check-label">Nam</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="gender-female"
                name="gender"
                value="Female"
                checked={personalInfo.gender === 'Female'}
                onChange={handlePersonalChange}
              />
              <label htmlFor="gender-female" className="form-check-label">Nữ</label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfBirth">Ngày sinh:</label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={handlePersonalChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handlePersonalChange}
            placeholder="Nhập email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={personalInfo.address}
            onChange={handlePersonalChange}
            placeholder="Nhập địa chỉ"
          />
        </div>

        <hr />
        <h3>Thông tin chuyên môn</h3>

        <div className="mb-3">
          <label htmlFor="qualification">Bằng cấp:</label>
          <input
            type="text"
            className="form-control"
            id="qualification"
            name="qualification"
            value={professionalInfo.qualification}
            onChange={handleProfessionalChange}
            placeholder="Nhập bằng cấp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="experience">Kinh nghiệm:</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            value={professionalInfo.experience}
            onChange={handleProfessionalChange}
            placeholder="Nhập kinh nghiệm"
          />
        </div>

        <hr />
        <h3>Thông tin tài khoản</h3>

        <div className="mb-3">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={accountInfo.password}
            onChange={handleAccountChange}
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div>
          <span className="file-input btn btn-primary btn-file">
            Chọn hình ảnh&hellip;
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
            />
          </span>

          {avatar && (
            <span className="ml-2">&nbsp;Đã chọn ảnh: {avatar.name}</span>
          )}
        </div>

        <div className="image-preview">
          {avatar && (
            <div>
              <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang lưu...' : 'Xác nhận thông tin'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-border" role="status"></div>
            <p className="loading-message">Đang lưu...</p>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default AdminCreateDoctor;
