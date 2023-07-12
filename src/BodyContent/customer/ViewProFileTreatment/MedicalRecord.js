import React from 'react';
import { FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import './MedicalRecord.css';

const MedicalRecord = () => {
  const recordName = 'Hồ sơ bệnh số 123';
  const createDate = '15 Tháng 6, 2023';
  const lastUpdate = '20 Tháng 6, 2023';
  const symptoms = [
    { name: 'Triệu chứng 1', date: '1 Tháng 7, 2023' },
    { name: 'Triệu chứng 2', date: '5 Tháng 7, 2023' },
    { name: 'Triệu chứng 3', date: '10 Tháng 7, 2023' }
  ];
  const treatmentSessions = [
    { name: 'Buổi điều trị 1', date: '2 Tháng 7, 2023' },
    { name: 'Buổi điều trị 2', date: '6 Tháng 7, 2023' },
    { name: 'Buổi điều trị 3', date: '12 Tháng 7, 2023' }
  ];

  return (
    <div id='MedicalRecord' className="medical-record">
      <h2 className="medical-record__title">Xem hồ sơ bệnh</h2>
      <div className="medical-record__info">
        <p className="medical-record__info-item"><FaFileAlt /> Tên hồ sơ: {recordName}</p>
        <p className="medical-record__info-item"><FaCalendarAlt /> Ngày tạo hồ sơ: {createDate}</p>
        <p className="medical-record__info-item"><FaCalendarAlt /> Cập nhật gần nhất: {lastUpdate}</p>
      </div>
      <div className="medical-record__section">
        <h3 className="medical-record__subheading">Triệu chứng trong quá trình điều trị:</h3>
        <ul className="medical-record__symptoms">
          {symptoms.map((symptom, index) => (
            <li key={index} className="medical-record__symptom">
              <span className="medical-record__symptom-name">{symptom.name}</span>
              <span className="medical-record__symptom-date">{symptom.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="medical-record__section">
        <h3 className="medical-record__subheading">Các buổi điều trị:</h3>
        <ul className="medical-record__treatments">
          {treatmentSessions.map((session, index) => (
            <li key={index} className="medical-record__treatment">
              <span className="medical-record__treatment-name">{session.name}</span>
              <span className="medical-record__treatment-date">{session.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicalRecord;
