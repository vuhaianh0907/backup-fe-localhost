import React, { useState } from 'react';
import './CreateDoctor.scss';
import swal from 'sweetalert';
import axios from 'axios';

function AdminCreateDoctor() {
    const [error, setError] = useState(null);
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

        // Chuyển đổi hình ảnh sang base64
        let avatarData = null;
        if (avatar) {
            avatarData = await convertImageToBase64(avatar);
        }

        // Xử lý gửi form với dữ liệu đã chuyển đổi
        const formData = {
            personalInfo,
            professionalInfo,
            accountInfo,
            avatar: avatarData,
        };

        // Gửi dữ liệu đến server hoặc xử lý theo yêu cầu của bạn
        axios.post('http://localhost:3000/api/admin/createdoctor', formData)
            .then(response => {
                alert(response.data);
                // Xử lý kết quả từ server
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                    swal('Lỗi', error.response.data.error, 'error');
                } else {

                    swal('Lỗi', 'Có lỗi xảy ra khi gửi yêu cầu đến server', 'error');
                }
            });

        console.log(formData);
    };

    return (
        <div className='form1'>
            <div id="CreateDoctor" className="form1 mb-3">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2 className="mb-3">Hồ sơ bác sĩ</h2>
                    <h3 className="mb-3">Thông tin cá nhân</h3>
                    {error !== null && <div className="error">{error}</div>}

                    <div className="mb-3 mt-3">
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
                        <div className="d-flex">
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="Nam"
                                    checked={personalInfo.gender === 'Nam'}
                                    onChange={handlePersonalChange}
                                />
                                <label className="form-check-label" htmlFor="nam">Nam</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="Nữ"
                                    checked={personalInfo.gender === 'Nữ'}
                                    onChange={handlePersonalChange}
                                />
                                <label className="form-check-label" htmlFor="nu">Nữ</label>
                            </div>
                        </div>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">Ngày sinh:</label>
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
                        <label htmlFor="phone" className="form-label">Số điện thoại:</label>
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
                        <label htmlFor="email" className="form-label">Email:</label>
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
                        <label htmlFor="address" className="form-label">Địa chỉ:</label>
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

                    <h3 className="mb-3">Thông tin chuyên môn</h3>

                    <div className="mb-3">
                        <label htmlFor="qualification" className="form-label">Bằng cấp:</label>
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
                        <label htmlFor="experience" className="form-label">Kinh nghiệm:</label>
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

                    <h3 className="mb-3">Thông tin tài khoản</h3>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu:</label>
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

                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Chọn hình ảnh:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {avatar && (
                        <div>
                            <p>Đã chọn ảnh: {avatar.name}</p>
                            <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" className="mb-3" />
                        </div>
                    )}

                    <div className="action-buttons">
                        <button type="submit" className="btn btn-primary">Xác nhận thông tin</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default AdminCreateDoctor;
