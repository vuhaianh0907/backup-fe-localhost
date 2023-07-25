import React, { useState } from 'react';
import './Carousel.scss';

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        {items.map((item, index) => (
          <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
            <div className="carousel-item-inner">
              <img src={item.image} alt={item.name} />
              <h6>{item.name}</h6>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-prev-btn" onClick={handlePrev}>&#10094;</button>
      <button className="carousel-next-btn" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default Carousel;
