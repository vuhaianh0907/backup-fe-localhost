import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DoctorList.scss';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'admin') {
        window.location.href = '/';
      }
    }
  })

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

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentDoctors = doctors.slice(firstIndex, lastIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
      <h2 className="doctor-list__title">Danh sách bác sĩ</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="doctor-list__items">
            {currentDoctors.map((doctor) => (
              <li key={doctor.id} className="doctor-item">
                <div className="doctor-item__avatar">
                  <img src={doctor.avatar} />
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
                </button><br />
                <Link to={`/admin/doctordetail/${doctor.id}`} className="view-details-link btn btn-primary">
                  Xem thông tin
                </Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {currentPage > 1 && (
              <button id='thist-paging' onClick={prevPage}>{'<'}</button>
            )}
            {currentDoctors.length > 0 && (
              <button id='thist-paging'>
                <span>
                  {currentPage}
                </span>
              </button>

            )}
            {currentDoctors.length === perPage && (
              <button id='thist-paging' onClick={nextPage}>{'>'}</button>
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
                <div className='close'>&times;</div>
              </button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn thay đổi trạng thái của bác sĩ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-confirm" onClick={handleConfirmationConfirm}>
                Xác nhận
              </button>
              <button
                type="button"
                className="btn btn-cancel"
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
