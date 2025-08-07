import { Carousel } from 'react-bootstrap';
import { HotelDTO } from '../../../types/Hotel';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

interface HotelCardSearchProps {
  hotel: HotelDTO;
}

function HotelCardSearch({ hotel }: HotelCardSearchProps) {
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_API_URL;

  // Monta as URLs das imagens igual ao card da home
  const images = hotel.medias && hotel.medias.length > 0
    ? hotel.medias.map(img => backendUrl + img.mediaUrl)
    : ['/img/default.jpg'];

  const [searchParams] = useSearchParams();

  // Extrai os parâmetros da URL para repassar como state
  const searchState = {
    city: searchParams.get('city') || '',
    checkInDate: searchParams.get('checkInDate') || '',
    checkOutDate: searchParams.get('checkOutDate') || '',
    numberOfPeople: searchParams.get('numberOfPeople') ? Number(searchParams.get('numberOfPeople')) : 1,
    numberOfRooms: searchParams.get('numberOfRooms') ? Number(searchParams.get('numberOfRooms')) : 1,
    children: searchParams.get('children') ? Number(searchParams.get('children')) : 0,
  };

  return (
    <div className="card mb-5" style={{ width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
      <div className="row g-0 h-100">
        <div className="col-md-6">
          <Carousel>
            {images.map((imgUrl, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={imgUrl}
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
            <Link
              to={`/details/${hotel.hotelId}`}
              className="btn btn-success w-100"
              state={searchState} // Agora o state nunca estará vazio
            >
              Reservar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCardSearch;