import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './treatmentprofilelist.css';

function TreatmentProfilePage() {
  const { id } = useParams();
  const [treatmentProfiles, setTreatmentProfiles] = useState([]);

  useEffect(() => {
    const fetchTreatmentProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/schedule?id=${id}`);
        const data = response.data.treatmentProfiles;
        setTreatmentProfiles(data);
      } catch (error) {
        console.error('Error fetching treatment profiles:', error);
      }
    };

    fetchTreatmentProfiles();
  }, [id]);

  return (
    <div className="treatment-profile-page">
      <h2>Treatment Profiles</h2>
      {treatmentProfiles.map((profile) => (
        <div key={profile.id} className="profile-card">
          <h3>{profile.description}</h3>
          <p>Ngày tạo hồ sơ: {profile.createdAt}</p>
          <Link to={`/customer/treatmentprofile/${profile.id}`} className="detail-button">
            Xem chi tiết
          </Link>
          {/* Render other profile details */}
        </div>
      ))}
    </div>
  );
}

export default TreatmentProfilePage;
