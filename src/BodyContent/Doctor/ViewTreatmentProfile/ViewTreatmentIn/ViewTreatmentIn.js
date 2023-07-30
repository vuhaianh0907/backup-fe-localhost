import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTreatmentIn.css'; // Import the CSS file for styling

function ViewTreatmentIn() {
  const { id } = useParams(); // Get the ID from the URL

  const [treatmentProfile, setTreatmentProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to control loading status
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
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/details?id=${id}`); // Replace with your API endpoint
        const profileData = response.data.treatmentProfile;
        setTreatmentProfile(profileData);
        setIsLoading(false); // Set loading status to false when data is fetched
      } catch (error) {
        console.error('Error fetching treatment profile:', error);
        setIsLoading(false); // Set loading status to false even in case of error
      }
    };

    fetchTreatmentProfile();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>; // Display loading message when data is being fetched
  }

  if (!treatmentProfile) {
    return <p>No data found.</p>; // Display message when there is no data
  }

  return (
    <div className="treatment-container">
      <h2>View Treatment In</h2>
      <div className="progress-box">
        <p><strong>Profile Name:</strong> {treatmentProfile.profileName}</p>
        <p><strong>Treatment Time:</strong> {treatmentProfile.time}</p>
        <p><strong>Treatment Progress:</strong> {treatmentProfile.progress}</p>
        <p><strong>Result:</strong> {treatmentProfile.result}</p>
        <p><strong>Note:</strong> {treatmentProfile.note}</p>
      </div>
    </div>
  );
}

export default ViewTreatmentIn;
