import React, { useState } from 'react';
import './CreateTreatmentIn.css';

function CreateTreatmentIn() {
  // Khởi tạo state cho các trường nhập liệu
  const [treatmentProgress, setTreatmentProgress] = useState(['']);
  const [results, setResults] = useState(['']);
  const [advice, setAdvice] = useState(['']);

  // Hàm xử lý thêm ô nhập liệu
  const handleAddInputBox = (field) => {
    if (field === 'treatmentProgress') {
      setTreatmentProgress((prevProgress) => [...prevProgress, '']);
    } else if (field === 'results') {
      setResults((prevResults) => [...prevResults, '']);
    } else if (field === 'advice') {
      setAdvice((prevAdvice) => [...prevAdvice, '']);
    }
  };

  // Hàm xử lý khi nhấn nút Complete
  const handleComplete = () => {
    console.log('Treatment Complete');
    // Thực hiện các tác vụ khi nhấn nút Complete
  };

  // Hàm xử lý khi nhấn nút Re-appoint
  const handleReappoint = () => {
    console.log('Re-appoint Treatment');
    // Thực hiện các tác vụ khi nhấn nút Re-appoint
  };

  // Hàm xử lý thay đổi giá trị của treatmentProgress
  const handleProgressChange = (index, value) => {
    setTreatmentProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress[index] = value;
      return updatedProgress;
    });
  };

  // Hàm xử lý thay đổi giá trị của results
  const handleResultChange = (index, value) => {
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[index] = value;
      return updatedResults;
    });
  };

  // Hàm xử lý thay đổi giá trị của advice
  const handleAdviceChange = (index, value) => {
    setAdvice((prevAdvice) => {
      const updatedAdvice = [...prevAdvice];
      updatedAdvice[index] = value;
      return updatedAdvice;
    });
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {/* Hiển thị thông tin người dùng */}
      <div className="profile-details">
        <div>
          <label>Name:</label>
          <input type="text" value="John Doe" readOnly />
        </div>
        <div>
          <label>ID:</label>
          <input type="text" value="123456" readOnly />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" value="Male" readOnly />
        </div>
        <div>
          <label>Treatment Date:</label>
          <input type="text" value="2023-06-28" readOnly />
        </div>
      </div>
      {/* Hiển thị form nhập liệu */}
      <div className="input-form">
        <h3>Treatment Profile</h3>
        <div className="treatment-profile">
          <input type="text" value="Sample Treatment Profile" readOnly />
        </div>
        <div className="input-boxes">
          {/* Hiển thị ô nhập liệu cho treatmentProgress */}
          {treatmentProgress.map((progress, index) => (
            <div className="input-box" key={index}>
              <input
                type="text"
                value={progress}
                onChange={(e) => handleProgressChange(index, e.target.value)}
                placeholder="Treatment Progress"
              />
              {/* Nút thêm ô nhập liệu cho treatmentProgress */}
              {index === treatmentProgress.length - 1 && (
                <button onClick={() => handleAddInputBox('treatmentProgress')}>
                  Add
                </button>
              )}
            </div>
          ))}
          {/* Hiển thị ô nhập liệu cho results */}
          {results.map((result, index) => (
            <div className="input-box" key={index}>
              <input
                type="text"
                value={result}
                onChange={(e) => handleResultChange(index, e.target.value)}
                placeholder="Result"
              />
              {/* Nút thêm ô nhập liệu cho results */}
              {index === results.length - 1 && (
                <button onClick={() => handleAddInputBox('results')}>Add</button>
              )}
            </div>
          ))}
          {/* Hiển thị ô nhập liệu cho advice */}
          {advice.map((adviceText, index) => (
            <div className="input-box" key={index}>
              <input
                type="text"
                value={adviceText}
                onChange={(e) => handleAdviceChange(index, e.target.value)}
                placeholder="Advice"
              />
              {/* Nút thêm ô nhập liệu cho advice */}
              {index === advice.length - 1 && (
                <button onClick={() => handleAddInputBox('advice')}>Add</button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Hiển thị các nút hoàn thành và tái khám */}
      <div className="action-buttons">
        <button className="complete-button" onClick={handleComplete}>
          Complete
        </button>
        <button className="reappoint-button" onClick={handleReappoint}>
          Re-appoint
        </button>
      </div>
    </div>
  );
}

export default CreateTreatmentIn;
