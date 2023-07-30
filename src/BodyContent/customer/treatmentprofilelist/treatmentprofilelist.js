import React, { useEffect, useState } from 'react';
import axios from "configs/axios";
import { useParams, Link } from 'react-router-dom';
import './treatmentprofilelist.scss';

function TreatmentProfilePage() {
  const { id } = useParams();
  const [treatmentProfiles, setTreatmentProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(treatmentProfiles.length / perPage);
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    if (user === null) {
      window.location.href = '/';
    } else {
      if (user.role !== 'customer') {
        window.location.href = '/';
      }
    }
  });

  useEffect(() => {
    const fetchTreatmentProfiles = async () => {
      try {
        const response = await axios.get(`treatment_profile/schedule?id=${id}`);
        const data = response.data.treatmentProfiles;
        const sortedData = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTreatmentProfiles(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching treatment profiles:', error);
        setIsLoading(false);
      }
    };

    fetchTreatmentProfiles();
  }, [id]);

  return (
    <div className="container treatment-profile-page">
      <h2>Hồ sơ điều trị</h2>
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-list">
          {treatmentProfiles.slice(startIndex, endIndex).map((profile) => (
            <div className="mb-3" key={profile.id}>
              <Link className='card' to={`/customer/treatmentprofile/${profile.id}`}>
                <div className="card-body">
                  <h3 className="card-title">{profile.description}</h3>
                  <p>Ngày tạo hồ sơ: {profile.createdAt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="paging-btn"
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span className="paging-btn">{currentPage}</span>
          <button
            className="paging-btn"
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
}

export default TreatmentProfilePage;
