import React, { useState } from 'react';
import './PatientProfile.css';

const PatientProfile = () => {
  const patient = {
    name: 'Nguyễn Văn A',
    id: '123456789',
    gender: 'Nam',
    birthday: '01/01/1990',
    phone: '0123456789',
    email: 'example@example.com',
    records: [
      { id: 1, note: 'Ghi chú 1' },
      { id: 2, note: 'Ghi chú 2' },
      { id: 3, note: 'Ghi chú 3' },
      { id: 4, note: 'Ghi chú 4' },
      { id: 5, note: 'Ghi chú 5' },
      { id: 6, note: 'Ghi chú 6' },
      { id: 7, note: 'Ghi chú 7' },
      { id: 8, note: 'Ghi chú 8' },
      { id: 9, note: 'Ghi chú 9' },
      { id: 10, note: 'Ghi chú 10' },
      { id: 11, note: 'Ghi chú 11' },
      { id: 12, note: 'Ghi chú 12' },
      { id: 13, note: 'Ghi chú 13' },
      { id: 14, note: 'Ghi chú 14' },
      { id: 15, note: 'Ghi chú 15' },
      { id: 16, note: 'Ghi chú 16' },
      { id: 17, note: 'Ghi chú 17' },
      { id: 18, note: 'Ghi chú 18' },
      { id: 19, note: 'Ghi chú 19' },
      { id: 20, note: 'Ghi chú 20' },
    ],
  };

  const pageSize = 5; // Kích thước trang
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [newRecordName, setNewRecordName] = useState('');

  // Tính toán số trang
  const totalPages = Math.ceil(patient.records.length / pageSize);

  // Lấy danh sách hồ sơ bệnh hiện tại dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentRecords = patient.records.slice(startIndex, endIndex);

  // Chuyển đến trang trước đó
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Chuyển đến trang tiếp theo
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Chuyển đến trang đầu tiên
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Chuyển đến trang cuối cùng
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Mở pop-up thêm mới hồ sơ
  const openPopup = () => {
    setShowPopup(true);
  };

  // Đóng pop-up thêm mới hồ sơ
  const closePopup = () => {
    setShowPopup(false);
  };

  // Xử lý sự kiện thêm mới hồ sơ
  const handleAddRecord = () => {
    // Xử lý logic thêm mới hồ sơ tại đây
    // ...
    console.log('Thêm mới hồ sơ:', newRecordName);
    // Sau khi xử lý, đóng pop-up và làm các thao tác cần thiết
    closePopup();
  };

  return (
    <div className="patient-profile">
      <h2>Thông tin bệnh nhân</h2>
      <div className="info-item">
        <span className="label">Họ tên:</span>
        <span className="value">{patient.name}</span>
      </div>
      <div className="info-item">
        <span className="label">Số chứng minh:</span>
        <span className="value">{patient.id}</span>
      </div>
      <div className="info-item">
        <span className="label">Giới tính:</span>
        <span className="value">{patient.gender}</span>
      </div>
      <div className="info-item">
        <span className="label">Ngày sinh:</span>
        <span className="value">{patient.birthday}</span>
      </div>
      <div className="info-item">
        <span className="label">Số điện thoại:</span>
        <span className="value">{patient.phone}</span>
      </div>
      <div className="info-item">
        <span className="label">Email:</span>
        <span className="value">{patient.email}</span>
      </div>
      <div className="actions">
        <button className="add-record-button" onClick={openPopup}>
          Thêm mới hồ sơ
        </button>
      </div>
      <div className="records">
        <h3>Hồ sơ bệnh</h3>
        <ul>
          {currentRecords.map((record) => (
            <li key={record.id}>
              {record.note}
              <button className="view-details-button">Xem chi tiết</button>
            </li>
          ))}
        </ul>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Thêm mới hồ sơ</h3>
            <input
              type="text"
              placeholder="Tên hồ sơ"
              value={newRecordName}
              onChange={(e) => setNewRecordName(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="popup-button" onClick={handleAddRecord}>
                Xác nhận
              </button>
              <button className="popup-button" onClick={closePopup}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="pagination-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="pagination-button"
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;
