import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './viewBooking.scss';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';

const ViewBooking = () => {
  
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [currentPageToday, setCurrentPageToday] = useState(1);
  const [currentPageFuture, setCurrentPageFuture] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const appointmentsPerPage = 3;
  const dateNow = new Date().toISOString();
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);
  const [dateNowFormatted, setDateNowFormatted] = useState('');


  useEffect(() => {
    if (user === null) {

      window.location.href = '/';

    }
    else {
      if (user.role !== 'doctor') {
        window.location.href = '/';
      }
    }
  })
  useEffect(() => {
    const formattedDate = formatDateToVN(new Date());
    setDateNowFormatted(formattedDate);
  }, []);
  const formatDateToVN = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Hôm nay ngày ${day}/${month}/${year}`;
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/appointment/appointmentdoctor?doctorID=${id}`);
        const appointmentsData = response.data.appointments;

        // Lấy thông tin chi tiết của customer và slot cho từng appointment
        const appointmentsWithDetails = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const customerId = appointment.customerID;
            const slotId = appointment.slotID;

            // Lấy thông tin customer
            const customerResponse = await axios.get(`http://localhost:3000/api/account/customer/details?id=${customerId}`);
            const customerData = customerResponse.data.customer;

            // Lấy thông tin slot
            const slotResponse = await axios.get(`http://localhost:3000/api/slot/details?id=${slotId}`);
            const slotData = slotResponse.data.slot;

            // Kết hợp thông tin appointment, customer và slot thành một object mới
            return {
              ...appointment,
              customer: customerData,
              slot: slotData,
            };
          })
        );

        setAppointments(appointmentsWithDetails);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [id]);

  useEffect(() => {

     // Lấy ngày hiện tại
    const currentDate = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');

    const todayAppointmentsData = appointments.filter((appointment) => appointment.slot.date === currentDate);
    const futureAppointmentsData = appointments.filter((appointment) => appointment.slot.date > currentDate);


    setTodayAppointments(todayAppointmentsData);
    const sortedAppointments = [...futureAppointmentsData].sort((a, b) => {
      const dateA = new Date(a.slot.date);
      const dateB = new Date(b.slot.date);
      return dateA - dateB; // Use "dateB - dateA" to sort in descending order
    });

    setFutureAppointments(sortedAppointments);
  }, [appointments]);

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseProfile = () => {
    setSelectedAppointment(null);
  };

  const handleTodayPageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPageToday(pageNumber);
  };

  const handleFuturePageChange = (pageNumber) => {
    setCurrentPageFuture(pageNumber);
  };

  const handleCancelAppointment = async (appointmentId) => {
    setSelectedAppointment(appointments.find((appointment) => appointment.id === appointmentId));
    setShowConfirmation(true);
  };

  const handleRequestCancellation = async (appointmentId) => {
    setSelectedAppointment(appointments.find((appointment) => appointment.id === appointmentId));
    setShowConfirmation(true);
  };

  const handleConfirmCancelAppointment = async () => {
    try {
      // Gửi yêu cầu hủy lịch hẹn
      await axios.post(`http://localhost:3000/api/appointment/updatedoctor?id=${selectedAppointment.id}`, { status: 'Doctor Cancelled' });
      // Cập nhật lại danh sách lịch hẹn
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === selectedAppointment.id) {
          return {
            ...appointment,
            status: 'Doctor Cancelled',
          };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
      setShowConfirmation(false);
      toast.success(' Hủy thành công', {
        position: toast.POSITION.TOP_RIGHT
      });
      window.location.href = `/Doctorviewbooking/${user.id}`;

    } catch (error) {
      toast.error(' Hủy thất bại', {
        position: toast.POSITION.TOP_RIGHT
      });
      window.location.href = `/Doctorviewbooking/${user.id}`;
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleConfirmRequestCancellation = async () => {
    try {
      // Gửi yêu cầu hủy lịch hẹn
      await axios.post(`http://localhost:3000/api/appointment/update?id=${selectedAppointment.id}`, { status: 'Cancellation Requested' });
      // Cập nhật lại danh sách lịch hẹn
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === selectedAppointment.id) {
          return {
            ...appointment,
            status: 'Cancellation Requested',
          };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error requesting cancellation:', error);
    }
  };
  const StoreIDSlot = (slotID) => {
    const data = JSON.stringify(slotID);
    sessionStorage.setItem('SlotID', data);
  };

  const handleCancelConfirmation = () => {
    setSelectedAppointment(null);
    setShowConfirmation(false);
  };
  function convertGenderToVietnamese(gender) {
    if (gender === "male") {
      return "Nam";
    } else if (gender === "female") {
      return "Nữ";
    } else {
      return gender; // Nếu giới tính không phải male hoặc female, trả về giá trị gốc
    }
  }
  function convertStatusToVietnamese(status) {
    switch (status) {
      case "Doctor Cancelled":
        return "Bác sĩ đã hủy";
      case "confirmed":
        return "Đã xác nhận";
      case "Done":
        return "Hoàn thành";
      case "Cancelled":
        return "Đã hủy";
      default:
        return status; // Trả về giá trị gốc nếu không trùng với bất kỳ trạng thái nào
    }
  }
  
  



  const renderAppointmentListFuture = (appointments) => {

    const startIndex = (currentPageFuture - 1) * appointmentsPerPage;
    const endIndex = currentPageFuture * appointmentsPerPage;
    const currentAppointments = appointments.slice(startIndex, endIndex);
    console.log(appointments);
    
    const getStatusColorClass = (status) => {
      const statusItem = statusList.find((item) => item.name === status);
      return statusItem ? statusItem.color : "";
    };
    
    const convertStatusToVietnamese = (status) => {
      const statusItem = statusList.find((item) => item.name === status);
      return statusItem ? statusItem.displayName : status;
    };
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
    

    
    return (
      <div>
        <>

        {currentAppointments.map((appointment) => (
        <div className={`card mb-3 ${(appointment.status)}`} key={appointment.id}>
            <div className="card-body">

                <span className="appointment-info">Họ tên: {appointment.customer.fullname}</span>
                {/* <span className="appointment-info">Lí do đến khám: {appointment.reason}</span> */}
                
                <span className="appointment-info">Ngày khám: {appointment.slot.date}</span>
                <span className="appointment-info">Giờ khám: {appointment.slot.time}</span>
                {/* <span className="appointment-info">Trạng thái: {appointment.status}</span> */}
                <span className={`appointment-info ${getStatusColorClass(appointment.status)}`}>Trạng thái: {convertStatusToVietnamese(appointment.status)}</span>
                <button className="btn btn-primary" onClick={() => handleViewAppointment(appointment)}>
                  
                  Xem phiếu khám
                </button>

              </div>
            </div>
          ))}
        </>
      </div>
    );
  };
  const renderAppointmentListToday = (appointments) => {
    const startIndex = (currentPageToday - 1) * appointmentsPerPage;
    const endIndex = currentPageToday * appointmentsPerPage;
    const currentAppointments = appointments.slice(startIndex, endIndex);
    const getStatusColorClass = (status) => {
      const statusItem = statusList.find((item) => item.name === status);
      return statusItem ? statusItem.color : "";
    };
    
    const convertStatusToVietnamese = (status) => {
      const statusItem = statusList.find((item) => item.name === status);
      return statusItem ? statusItem.displayName : status;
    };
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
    
    console.log(appointments);
    
    return (
      < >

        {currentAppointments.map((appointment) => (
          <div className='card mb-3'>
            <div className="card-body" key={appointment.id}>

              
               
                <span className="appointment-info">Họ tên: {appointment.customer.fullname}</span>
                <span className="appointment-info">Lí do đến khám: {appointment.reason}</span>
                <span className="appointment-info">Ngày khám: {appointment.slot.date}</span>
                <span className="appointment-info">Giờ khám: {appointment.slot.time}</span>

                <span className={`appointment-info ${getStatusColorClass(appointment.status)}`}>Trạng thái: {convertStatusToVietnamese(appointment.status)}</span>
                <button className="btn btn-primary" onClick={() => handleViewAppointment(appointment)}>
                  Xem phiếu khám
                </button>



              </div>
            
          </div>
        ))}
      </>
    );
  };

  const renderPagination = (totalPages, currentPage, onPageChange) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-container">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  // Calculate total pages for today's appointments and future appointments
  const totalTodayPages = Math.ceil(todayAppointments.length / appointmentsPerPage);
  const totalFuturePages = Math.ceil(futureAppointments.length / appointmentsPerPage);

  return (
    <div className="view-booking-container">
      <h2 className="view-booking-heading">Danh sách lịch hẹn</h2>
      <div className="appointments-section">
        <h3 className="appointments-heading">{dateNowFormatted}</h3>
        <div>
          {todayAppointments.length > 0 ? (
            <>
              <div className="appointments-list">{renderAppointmentListToday(todayAppointments)}</div>
              {renderPagination(totalTodayPages, currentPageToday, handleTodayPageChange)}
            </>
          ) : (
            <p className="no-appointments-message">Không có lịch hẹn nào hôm nay.</p>
          )}
        </div>
      </div>
      <div className="appointments-section">
        <h3 className="appointments-heading">Tương lai</h3>
        <div>
          {futureAppointments.length > 0 ? (
            <>
              <div className="appointments-list">{renderAppointmentListFuture(futureAppointments)}</div>
              {renderPagination(totalFuturePages, currentPageFuture, handleFuturePageChange)}
            </>
          ) : (
            <p className="no-appointments-message">Không có lịch hẹn trong tương lai.</p>
          )}
        </div>
      </div>
      {selectedAppointment && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            {/* tương lai */}
            <div className='closebutton'> 
            <button type="button" class="Close btn-close m-3" aria-label="Close" onClick={handleCloseProfile}></button>     
            </div> 
            <span className="profile-label">Họ tên: {selectedAppointment.customer.fullname}</span>    <br />
            <span className="profile-label">Giới tính: {convertGenderToVietnamese(selectedAppointment.customer.gender)}</span><br />
            <span className="profile-label">Lí do đến khám: {selectedAppointment.reason}</span><br />
            <span className="profile-label">Ngày khám: {selectedAppointment.slot.date}</span><br />
            <span className="profile-label">Giờ khám: {selectedAppointment.slot.time}</span><br />
            <span className="profile-label">Trạng thái: {convertStatusToVietnamese(selectedAppointment.status)}</span><br />

            {selectedAppointment.status === 'confirmed' && (
              <>
                {selectedAppointment.slot.date ===  moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD') ? (
                  <div>
                    <button className="btn btn-primary m-3">
                      <Link to={`/Doctor/viewpatientprofile/${selectedAppointment.customer.id}`} className="btn btn-primary" onClick={StoreIDSlot(selectedAppointment.id)}>
                        Xem hồ sơ
                      </Link>
                    </button>


                  </div>

                ) : (
                  <button className="btn btn-danger" onClick={handleConfirmCancelAppointment}>
                    Hủy lịch hẹn
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p className="confirmation-message">Bạn có chắc chắn muốn hủy lịch hẹn này?</p>
          <div className="confirmation-buttons">
            <button className="confirmation-button" onClick={handleConfirmCancelAppointment}>
              Xác nhận
            </button>
            <button className="confirmation-button" onClick={handleCancelConfirmation}>
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBooking;
