import React, { useState } from 'react';

function AdminUpdateDoctor() {
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: 'Nguyễn Văn A',
        idCard: '123456789',
        gender: 'Nam',
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

    const handleCancel = () => {
        // TODO: Handle cancel logic, such as resetting the form or redirecting to another page
    };

    return (
        <div>
            <h2>Cập nhật thông tin bác sĩ</h2>
            <form onSubmit={handleSubmit}>
                {/* Trường nhập liệu: Họ tên */}
                <div className="form-group">
                    <label>Họ tên:</label>
                    <input type="text" value={doctorInfo.fullName} disabled />
                </div>

                {/* Trường nhập liệu: CMND/CCCD */}
                <div className="form-group">
                    <label>CMND/CCCD:</label>
                    <input type="text" value={doctorInfo.idCard} disabled />
                </div>

                {/* Trường nhập liệu: Giới tính */}
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

                {/* Trường nhập liệu: Ngày tháng năm sinh */}
                <div className="form-group">
                    <label>Ngày tháng năm sinh:</label>
                    <input
                        type="date"
                        name="dob"
                        value={doctorInfo.dob}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Số điện thoại */}
                <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={doctorInfo.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Email */}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={doctorInfo.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Địa chỉ */}
                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={doctorInfo.address}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Chuyên ngành */}
                <div className="form-group">
                    <label>Chuyên ngành:</label>
                    <input
                        type="text"
                        name="specialization"
                        value={doctorInfo.specialization}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Bằng cấp */}
                <div className="form-group">
                    <label>Bằng cấp:</label>
                    <input
                        type="text"
                        name="qualification"
                        value={doctorInfo.qualification}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Kinh nghiệm làm việc */}
                <div className="form-group">
                    <label>Kinh nghiệm làm việc:</label>
                    <input
                        type="text"
                        name="experience"
                        value={doctorInfo.experience}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Mật khẩu */}
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={doctorInfo.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Trường nhập liệu: Hình ảnh */}
                <div className="form-group">
                    <label>Hình ảnh:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>

                <button type="submit">Cập nhật</button>
                <button type="button" onClick={handleCancel}>Hủy bỏ</button> {/* Nút "Hủy bỏ" */}
            </form>
        </div>
    );
}

export default AdminUpdateDoctor;
