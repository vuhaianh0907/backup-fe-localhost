import React, { useState, useEffect } from 'react';
import axios from "configs/axios";
import { useParams, Link } from 'react-router-dom';

import './ViewTreatmentProfile.scss'; // Import the CSS file for styling

function ViewTreatmentProfile() {
  const { id } = useParams(); // Get the ID from the URL

  const [treatmentProfile, setTreatmentProfile] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [treatmentIns, setTreatmentIns] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'doctor') {
        window.location.href = '/';
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchTreatmentProfile = async () => {
      try {
        const response = await axios.get(`treatment_profile/details?id=${id}`);
        const profileData = response.data.treatmentProfile;
        setTreatmentProfile(profileData);

        const doctorResponse = await axios.get(`account/doctor/details?id=${profileData.doctorID}`);
        const doctorData = doctorResponse.data.doctor;
        setDoctor(doctorData);

        const customerResponse = await axios.get(`account/customer/details?id=${profileData.customerID}`);
        const customerData = customerResponse.data.customer;
        setCustomer(customerData);

        const treatmentInsResponse = await axios.get(`treatmentin/getAllByTreatmentProfile?id=${profileData.id}`);
        const treatmentInsData = treatmentInsResponse.data.treatmentIns;
        const sortedTreatmentIns = treatmentInsData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTreatmentIns(sortedTreatmentIns);

        setIsLoading(false); // Set loading to false when data is fetched successfully
      } catch (error) {
        console.error('Error fetching treatment profile:', error);
        setIsLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchTreatmentProfile();
  }, [id]);

  const handleConfirm = () => {
    // Implement your logic for handling confirmation here
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-container m-5">
      <h2>{treatmentProfile.description}</h2>
      <div className="profile-details">
        <p>
          <strong>Ngày tạo: </strong> {treatmentProfile.createdAt}
        </p>
        <p>
          <strong>ID: </strong> {treatmentProfile.id}
        </p>
        <p>
          <strong>Bác sĩ phụ trách: </strong> {doctor.fullname}
        </p>
        <p>
          <strong>Bệnh nhân: </strong> {customer.fullname}
        </p>
      </div>
      <button className="btn btn-primary" onClick={handleConfirm}>
        <Link className='thelink' to={`/doctor/writetreatmentin/${treatmentProfile.id}`}> Viết thông tin điều trị

        </Link>

      </button>

      <div className="treatment-ins">
        <h3>Treatment Ins</h3>
        {treatmentIns.length > 0 ? (
          <ul>
            {treatmentIns.map((treatmentIn) => (
              <li key={treatmentIn.id}>
                <p>
                  <strong>Ngày: </strong> {treatmentIn.createdAt}
                </p>
                <p>
                  <strong>Quá trình: </strong> {treatmentIn.process}
                </p>
                <p>
                  <strong>Kết quả: </strong> {treatmentIn.result}
                </p>
                <p>
                  <strong>Ghi chú: </strong> {treatmentIn.note}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có phương pháp điều trị nào.</p>
        )}
      </div>
    </div>
  );
}

export default ViewTreatmentProfile;
