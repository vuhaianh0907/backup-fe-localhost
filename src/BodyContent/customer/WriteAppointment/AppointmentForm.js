import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "configs/axios";
import './AppointmentForm.scss';

const SlotAppointment = () => {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reason, setReason] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);
  
  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  })

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const response = await axios.get(`slot/details?id=${id}`);
        setSlot(response.data.slot);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch slot');
        setLoading(false);
      }
    };

    if (loading) {
      fetchSlot();
    }
  }, [id, loading]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`account/doctor/details?id=${slot.doctorID}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        setError('Failed to fetch doctor');
      }
    };

    if (slot && slot.doctorID) {
      fetchDoctor();
    }
  }, [slot]);

  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmAppointment = async () => {
    setIsConfirming(true);
    try {
      const appointmentData = {
        status: 'confirmed',
        doctorID: doctor.id,
        customerID: user.id,
        slotID: slot.id,
        reason: reason,
      };

      const response = await axios.post(`appointment/create?customerId=${id}`, appointmentData);

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setIsConfirmed(true);
        setShowConfirmationModal(false);
        setIsSuccessModalOpen(true);
      } else {
        setError('Failed to confirm appointment');
      }
    } catch (error) {
      setError('Failed to confirm appointment');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setReason('');
    setError('');
  };

  return (
    <div id="AppointmentForm">
      {!loading && slot && doctor ? (
        <>
          <div className='TTkham-container'>
            <div className='TTkham'>
              <img src={doctor.avatar} alt="Doctor Avatar" />
            </div>
            <div className='TTkham2'>
              <p className="doctor-name">Bác Sĩ: {doctor.fullname}</p>
              <p className="appointment-date">Ngày khám: {slot.date}</p>
              <p className="appointment-time">Thời gian: {slot.time}</p>
            </div>
          </div>

          {!isConfirmed && (
            <>
              <div className="form-group">
                <label htmlFor="reason">Lí do:</label>
                <input type="text" id="reason" for="exampleFormControlTextarea1"  class="form-label" value={reason} onChange={handleReasonChange} />
              </div>
              
              <button className="btn btn-primary confirm-button" onClick={() => setShowConfirmationModal(true)} disabled={isConfirming}>
                {isConfirming ? 'Đang xác nhận...' : 'Xác nhận'}
              </button>

              {showConfirmationModal && (
                <div className="modal-backdrop">
                  <div className="modal">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Xác nhận cuộc hẹn?</h5>
                        <button type="button" className="btn-close" onClick={() => setShowConfirmationModal(false)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này?</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmationModal(false)}>
                          Đóng
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleConfirmAppointment}>
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {isSuccessModalOpen && (
            <div className="modal-backdrop">
              <div className="modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Thành công</h5>
                    <button type="button" className="btn-close" onClick={handleCloseSuccessModal}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>{successMessage}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={handleCloseSuccessModal}>
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SlotAppointment;
