import React, { useState } from 'react';

function AdminCreateDoctor() {
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: '',
        idCard: '',
        gender: '',
        dob: '',
        phoneNumber: '',
        email: '',
        address: '',
        specialization: '',
        qualification: '',
        experience: '',
        password: '',
        image: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDoctorInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setDoctorInfo((prevInfo) => ({
            ...prevInfo,
            image: file,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Handle form submission logic
    };

    return (
        <div>
            <h2>Hồ sơ bác sĩ</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={doctorInfo.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>CMND/CCCD:</label>
                    <input
                        type="text"
                        name="idCard"
                        value={doctorInfo.idCard}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Giới tính:</label>
                    <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={doctorInfo.gender === 'Nam'}
                        onChange={handleChange}
                    />{' '}
                    Nam
                    <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={doctorInfo.gender === 'Nữ'}
                        onChange={handleChange}
                    />{' '}
                    Nữ
                </div>
                <div className="form-group">
                    <label>Ngày tháng năm sinh:</label>
                    <input
                        type="date"
                        name="dob"
                        value={doctorInfo.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={doctorInfo.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={doctorInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={doctorInfo.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Chuyên ngành:</label>
                    <input
                        type="text"
                        name="specialization"
                        value={doctorInfo.specialization}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Bằng cấp:</label>
                    <input
                        type="text"
                        name="qualification"
                        value={doctorInfo.qualification}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kinh nghiệm làm việc:</label>
                    <input
                        type="text"
                        name="experience"
                        value={doctorInfo.experience}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={doctorInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Hình ảnh:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Xác nhận thông tin</button>
            </form>
        </div>
    );
}

export default AdminCreateDoctor;
