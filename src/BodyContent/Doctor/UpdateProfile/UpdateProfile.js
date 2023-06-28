import React, { useState } from 'react';

function DoctorUpdateProfile() {
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: 'Nguyễn Văn A',
        idCard: '123456789',
        gender: 'Nam',
        dob: '1990-01-01',
        email: 'example@gmail.com',
        specialization: 'Răng hàm mặt',
        qualifications: [],
    });

    const [newQualification, setNewQualification] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDoctorInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleAddQualification = () => {
        if (newQualification.trim() !== '') {
            setDoctorInfo((prevInfo) => ({
                ...prevInfo,
                qualifications: [...prevInfo.qualifications, newQualification],
            }));
            setNewQualification('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Handle form submission logic
    };

    return (
        <div>
            <h2>Cập nhật thông tin cá nhân</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Họ tên:</label>
                    <input type="text" value={doctorInfo.fullName} disabled />
                </div>
                <div className="form-group">
                    <label>CMND/CCCD:</label>
                    <input type="text" value={doctorInfo.idCard} disabled />
                </div>
                <div className="form-group">
                    <label>Giới tính:</label>
                    <input type="text" value={doctorInfo.gender} disabled />
                </div>
                <div className="form-group">
                    <label>Ngày tháng năm sinh:</label>
                    <input type="text" value={doctorInfo.dob} disabled />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" value={doctorInfo.email} disabled />
                </div>
                <div className="form-group">
                    <label>Chuyên ngành:</label>
                    <input type="text" value={doctorInfo.specialization} disabled />
                </div>
                <div className="form-group">
                    <label>Bằng cấp:</label>
                    {doctorInfo.qualifications.map((qualification, index) => (
                        <div key={index}>{qualification}</div>
                    ))}
                    <div>
                        <input
                            type="text"
                            value={newQualification}
                            onChange={(event) => setNewQualification(event.target.value)}
                        />
                        <button type="button" onClick={handleAddQualification}>
                            Thêm bằng cấp
                        </button>
                    </div>
                </div>
                {/* Các trường thông tin khác */}
                <button type="submit">Cập nhật</button>
            </form>
        </div>
    );
}

export default DoctorUpdateProfile;
