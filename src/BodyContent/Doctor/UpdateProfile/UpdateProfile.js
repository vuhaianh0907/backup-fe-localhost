import React, { useState } from 'react';
import './UpdateProfile.css';

function DoctorUpdateProfile() {
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: 'Nguyễn Văn A',
        idCard: '123456789',
        gender: 'Nam',
        dob: '1990-01-01',
        email: 'example@gmail.com',
        phoneNumber: '0123456789',
        address: 'Địa chỉ của bác sĩ',
        specialization: 'Răng hàm mặt',
        qualifications: ['Đại học răng hàm mặt chuyên khoa', 'Bằng cử nhân ăn vạ'], // Mẫu bằng cấp
        experience: '5 năm',
    });

    const [newQualifications, setNewQualifications] = useState([]);
    const [experience, setExperience] = useState(doctorInfo.experience); // Trường kinh nghiệm làm việc

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDoctorInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleAddQualification = () => {
        if (newQualifications.length < 5) { // Giới hạn số lượng ô bằng cấp là 5
            setNewQualifications((prevQualifications) => [...prevQualifications, '']);
        }
    };

    const handleQualificationChange = (index, value) => {
        setNewQualifications((prevQualifications) => {
            const updatedQualifications = [...prevQualifications];
            updatedQualifications[index] = value;
            return updatedQualifications;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedQualifications = [...doctorInfo.qualifications, ...newQualifications];
        setDoctorInfo((prevInfo) => ({
            ...prevInfo,
            qualifications: updatedQualifications,
        }));
        // TODO: Handle form submission logic
    };

    return (
        <div className="form1">
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Cập nhật thông tin cá nhân</h2>
                <div className="form-group">
                    <label className="form-label">Họ tên:</label>
                    <input type="text" value={doctorInfo.fullName} disabled className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">CMND/CCCD:</label>
                    <input type="text" value={doctorInfo.idCard} disabled className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Giới tính:</label>
                    <input type="text" value={doctorInfo.gender} disabled className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Ngày tháng năm sinh:</label>
                    <input type="text" value={doctorInfo.dob} disabled className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="text" value={doctorInfo.email} disabled className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Số điện thoại:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={doctorInfo.phoneNumber}
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
                    <label className="form-label">Chuyên ngành:</label>
                    <input
                        type="text"
                        value={doctorInfo.specialization}
                        name="specialization"
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Bằng cấp:</label>
                    {doctorInfo.qualifications.map((qualification, index) => (
                        <div key={index}>{qualification}</div>
                    ))}
                    {newQualifications.map((qualification, index) => (
                        <div key={index} className="add-qualification">
                            <input
                                type="text"
                                value={qualification}
                                onChange={(event) => handleQualificationChange(index, event.target.value)}
                                className="form-input"
                            />
                        </div>
                    ))}
                    {newQualifications.length < 5 && (
                        <button type="button" onClick={handleAddQualification}>
                            Thêm bằng cấp
                        </button>
                    )}
                </div>
                <div className="form-group">
                    <label className="form-label">Kinh nghiệm làm việc:</label>
                    <input
                        type="text"
                        value={experience}
                        onChange={(event) => setExperience(event.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default DoctorUpdateProfile;
