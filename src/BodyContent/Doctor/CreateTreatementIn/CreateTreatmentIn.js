import React, { useState, useEffect } from 'react';
import axios from "configs/axios";
import { useParams, Link } from 'react-router-dom';
import './CreateTreatmentIn.css';
import moment from 'moment-timezone';

function CreateTreatmentIn() {
  const { id } = useParams();

  const [treatmentProfile, setTreatmentProfile] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [treatmentIn, setTreatmentIn] = useState({
    procress: '',
    result: '',
    note: '',
  });
  const [showConfirmationComplete, setShowConfirmationComplete] = useState(false);
  const [showConfirmationReappoint, setShowConfirmationReappoint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);
  const storedSlot = sessionStorage.getItem("SlotID");
  const idslot = JSON.parse(storedSlot);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'doctor') {
        window.location.href = '/';
      }
    }
  }, []);

  useEffect(() => {
    const fetchTreatmentProfile = async () => {
      try {
        const response = await axios.get(`treatment_profile/details?id=${id}`);
        const profileData = response.data.treatmentProfile;
        setTreatmentProfile(profileData);
        const customerResponse = await axios.get(`account/customer/details?id=${profileData.customerID}`);
        const customerData = customerResponse.data.customer;
        setCustomer(customerData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching treatment profile:', error);
        setIsLoading(false);
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
      const treatmentInData = {
        idTreatmentProfile: treatmentProfile.id,
        doctorID: user.id,
        process: treatmentIn.procress,
        result: treatmentIn.result,
        note: treatmentIn.note,
      };

      await axios.post('treatmentin/create', treatmentInData);
      await axios.post(`appointment/update?id=${idslot}`, { status: 'Done' });
      sessionStorage.removeItem('SlotID');

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
      const treatmentInData = {
        idTreatmentProfile: treatmentProfile.id,
        doctorID: user.id,
        process: treatmentIn.procress,
        result: treatmentIn.result,
        note: treatmentIn.note,
      };

      await axios.post('treatmentin/create', treatmentInData);
      await axios.post(`appointment/update?id=${idslot}`, { status: 'Done' });
      sessionStorage.removeItem('SlotID');

      window.location.href = `/Doctor/rebook/${customer.id}`;
    } catch (error) {
      console.error('Error confirming treatment:', error);
    }
    setShowConfirmationReappoint(false);
  };

  const handleConfirmationReappointClose = () => {
    setShowConfirmationReappoint(false);
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Cập nhật tiến trình trị liệu</h2>
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
      </div>
      <div className="input-form">
        <h3>Hồ sơ bệnh</h3>
        <div className="treatment-profile">
          <input type="text" value={treatmentProfile.description} readOnly />
        </div>
        <div className="input-boxes">
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
      <div className="action-buttons">
        <button className="btn btn-success" onClick={handleComplete}>
          Xong
        </button>
        <button className="btn btn-info" onClick={handleReappoint}>
          Đặt tái khám
        </button>
      </div>

      {showConfirmationComplete && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn hoàn thành quá trình trị liệu?</p>
            <div className="confirmation-modal-buttons">
              <button className="btn btn-primary" onClick={handleConfirmationCompleteConfirm}>
                Xác nhận
              </button>
              <button className="btn btn-secondary" onClick={handleConfirmationCompleteClose}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmationReappoint && (
        <div className="confirmation-modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Xác nhận</h3>
                <button type="button" class="btn-close" aria-label="Close" onClick={handleConfirmationReappointClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn đặt lại cuộc hẹn tái khám?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleConfirmationReappointConfirm}>
                  Xác nhận
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleConfirmationReappointClose}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTreatmentIn;
