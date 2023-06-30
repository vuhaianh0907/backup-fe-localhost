import React, { useState } from 'react';
import './ViewTreatementList.css'; // Import the CSS file for styling

function ViewTreatementList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      doctor: 'Dr. Jane Smith',
      treatmentDate: '2023-06-28',
      symptoms: 'Fever, headache, cough',
      treatmentProgress: 'In progress'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 42,
      gender: 'Female',
      doctor: 'Dr. Michael Johnson',
      treatmentDate: '2023-06-30',
      symptoms: 'Fatigue, joint pain',
      treatmentProgress: 'Not started'
    },
    // Add more profiles here
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProfile = () => {
    // Handle the logic to add a new profile
    console.log('Add Profile');
  };

  const handleViewProfile = (profileId) => {
    // Handle the logic to view a profile based on its ID
    console.log('View Profile:', profileId);
  };

  const handleInputTreatmentInfo = (profileId) => {
    // Handle the logic to input treatment info for a profile based on its ID
    console.log('Input Treatment Info:', profileId);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clinic-page">
      <h2>Clinic Profiles</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search patient..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="profile-list">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div className="profile-card" key={profile.id}>
              <p><strong>Patient Name:</strong> {profile.name}</p>
              {/* <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <p><strong>Doctor:</strong> {profile.doctor}</p> */}
              <p><strong>Treatment Date:</strong> {profile.treatmentDate}</p>
              {/* <p><strong>Symptoms:</strong> {profile.symptoms}</p> */}
              <p><strong>Treatment Progress:</strong> {profile.treatmentProgress}</p>
              <div className="profile-buttons">
                <button onClick={() => handleViewProfile(profile.id)}>View Profile</button>
                <button onClick={() => handleInputTreatmentInfo(profile.id)}>Input Treatment Info</button>
              </div>
            </div>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
      <button className="add-profile-button" onClick={handleAddProfile}>Add Profile</button>
    </div>
  );
};

export default ViewTreatementList;
