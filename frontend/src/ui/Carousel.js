import React, { useEffect, useState } from 'react'
import '../assets/css/carousel.css'

function Carousel({images}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="image-container" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index}`} />
          ))}
        </div>
        <div className="arrows">
          <button onClick={prevSlide} className="left">
            <i className="fas fa-angle-left"></i>
          </button>
          <button onClick={nextSlide} className="right">
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === currentImageIndex ? 'dot active' : 'dot'}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel