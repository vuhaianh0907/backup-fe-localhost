import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DoctorList.scss';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/account/doctor/alllist')
      .then((response) => {
        setDoctors(response.data.doctors);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (doctor) => {
    const updatedStatus = doctor.status === 'active' ? 'not active' : 'active';
    const updatedDoctor = { ...doctor, status: updatedStatus };
    setSelectedDoctor(updatedDoctor);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationConfirm = async () => {
    try {
      await axios.post(`http://localhost:3000/api/account/doctor/status?id=${selectedDoctor.id}`);

      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === selectedDoctor.id ? selectedDoctor : doctor
      );
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error updating doctor status:', error);
    }

    setIsConfirmationModalOpen(false);
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationModalOpen(false);
  };

  useEffect(() => {
    if (isConfirmationModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isConfirmationModalOpen]);

  return (
    <div id="DoctorList" className="doctor-list">
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="doctor-list__items">
          <h2 className="doctor-list__title">Danh sách bác sĩ</h2>
            {currentDoctors.map((doctor) => (
              <li key={doctor.id} className="doctor-item">
                <div className="doctor-item__avatar">
                  <img src={doctor.avatar} alt="Doctor Avatar" />
                </div>
                <div className="doctor-item__details">
                  <p className="doctor-item__name">{doctor.fullname}</p>
                  <p className="doctor-item__specialization">{doctor.qualification}</p>
                </div>
                <button
                  className={`status-button btn ${doctor.status === 'active' ? 'btn-success' : 'btn-danger'}`}
                  onClick={() => handleStatusChange(doctor)}
                >
                  {doctor.status === 'active' ? 'Active' : 'Not Active'}
                </button>
                <Link to={`/admin/doctordetail/${doctor.id}`} className="view-details-link btn btn-primary">
                  Xem thông tin
                </Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-button btn ${pageNumber === currentPage ? 'active' : ''}`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}

      {isConfirmationModalOpen && (
        <div className="modal-backdrop fade show"></div>
      )}

      <div
        id="confirmation-modal"
        className={`modal fade ${isConfirmationModalOpen ? 'show' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isConfirmationModalOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Xác nhận</h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleConfirmationCancel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn thay đổi trạng thái của bác sĩ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleConfirmationConfirm}>
                Xác nhận
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleConfirmationCancel}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
