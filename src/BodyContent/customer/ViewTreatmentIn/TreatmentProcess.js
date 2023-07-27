import React, { useEffect, useState } from "react";

import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import './TreatmentProcess.scss';

const TreatmentProcess = () => {
  const patientName = 'Đỗ Quang Lực';
  const appointmentDate = '28 Tháng 4, 2023';
  const treatingDoctor = 'Dr. Emily Nguyen';
  const service = 'Trám răng';
  const treatmentProcessContent = 'Nội dung quy trình điều trị từ cơ sở dữ liệu';
  const treatmentResultContent = 'Nội dung kết quả điều trị từ cơ sở dữ liệu';
  const notesContent = 'Nội dung ghi chú từ cơ sở dữ liệu';
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  })

  return (
    <div >
      <div className="center-box">
        <div id="TreatmentProcess" className="treatment-process">

          <form className="treatment-process__form">
            <h2 className="treatment-process__title">Xem quy trình điều trị</h2>
            <div className="form-group">
              <FaUser />
              <label htmlFor="patientName">Bệnh Nhân:</label>
              <p id="patientName" className="form-control">{patientName}</p>
            </div>
            <div className="form-group">
              <FaCalendarAlt />
              <label htmlFor="appointmentDate">Ngày khám:</label>
              <p id="appointmentDate" className="form-control">{appointmentDate}</p>
            </div>
            <div className="form-group">
              <FaUser />
              <label htmlFor="treatingDoctor">Bác sĩ điều trị:</label>
              <p id="treatingDoctor" className="form-control">{treatingDoctor}</p>
            </div>
            <div className="form-group">
              <FaUser />
              <label htmlFor="service">Dịch vụ:</label>
              <p id="service" className="form-control">{service}</p>
            </div>
            <div className="treatment-process__details">
              <div className="treatment-process__section">
                <h3 className="treatment-process__subheading">Quy trình điều trị:</h3>
                <p className="treatment-process__text">{treatmentProcessContent}</p>
              </div>
              <div className="treatment-process__section">
                <h3 className="treatment-process__subheading">Kết quả điều trị:</h3>
                <p className="treatment-process__text">{treatmentResultContent}</p>
              </div>
              <div className="treatment-process__section">
                <h3 className="treatment-process__subheading">Ghi chú:</h3>
                <p className="treatment-process__text">{notesContent}</p>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default TreatmentProcess;
