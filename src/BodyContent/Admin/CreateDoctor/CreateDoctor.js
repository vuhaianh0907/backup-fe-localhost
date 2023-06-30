import React, { useState } from 'react';
import './CreateDoctor.css';

function AdminCreateDoctor() {
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
        // Xử lý thay đổi hình ảnh
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý gửi form
    };

    return (
        <div className="form1">

            <form onSubmit={handleSubmit} className="form-container">
                <h2>Hồ sơ bác sĩ</h2>
                <h3>Thông tin cá nhân</h3>

                <label htmlFor="fullName"></label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalChange}
                    placeholder="Nhập tên"
                />


                <label htmlFor="idCard"></label>
                <input
                    type="text"
                    id="idCard"
                    name="idCard"
                    value={personalInfo.idCard}
                    onChange={handlePersonalChange}
                    placeholder="Nhập CMND/CCCD"
                />


                <label></label>
                <div className="gender-options">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Nam"
                            checked={personalInfo.gender === 'Nam'}
                            onChange={handlePersonalChange}
                        />{' '}
                        Nam
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Nữ"
                            checked={personalInfo.gender === 'Nữ'}
                            onChange={handlePersonalChange}
                        />{' '}
                        Nữ
                    </label>

                </div>

                <label htmlFor="dateOfBirth"></label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalChange}
                />


                <label htmlFor="phone"></label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalChange}
                    placeholder="Nhập số điện thoại"
                />


                <label htmlFor="email"></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalChange}
                    placeholder="Nhập email"
                />


                <label htmlFor="address"></label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalChange}
                    placeholder="Nhập địa chỉ"
                />


                <h3>Thông tin chuyên môn</h3>

                <label htmlFor="qualification"></label>
                <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={professionalInfo.qualification}
                    onChange={handleProfessionalChange}
                    placeholder="Nhập bằng cấp"
                />


                <label htmlFor="experience"></label>
                <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={professionalInfo.experience}
                    onChange={handleProfessionalChange}
                    placeholder="Nhập kinh nghiệm"
                />


                <h3>Thông tin tài khoản</h3>

                <label htmlFor="password">Mật khẩu:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={accountInfo.password}
                    onChange={handleAccountChange}
                    placeholder="Nhập mật khẩu"
                />



                <label htmlFor="avatar">Chọn hình ảnh:</label>
                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <div className="action-buttons">
                    <button type="submit">Xác nhận thông tin</button>
                </div>
            </form>
        </div>
    );
}

export default AdminCreateDoctor;
