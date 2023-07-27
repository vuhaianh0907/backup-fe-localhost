import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';



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



  if (!treatmentProfile || !doctor || !customer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>{treatmentProfile.description}</h2>
      <div className='container profile-form'>
        <div className="profile-details">
          <p>
            <strong>Ngày tạo:</strong> {treatmentProfile.createdAt}
          </p>
          <p>
            <strong>ID:</strong> {treatmentProfile.id}
          </p>
          <p>
            <strong>Tên bác sĩ điều trị:</strong> {doctor.fullname}
          </p>
          <p>
            <strong>Tên khách hàng:</strong> {customer.fullname}
          </p>
        </div>


        <div className="treatment-ins">
          <h3>Treatment Ins</h3>
          {treatmentIns.length > 0 ? (
            <div className='container'>
              {treatmentIns.map((treatmentIn) => (
                <div key={treatmentIn.id}>
                  <div class="card mb-3">
                    <div class="card-body row">
                      <div className='col-lg-6'>
                        <strong>Ngày khám:</strong> {treatmentIn.createdAt}
                      </div>
                      <div className='col-lg-6'>
                        <strong>Quá trình:</strong> {treatmentIn.process}
                      </div>
                      <div className='col-lg-6'>
                        <strong>Kết quả:</strong> {treatmentIn.result}
                      </div>
                      <div className='col-lg-6'>
                        <strong>Ghi chú:</strong> {treatmentIn.note}
                      </div></div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <p>Không có phương pháp điều trị nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTreatmentProfile;
