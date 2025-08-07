import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './carouselStyle.css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  if (!images.length) return null;

  return (
    <div className="pt-0 mt-0">
      <div
        id="uniqueCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img
                src={img}
                className="carousel-img d-block w-100"
                alt={`Imagem ${index + 1}`}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#uniqueCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#uniqueCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;