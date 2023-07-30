import React, { useEffect, useState } from "react";

import './AddProfilePopup.css'; // Import the CSS file for styling

function AddProfilePopup({ onClose, onAddProfile }) {
  const [profileName, setProfileName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to control loading status
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

  const handleProfileNameChange = (event) => {
    setProfileName(event.target.value);
  };

  const handleAddProfile = () => {
    setIsLoading(true); // Set loading status to true when adding profile
    onAddProfile(profileName);
    onClose();
  };

  return (
    <div className="popup-container">
      {isLoading && <div className="loading-overlay">Loading...</div>}
      <div className="popup-content">
        <h2>Add Profile</h2>
        <div className="profile-name-input">
          <label>Profile Name:</label>
          <input type="text" value={profileName} onChange={handleProfileNameChange} />
        </div>
        <div className="popup-buttons">
          <button onClick={handleAddProfile}>Add Profile</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddProfilePopup;
