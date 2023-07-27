import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CreateTreatmentIn.css';

function CreateTreatmentIn() {
  const { id } = useParams(); // Get the ID from the URL

  const [treatmentProfile, setTreatmentProfile] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [treatmentIn, setTreatmentIn] = useState({
    procress: '',
    result: '',
    note: '',
  });
  const [showConfirmationComplete, setShowConfirmationComplete] = useState(false);
  const [showConfirmationReappoint, setShowConfirmationReappoint] = useState(false);
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);
  const storedSlot = sessionStorage.getItem("SlotID");
  const idslot = JSON.parse(storedSlot);
  
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
  useEffect(() => {
    const fetchTreatmentProfile = async () => {
      try {
        const response = await axios.get(`https://oooo-zifh.onrender.com/api/treatment_profile/details?id=${id}`); // Replace with your API endpoint
        const profileData = response.data.treatmentProfile;
        setTreatmentProfile(profileData);
        const customerResponse = await axios.get(`https://oooo-zifh.onrender.com/api/account/customer/details?id=${profileData.customerID}`);
        const customerData = customerResponse.data.customer;
        setCustomer(customerData);
      } catch (error) {
        console.error('Error fetching treatment profile:', error);
      }
    };

    fetchTreatmentProfile();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTreatmentIn((prevTreatmentIn) => ({
      ...prevTreatmentIn,
      [name]: value,
    }));
  };

  const handleComplete = () => {
    if (treatmentIn.procress && treatmentIn.result && treatmentIn.note) {
      setShowConfirmationComplete(true);
    } else {
      alert('Please fill in all fields before completing the treatment.');
    }
  };

  const handleConfirmationCompleteConfirm = async () => {
    try {
      // Xây dựng đối tượng dữ liệu treatmentIn từ trạng thái hiện tại của component
      const treatmentInData = {
        idTreatmentProfile : treatmentProfile.id,
        doctorID: user.id,
        process: treatmentIn.procress,
        result: treatmentIn.result,
        note: treatmentIn.note,
        // Các trường dữ liệu khác
      };
  
      // Gửi yêu cầu POST đến API createTreatmentIn
      await axios.post('https://oooo-zifh.onrender.com/api/treatmentin/create', treatmentInData);
      await axios.post(`https://oooo-zifh.onrender.com/api/appointment/update?id=${idslot}`, { status: 'Done' });
      sessionStorage.removeItem('SlotID');
  
      // Chuyển hướng trang về trang chủ
      window.location.href = '/';
    } catch (error) {
      console.error('Error confirming treatment:', error);
    }
  };
  

  const handleConfirmationCompleteClose = () => {
    setShowConfirmationComplete(false);
  };

  const handleReappoint = () => {
    if (treatmentIn.procress && treatmentIn.result && treatmentIn.note) {
      setShowConfirmationReappoint(true);
    } else {
      alert('Please fill in all fields before reappointing the treatment.');
    }
  };

  const handleConfirmationReappointConfirm = async () => {
    try {
      // Xây dựng đối tượng dữ liệu treatmentIn từ trạng thái hiện tại của component
      const treatmentInData = {
        idTreatmentProfile : treatmentProfile.id,
        doctorID: user.id,
        process: treatmentIn.procress,
        result: treatmentIn.result,
        note: treatmentIn.note,
        // Các trường dữ liệu khác
      };
  
      // Gửi yêu cầu POST đến API createTreatmentIn
      await axios.post('https://oooo-zifh.onrender.com/api/treatmentin/create', treatmentInData);
      await axios.post(`https://oooo-zifh.onrender.com/api/appointment/update?id=${idslot}`, { status: 'Done' });
      sessionStorage.removeItem('SlotID');
  
      // Chuyển hướng trang về trang chủ
      window.location.href = `/Doctor/rebook/${customer.id}`;
    } catch (error) {
      console.error('Error confirming treatment:', error);
    }
    // Perform reappoint treatment logic here
    setShowConfirmationReappoint(false);
    
  };

  const handleConfirmationReappointClose = () => {
    setShowConfirmationReappoint(false);
  };

  if (!treatmentProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h2>Cập nhật tiến trình trị liệu</h2>
      {/* Hiển thị thông tin người dùng */}
      <div className="profile-details">
        <div>
          <label>Tên:</label>
          <input type="text" value={customer ? customer.fullname : ''} readOnly />
        </div>
        <div>
          <label>Giới tính:</label>
          <input type="text" value={customer ? customer.gender : ''} readOnly />
          </div>
        <div>
          <label>Ngày khám:</label>
          <input type="text" value={new Date()} readOnly />
        </div>
        {/* Display other customer information */}
      </div>
      {/* Hiển thị form nhập liệu */}
      <div className="input-form">
        <h3>Hồ sơ bệnh</h3>
        <div className="treatment-profile">
          <input type="text" value={treatmentProfile.description} readOnly />
        </div>
        <div className="input-boxes">
          {/* Hiển thị ô nhập liệu cho treatmentIn */}
          <div className="input-box">
            <label>Quá trình điều trị:</label>
            <input
              type="text"
              name="procress"
              value={treatmentIn.process}
              onChange={handleInputChange}
              placeholder="Thông tin liên quan trong khi điều trị"
            />
          </div>
          <div className="input-box">
            <label>Kết quả:</label>
            <input
              type="text"
              name="result"
              value={treatmentIn.result}
              onChange={handleInputChange}
              placeholder="Tình trạng bệnh nhân sau buổi điều trị"
            />
          </div>
          <div className="input-box">
            <label>Lời khuyên:</label>
            <input
              type="text"
              name="note"
              value={treatmentIn.note}
              onChange={handleInputChange}
              placeholder="Lời khuyên của bác sĩ sau buổi điều trị"
            />
          </div>
        </div>
      </div>
      {/* Hiển thị các nút hoàn thành và tái khám */}
      <div className="action-buttons">
        <button className="complete-button" onClick={handleComplete}>
          Xong
        </button>
        <button className="reappoint-button" onClick={handleReappoint}>
        
               Đặt tái khám
        
          
        </button>
      </div>

      {/* Xác nhận hoàn thành */}
      {showConfirmationComplete && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn hoàn thành quá trình trị liệu?</p>
            <div className="confirmation-modal-buttons">
              <button className="confirm-button" onClick={handleConfirmationCompleteConfirm}>
                Xác nhận
              </button>
              <button className="cancel-button" onClick={handleConfirmationCompleteClose}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Xác nhận tái khám */}
      {showConfirmationReappoint && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn đặt lại cuộc hẹn tái khám?</p>
            <div className="confirmation-modal-buttons">
              <button className="confirm-button" onClick={handleConfirmationReappointConfirm}>
                Xác nhận
              </button>
              <button className="cancel-button" onClick={handleConfirmationReappointClose}>
               
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTreatmentIn;
