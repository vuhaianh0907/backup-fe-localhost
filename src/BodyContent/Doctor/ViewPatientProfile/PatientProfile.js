import React, { useState, useEffect } from 'react';
import './PatientProfile.scss';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PatientProfile = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [treatmentProfiles, setTreatmentProfiles] = useState([]);
  const [treatmentIns, setTreatmentIns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [newTreatmentProfileName, setNewTreatmentProfileName] = useState('');
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);

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

  const pageSize = 5; // Kích thước trang

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`); // Thay đổi URL API tương ứng
        const customerData = response.data.customer;
        setCustomer(customerData);

      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    const fetchTreatmentProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/schedule?id=${id}`); // Thay đổi URL API tương ứng
        const treatmentProfilesData = response.data.treatmentProfiles;

        const sortedProfiles = treatmentProfilesData.slice().sort((a, b) => - new Date(a.createdAt) + new Date(b.createdAt));
        setTreatmentProfiles(sortedProfiles);

      } catch (error) {
        console.error('Error fetching treatment profiles:', error);
      }
    };

    fetchCustomer();
    fetchTreatmentProfiles();
  }, [id]);

  // Tính toán số trang
  const totalPages = Math.ceil(treatmentProfiles.length / pageSize);

  // Lấy danh sách treatment profiles hiện tại dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTreatmentProfiles = treatmentProfiles.slice(startIndex, endIndex);

  // Chuyển đến trang trước đó
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Chuyển đến trang tiếp theo
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Chuyển đến trang đầu tiên
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Chuyển đến trang cuối cùng
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Mở pop-up thêm mới treatment profile
  const openPopup = () => {
    setShowPopup(true);
  };

  // Đóng pop-up thêm mới treatment profile
  const closePopup = () => {
    setShowPopup(false);
  };

  // Xử lý sự kiện thêm mới treatment profile
  const handleAddTreatmentProfile = async () => {
    try {
      // Xử lý logic thêm mới treatment profile tại đây
      const newProfile = {
        customerID: id,
        description: newTreatmentProfileName,
        doctorID: user.id,
      };

      // Gửi yêu cầu tạo treatment profile
      const response = await axios.post('http://localhost:3000/api/treatment_profile/create', newProfile); // Thay đổi URL API tương ứng

      // Xử lý phản hồi từ server
      const createdProfile = response.data;
      console.log('Treatment profile created:', createdProfile);

      // Cập nhật danh sách treatment profiles
      setTreatmentProfiles([...treatmentProfiles, createdProfile]);

      // Sau khi xử lý, đóng pop-up và làm các thao tác cần thiết
      closePopup();
    } catch (error) {
      console.error('Error creating treatment profile:', error);
    }
  };

  return (
    <div id="PatientProfile" className="patient-profile">
      <h2>Thông tin bệnh nhân</h2>
      {customer ? (
        <div className='container'>
          <div className="info-item">
            <span className="label">Họ tên: </span>
            <span className="value">{customer.fullname}</span>
          </div>

          <div className="info-item">
            <span className="label">Giới tính: </span>
            <span className="value">{customer.gender}</span>
          </div>

          <div className="info-item">
            <span className="label">Số điện thoại: </span>
            <span className="value">{customer.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Email: </span>
            <span className="value">{customer.email}</span>
          </div>
          <div className="actions">
            <button className="btntreatment btn btn-success" onClick={openPopup}>
              Thêm mới treatment profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}



      <div className="treatment-profiles">
        <h3>Hồ sơ điều trị</h3>
        {treatmentProfiles.length > 0 ? (
          <div className='container'>
            <ul>
              {currentTreatmentProfiles.map((profile) => (
                <div className='carlink' key={profile.id}>
                  <div className='row'>
                    <div className='col-6'>
                      {profile.description}
                    </div>
                    <div className='col-6'>
                      <button className="btnlink btn btn-primary">
                        <Link className='thelink' to={`/doctor/viewTreatmentProfile/${profile.id}`} >
                          Xem chi tiết
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                &lt;&lt;
              </button>
              <button
                className="pagination-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
              <button
                className="pagination-button"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        ) : (
          <p>Không có hồ sơ điều trị có sẵn.</p>
        )}
      </div>

      {/* {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Thêm mới treatment profile</h3>
            <input
              type="text"
              placeholder="Tên treatment profile"
              value={newTreatmentProfileName}
              onChange={(e) => setNewTreatmentProfileName(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="popup-button" onClick={handleAddTreatmentProfile}>
                <Link to={`/Doctor/viewpatientprofile/${id}`} >
                  Xác nhận
                </Link>

              </button>
              <button className="popup-button" onClick={closePopup}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )} */}
      {showPopup && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Thêm mới treatment profile</h3>
                <button type="button" className="btn-close" onClick={closePopup} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên treatment profile"
                  value={newTreatmentProfileName}
                  onChange={(e) => setNewTreatmentProfileName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleAddTreatmentProfile}>
                  Xác nhận
                </button>
                <button type="button" className="btn btn-secondary" onClick={closePopup}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PatientProfile;
