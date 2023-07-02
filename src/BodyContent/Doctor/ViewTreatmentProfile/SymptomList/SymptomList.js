import React, { useState } from 'react';
import './SymptomList.css';

function SymptomList({ symptoms, onAddSymptom }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSymptomName, setNewSymptomName] = useState('');
  const [newSymptomDescription, setNewSymptomDescription] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateFormToggle = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleSaveSymptom = () => {
    const symptom = {
      name: newSymptomName,
      description: newSymptomDescription,
    };
    onAddSymptom(symptom);
    setNewSymptomName('');
    setNewSymptomDescription('');
    setShowCreateForm(false);
  };

  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="symptom-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for symptoms"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="symptom-results">
        {filteredSymptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>
      {showCreateForm && (
        <div className="create-symptom-form">
          <h3>Create New Symptom</h3>
          <div className="form-group">
            <label htmlFor="symptom-name">Symptom Name:</label>
            <input
              type="text"
              id="symptom-name"
              value={newSymptomName}
              onChange={(e) => setNewSymptomName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="symptom-description">Symptom Description:</label>
            <textarea
              id="symptom-description"
              value={newSymptomDescription}
              onChange={(e) => setNewSymptomDescription(e.target.value)}
            />
          </div>
          <button className="add-symptom-button" onClick={handleSaveSymptom}>
            Add Symptom
          </button>
        </div>
      )}
      <button className="create-symptom-button" onClick={handleCreateFormToggle}>
        Create New Symptom
      </button>
    </div>
  );
}

export default SymptomList;
