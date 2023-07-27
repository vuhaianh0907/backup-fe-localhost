import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';

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

        // Fetch doctor information
        const doctorResponse = await axios.get(`https://oooo-zifh.onrender.com/api/account/doctor/details?id=${profileData.doctorID}`);
        const doctorData = doctorResponse.data.doctor;
        setDoctor(doctorData);

        // Fetch customer information
        const customerResponse = await axios.get(`https://oooo-zifh.onrender.com/api/account/customer/details?id=${profileData.customerID}`);
        const customerData = customerResponse.data.customer;
        setCustomer(customerData);

        // Fetch treatment_ins based on TreatmentProfile.id
        const treatmentInsResponse = await axios.get(`https://oooo-zifh.onrender.com/api/treatmentin/getAllByTreatmentProfile?id=${profileData.id}`);
        const treatmentInsData = treatmentInsResponse.data.treatmentIns;
        setTreatmentIns(treatmentInsData);
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
    <div className="profile-container">
      <h2>{treatmentProfile.description}</h2>
      <div className="profile-details">
        <p>
          <strong>Ngày tạo:</strong> {treatmentProfile.createdAt}
        </p>
        <p>
          <strong>ID:</strong> {treatmentProfile.id}
        </p>
        <p>
          <strong>Doctor:</strong> {doctor.fullname}
        </p>
        <p>
          <strong>Customer:</strong> {customer.fullname}
        </p>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        <Link to={`/doctor/writetreatmentin/${treatmentProfile.id}`}> Write Treatment In

        </Link>

      </button>

      <div className="treatment-ins">
        <h3>Treatment Ins</h3>
        {treatmentIns.length > 0 ? (
          <ul>
            {treatmentIns.map((treatmentIn) => (
              <li key={treatmentIn.id}>
                <p>
                  <strong>Date:</strong> {treatmentIn.createdAt}
                </p>
                <p>
                  <strong>Process:</strong> {treatmentIn.process}
                </p>
                <p>
                  <strong>Result:</strong> {treatmentIn.result}
                </p>
                <p>
                  <strong>Note:</strong> {treatmentIn.note}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No treatment ins available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewTreatmentProfile;
