import React, { useState } from 'react';
import Modal from 'react-modal';

function AdminViewDocDetail() {
    const doctorList = [
        {
            id: 1,
            name: "Bác sĩ Ninh Thị Huê",
            image: "doctor1.jpg",
            certificates: [
                "Chứng chỉ chỉnh hình hàm mặt của Viện đào tạo răng hàm mặt trường Đại học Y Hà Nội",
                "Chứng chỉ implant Neobiotech tại Hàn Quốc"
            ],
            education: "Tốt nghiệp Bác sĩ Răng Hàm Mặt, trường Đại học Y Hà Nội (2005-2011)",
            experience: [
                "Bác sĩ tại Nha khoa và Da thẩm mỹ Quốc tế DND 124 Xã Đàn – Đống Đa – Hà Nội (2017 đến nay)",
                "Bác sĩ tại Nha khoa Shinbi Dental – 33 Trần Quốc Toản – Hoàn Kiếm – Hà Nội (2016-2017)",
                "Bác sĩ tại Nha khoa Smilecare – 30 Nguyên Hồng – Đống Đa – Hà Nội (2014-2015)",
                "Bác sĩ tại Nha khoa Kiểu Mẫu - Linh Đàm - Hà Nội (2011-2013)"
            ],
            specialties: [
                "Nha khoa tổng quát",
                "Nội nha",
                "Tiểu phẫu",
                "Nha khoa phục hồi",
                "Phục hình răng",
                "Phục hình implant",
                "Mất 1 răng cửa hoặc răng hàm",
                "Mất nhiều răng liền kề hoặc không liền kề",
                "Mất răng 1 hàm hoặc 2 hàm"
            ]
        },
        // Thêm thông tin của các bác sĩ khác vào danh sách
    ];

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isWorkingHoursModalOpen, setIsWorkingHoursModalOpen] = useState(false);

    const handleShowDoctorDetail = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleEditDoctorInfo = () => {
        setIsEditModalOpen(true);
    };

    const handleEditWorkingHours = () => {
        setIsWorkingHoursModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setIsWorkingHoursModalOpen(false);
    };

    return (
        <div>
            <h2>Admin View Doc Detail</h2>

            {selectedDoctor && (
                <div>
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} />
                    <h3>{selectedDoctor.name}</h3>
                    <p>Ngày khám: 29/06/2023</p>
                    <p>Các slot khám:</p>
                    <ul>
                        <li>7:00 - 8:00</li>
                        <li>8:00 - 9:00</li>
                        <li>9:00 - 10:00</li>
                        <li>10:00 - 11:00</li>
                        <li>13:00 - 14:00</li>
                        <li>14:00 - 15:00</li>
                        <li>15:00 - 16:00</li>
                        <li>16:00 - 17:00</li>
                    </ul>
                    <div>
                        <p>{selectedDoctor.name}</p>
                        <p>Chứng chỉ chỉnh hình hàm mặt của Viện đào tạo răng hàm mặt trường Đại học Y Hà Nội</p>
                        <p>Chứng chỉ implant Neobiotech tại Hàn Quốc</p>
                        <p>Quá trình đào tạo:</p>
                        <p>{selectedDoctor.education}</p>
                        <p>Quá trình công tác:</p>
                        {selectedDoctor.experience.map((exp, index) => (
                            <p key={index}>{exp}</p>
                        ))}
                        <p>Chứng chỉ trong nước hoặc nước ngoài:</p>
                        {selectedDoctor.certificates.map((certificate, index) => (
                            <p key={index}>{certificate}</p>
                        ))}
                        <p>Khám, điều trị các bệnh:</p>
                        {selectedDoctor.specialties.map((specialty, index) => (
                            <p key={index}>{specialty}</p>
                        ))}
                    </div>
                    <div>
                        <button onClick={handleEditDoctorInfo}>Chỉnh sửa thông tin bác sĩ</button>
                        <button onClick={handleEditWorkingHours}>Chỉnh sửa ca làm việc</button>
                    </div>
                </div>
            )}

            <h3>Danh sách bác sĩ</h3>

            <ul>
                {doctorList.map((doctor) => (
                    <li key={doctor.id}>
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            onClick={() => handleShowDoctorDetail(doctor)}
                        />
                        <p>{doctor.name}</p>
                        <button>...</button>
                    </li>
                ))}
            </ul>

            {isEditModalOpen && (
                <Modal isOpen={isEditModalOpen} onRequestClose={handleCloseModal}>
                    <h3>Chỉnh sửa thông tin bác sĩ</h3>
                    {/* Các trường chỉnh sửa thông tin bác sĩ */}
                    <button onClick={handleCloseModal}>Đóng</button>
                </Modal>
            )}

            {isWorkingHoursModalOpen && (
                <Modal isOpen={isWorkingHoursModalOpen} onRequestClose={handleCloseModal}>
                    <h3>Chỉnh sửa ca làm việc</h3>
                    {/* Các trường chỉnh sửa ca làm việc */}
                    <button onClick={handleCloseModal}>Đóng</button>
                </Modal>
            )}
        </div>
    );
}

export default AdminViewDocDetail;
