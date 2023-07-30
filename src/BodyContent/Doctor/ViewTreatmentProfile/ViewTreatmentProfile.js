import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import './ViewTreatmentProfile.scss'; // Import the CSS file for styling

function ViewTreatmentProfile() {
  const { id } = useParams(); // Get the ID from the URL

  const [treatmentProfile, setTreatmentProfile] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [treatmentIns, setTreatmentIns] = useState([]);
  const storedUserString = sessionStorage.getItem('token');
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

  useEffect(() => {
    const fetchTreatmentProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/details?id=${id}`); // Replace with your API endpoint
        const profileData = response.data.treatmentProfile;
        setTreatmentProfile(profileData);

        // Fetch doctor information
        const doctorResponse = await axios.get(`http://localhost:3000/api/account/doctor/details?id=${profileData.doctorID}`);
        const doctorData = doctorResponse.data.doctor;
        setDoctor(doctorData);

        // Fetch customer information
        const customerResponse = await axios.get(`http://localhost:3000/api/account/customer/details?id=${profileData.customerID}`);
        const customerData = customerResponse.data.customer;
        setCustomer(customerData);

        // Fetch treatment_ins based on TreatmentProfile.id
        const treatmentInsResponse = await axios.get(`http://localhost:3000/api/treatmentin/getAllByTreatmentProfile?id=${profileData.id}`);
        const treatmentInsData = treatmentInsResponse.data.treatmentIns;
        const sortedTreatmentIns = treatmentInsData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTreatmentIns(sortedTreatmentIns);
      } catch (error) {
        console.error('Error fetching treatment profile:', error);
      }
    };

    fetchTreatmentProfile();
  }, [id]);

  const handleConfirm = () => {

  };

  if (!treatmentProfile || !doctor || !customer) {
    return <p>Loading...</p>;
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
