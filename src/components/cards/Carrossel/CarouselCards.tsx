import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './carouselStyle.css'; // Estilos separados para manter a organização

const imageList = [
  'coffemanha.jpg',
  'hotelquarto.jpg',
  'praia1.jpg',
  'chale2.jpg',
  'chale3.jpg',
  'quartochale2.jpg',
];

const Carousel: React.FC = () => {
  return (
    <div className="pt-0 mt-0">
      <div
        id="uniqueCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {imageList.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img
                src={`/img/${img}`}
                className="carousel-img d-block w-100"
                alt={img}
              />
            </div>
          ))}
        </div>

        {/* Botões de navegação */}
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
      </div>
    </div>
  );
};

export default Carousel;
