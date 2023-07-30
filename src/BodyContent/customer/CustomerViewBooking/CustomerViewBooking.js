import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CustomerViewBooking.scss';
import ViewBookingDetail from '../ViewBookingDetail/ViewBookingDetail';

function CustomerViewBooking() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
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
  }, []);

  const statusList = [
    {
      name: "confirmed",
      displayName: "Đã xác nhận",
      color: "text-info"
    },
    {
      name: "Cancelled",
      displayName: "Đã hủy",
      color: "text-danger"
    },
    {
      name: "Doctor Cancelled",
      displayName: "Bác sĩ đã hủy",
      color: "text-danger"
    },
    {
      name: "Done",
      displayName: "Hoàn thành",
      color: "text-success"
    },
  ];

  function getStatusInfo(status) {
    const statusInfo = statusList.find((item) => item.name === status);
    return statusInfo || { displayName: status, color: "" };
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/appointment/appointmentcustomer?customerID=${id}`)
      .then((response) => {
        const appointmentsData = response.data.appointments;
        const appointmentPromises = appointmentsData.map((appointment) => {
          const doctorPromise = axios.get(`http://localhost:3000/api/account/doctor/details?id=${appointment.doctorID}`);
          const slotPromise = axios.get(`http://localhost:3000/api/slot/details?id=${appointment.slotID}`);

          return Promise.all([doctorPromise, slotPromise])
            .then(([doctorResponse, slotResponse]) => {
              appointment.doctor = doctorResponse.data.doctor;
              appointment.slot = slotResponse.data.slot;
              return appointment;
            });
        });

        Promise.all(appointmentPromises)
          .then((updatedAppointments) => {
            const sortedAppointments = updatedAppointments.sort((a, b) => {
              const updatedAtA = new Date(a.updatedAt);
              const updatedAtB = new Date(b.updatedAt);
              return updatedAtB - updatedAtA;
            });

            setAppointments(sortedAppointments);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('API Error:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('API Error:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(appointments.length / perPage);

  return (
    <div id="CustomerViewBooking" className="customer-view-booking">
      <h2>Danh sách đặt lịch</h2>
      {isLoading ? (
        <div className='customer-booking-loading'>
          <div className="spinner-border text-light" role="status"></div>
        </div>
      ) : (
        <div className='container'>
          {appointments.slice(startIndex, endIndex).map((appointment) => (
            <div className="mb-3" key={appointment.id}>
              <Link className="card" to={`/customer/booking/detail/${appointment.id}`}>
                <div className="card-body row">
                  <div className="col-7 d-inline-block">
                    <h5 className="card-title">{appointment.slot.date}</h5>
                    <div className="card-text">Bác sĩ: {appointment.doctor ? appointment.doctor.fullname : 'Unknown Doctor'}</div>
                    <div className="card-text">Slot: {appointment.slot ? appointment.slot.time : 'Unknown Slot'}</div>
                  </div>
                  <div className={`${getStatusInfo(appointment.status).color} col-5 card-text text-end mt-4`}>
                    {getStatusInfo(appointment.status).displayName}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="paging-btn"
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span className="paging-btn">{currentPage}</span>
          <button className="paging-btn"
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      )}
      {selectedAppointment && (
        <ViewBookingDetail appointment={selectedAppointment} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default CustomerViewBooking;
