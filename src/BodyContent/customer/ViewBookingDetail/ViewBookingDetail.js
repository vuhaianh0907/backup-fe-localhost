import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "configs/axios";
import './ViewBookingDetail.scss';

function ViewBookingDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(`appointment/details?id=${id}`);
        const appointmentData = response.data.appointment;

        const slotPromise = axios.get(`slot/details?id=${appointmentData.slotID}`);
        const doctorPromise = axios.get(`account/doctor/details?id=${appointmentData.doctorID}`);

        Promise.all([slotPromise, doctorPromise])
          .then(([slotResponse, doctorResponse]) => {
            appointmentData.slot = slotResponse.data.slot;
            appointmentData.doctor = doctorResponse.data.doctor;
            setAppointment(appointmentData);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('API Error:', error);
            setIsLoading(false);
          });
      } catch (error) {
        console.error('API Error:', error);
        setIsLoading(false);
      }
    };

    fetchAppointmentData();
  }, [id]);

  const handleCancelAppointment = () => {
    setShowCancelModal(true);
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancelAppointment = () => {
    axios
      .post(`appointment/update?id=${id}`, { status: 'Cancelled' })
      .then((response) => {
        console.log('Appointment cancelled:', response.data);
        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          status: 'Cancelled'
        }));
      })
      .catch((error) => {
        console.error('API Error:', error);
      });

    setShowCancelModal(false);
  };

  return (
    <div id="ViewBookingDetail">
      <div className="view-booking-detail">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <h2>Chi tiết đặt lịch</h2>
            <div className="detail-info">
              <span className="label">Ngày điều trị: </span>
              <span>{appointment ? appointment.slot.date : 'Unknown'}</span>
            </div>
            <div className="detail-info">
              <span className="label">Trạng thái: </span>
              <span>{appointment ? appointment.status : 'Unknown'}</span>
            </div>
            <div className="detail-info">
              <span className="label">Bác sĩ: </span>
              <span>{appointment ? appointment.doctor.fullname : 'Unknown'}</span>
            </div>
            <div className="detail-info">
              <span className="label">Slot: </span>
              <span>{appointment ? appointment.slot.time : 'Unknown'}</span>
            </div>
            <div className="detail-info">
              <span className="label">Lí do: </span>
              <span>{appointment ? appointment.reason : 'Unknown'}</span>
            </div>
            <div className="nuthuylich">
              {appointment.status !== 'Cancelled' && appointment.status !== 'Doctor Cancelled' && (
                <button type="button" className="btn btn-danger" onClick={handleCancelAppointment}>
                  Hủy đặt lịch
                </button>
              )}
            </div>
            {showCancelModal && (
              <div className="modal d-block">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Xác nhận hủy appointment</h5>
                    </div>
                    <div className="modal-body">
                      <p>Bạn có chắc chắn muốn hủy appointment này?</p>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Đóng
                      </button>
                      <button className="btn btn-primary" onClick={handleConfirmCancelAppointment}>
                        Xác nhận hủy lịch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBookingDetail;
