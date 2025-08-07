import { Carousel } from 'react-bootstrap';
import { HotelDTO, CommodityDTO, CustomCommodityDTO } from '../../../types/Hotel';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';
import React from 'react';

interface HotelCardSearchProps {
  hotel: HotelDTO;
}

function HotelCardSearch({ hotel }: HotelCardSearchProps) {
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_API_URL;

  const commodities: CommodityDTO[] = hotel.commodities || [];

  const images = hotel.medias && hotel.medias.length > 0
    ? hotel.medias.map(img => backendUrl + img.mediaUrl)
    : [];

  const CARD_HEIGHT = 300; // Altura fixa do card

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
    <div
      className="shadow-sm mb-4 mx-2"
      style={{
        borderRadius: 16,
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#fff',
        minHeight: CARD_HEIGHT,
        height: CARD_HEIGHT,
        width: '100%',
      }}
    >
      {/* Imagem */}
      <div style={{ width: '50%', flexShrink: 0, height: '100%' }}>
        {images.length > 0 ? (
          <Carousel indicators={images.length > 1} controls={images.length > 1} interval={3000}>
            {images.map((imgUrl, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={imgUrl}
                  alt={`Imagem ${idx}`}
                  className="d-block w-100"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div style={{ width: '100%', backgroundColor: '#f0f0f0', height: '100%' }} />
        )}
      </div>

      {/* Conteúdo */}
      <div
        style={{
          width: '50%',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          {/* Nome do hotel */}
          <h5 className="fw-bold mb-2">{hotel.name}</h5>

          {/* Avaliação do hotel */}
          <div className="d-flex align-items-center mb-3">
            <StarIcon style={{ color: '#FFC107', marginRight: 4 }} />
            <span className="text-muted">{hotel.starRating} estrelas</span>
          </div>

          {/* Comodidades com ícones */}
          <div className="d-flex flex-wrap mb-3">
            {commodities.map(c =>
              (Object.keys(comoditiesIcons) as string[]).map(key => {
                const icon = comoditiesIcons[key as keyof typeof comoditiesIcons];
                if (c[key as keyof CommodityDTO]) {
                  return (
                    <div key={`${c.commodityId}-${key}`} className="me-2">
                      {icon}
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        </div>

        {/* Preço e botão */}
        <div>
          <h5 style={{ color: '#0071c2', fontWeight: 600 }}>
            {hotel.roomTypes[0]?.price ? `R$ ${hotel.roomTypes[0].price.toFixed(2)}` : 'Preço indisponível'}
          </h5>
          <Link
            to={`/details/${hotel.hotelId}`}
            state={searchState}
            className="btn btn-success w-100 mt-2"
            style={{ borderRadius: 8, fontWeight: 500, fontSize: 16 }}
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelCardSearch;
