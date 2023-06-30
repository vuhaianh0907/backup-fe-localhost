import React, { useState } from 'react';

function AdminViewDoctorList() {
    const [doctorList, setDoctorList] = useState([
        { id: 1, name: 'Nguyễn Văn A', image: 'doctor1.jpg' },
        { id: 2, name: 'Trần Thị B', image: 'doctor2.jpg' },
        // Các bác sĩ khác
    ]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleDoctorClick = (doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div>
            <h2>Danh sách bác sĩ</h2>
            <ul>
                {doctorList.map((doctor) => (
                    <li key={doctor.id} onClick={() => handleDoctorClick(doctor)}>
                        <img src={doctor.image} alt={doctor.name} />
                        <span>{doctor.name}</span>
                    </li>
                ))}
            </ul>
            {selectedDoctor && (
                <div>
                    <h3>Thông tin chi tiết của bác sĩ: {selectedDoctor.name}</h3>
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} />
                    {/* Thêm các trường thông tin chi tiết khác */}
                </div>
            )}
        </div>
    );
}

export default AdminViewDoctorList;
