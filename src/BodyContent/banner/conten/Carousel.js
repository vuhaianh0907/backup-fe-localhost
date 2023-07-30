import React, { useState, useEffect } from 'react';
import './Carousel.scss';

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // const [carouselPages, setCarouselPages] = useState([]);

  // useEffect(() => {
  //   const chunkSize = 3;
  //   for (let i = 0; i < items.length; i += chunkSize) {
  //     const chunk = items.slice(i, i + chunkSize);
  //     setCarouselPages(data => [...data, chunk]);
  //   }

  //   console.log("carouselPages >>> ", carouselPages);

  // }, [items])

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
    // <div>
    //   <div id="carousel-multiple" className="carousel slide" data-bs-ride="carousel">
    //     <div className="carousel-inner">
    //       {carouselPages.map((page, pageIndex) => (
    //         <div className="carousel-item active" key={pageIndex}>
    //           <div className="cards-wrapper">
    //             {page.map((item, itemIndex) => (
    //               <div className="card" key={itemIndex}>
    //                 <div className="image-wrapper">
    //                   <img src={item.image} alt={item.name} />
    //                 </div>
    //                 <div className="card-body">
    //                   <h5 className="card-title">{item.name}</h5>
    //                   <p className="card-text">{item.content}</p>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <button className="carousel-control-prev" type="button" data-bs-target="#carousel-multiple" data-bs-slide="prev">
    //       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //       <span className="visually-hidden">Previous</span>
    //     </button>
    //     <button className="carousel-control-next" type="button" data-bs-target="#carousel-multiple" data-bs-slide="next">
    //       <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //       <span className="visually-hidden">Next</span>
    //     </button>
    //   </div>
    // </div>
  );
};

export default Carousel;
