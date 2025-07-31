import { Carousel } from 'react-bootstrap';
import { HotelDTO } from '../../../types/Hotel';

interface HotelCardSearchProps {
  hotel: HotelDTO;
}

function HotelCardSearch({ hotel }: HotelCardSearchProps) {
  return (
    <div className="card mb-5" style={{ width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
      <div className="row g-0 h-100">
        <div className="col-md-6">
          <Carousel>
            {hotel.medias.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={img.mediaUrl}
                  alt={`Imagem ${idx}`}
                  className="d-block w-100 h-100"
                  style={{ objectFit: 'cover', height: '300px' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-md-6 p-4 d-flex flex-column justify-content-between h-100">
          <div>
            <h4 className="fw-bold">{hotel.name}</h4>
            <p>{hotel.description}</p>
            <p className="text-muted">⭐ {hotel.starRating} estrelas</p>
          </div>
          <div>
            <h5 className="text-primary">
              {hotel.roomTypes[0]?.price ? `R$ ${hotel.roomTypes[0].price.toFixed(2)}` : 'Preço indisponível'}
            </h5>
            <button className="btn btn-success w-100">Reservar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCardSearch;
