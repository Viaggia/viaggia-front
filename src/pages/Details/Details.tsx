import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { HotelDTO } from '../../types/Hotel';
import { getHotelById } from '../../services/hotelService';
import Carousel from '../../components/cards/Carrossel/CarouselCards';
import ServiceList from '../../components/lists/ServiceList/ServiceList';
import RoomTypeList from '../../components/lists/RoomTypeList/RoomTypeList';
import ExtraCommoditiesList from '../../components/lists/ExtraCommoditiesList/ExtraCommoditiesList';

const backendUrl = "https://localhost:7164";

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<HotelDTO | null>(null);

  useEffect(() => {
    if (hotelId) {
      getHotelById(Number(hotelId)).then(data => setHotel(data));
    }
  }, [hotelId]);

  if (!hotel) return <div>Carregando...</div>;

  console.log('Hotel:', hotel);

  // Monta lista de imagens
  const images = hotel.medias.map(m => backendUrl + m.mediaUrl);

  const comodities = hotel.commodities[0] || {};

  const allServices = [
    { key: 'hasWiFi', label: 'Wi-Fi', paidKey: 'isWiFiPaid' },
    { key: 'hasBreakfast', label: 'Café da manhã', paidKey: 'isBreakfastPaid' },
    { key: 'hasPool', label: 'Piscina', paidKey: 'isPoolPaid' },
    { key: 'hasAccessibilityFeatures', label: 'Acessibilidade', paidKey: 'isAccessibilityFeaturesPaid' },
    { key: 'hasParking', label: 'Estacionamento', paidKey: 'isParkingPaid' },
    { key: 'hasLunch', label: 'Almoço', paidKey: 'isLunchPaid' },
    { key: 'hasDinner', label: 'Janta', paidKey: 'isDinnerPaid' },
    { key: 'hasSpa', label: 'Spa', paidKey: 'isSpaPaid' },
    { key: 'hasGym', label: 'Academia', paidKey: 'isGymPaid' },
    { key: 'isPetFriendly', label: 'Pet Friendly', paidKey: 'isPetFriendlyPaid' },
    { key: 'hasAirConditioning', label: 'Ar-condicionado', paidKey: 'isAirConditioningPaid' },
  ];

  const inclusos = allServices
    .filter(s => comodities[s.key as keyof typeof comodities] && comodities[s.paidKey as keyof typeof comodities] === false)
    .map(s => s.label);

  const pagos = allServices
    .filter(s => comodities[s.key as keyof typeof comodities] && comodities[s.paidKey as keyof typeof comodities] === true)
    .map(s => s.label);

  const naoOfertados = allServices
    .filter(s => !comodities[s.key as keyof typeof comodities])
    .map(s => s.label);

  return (
    <div className="container-fluid py-5">
      <div className="m-3">
        <h1 className="mb-2">{hotel.name}</h1>
        <h3 className="mb-1">{hotel.city}, {hotel.state}</h3>
        <div>
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <span key={i} style={{ color: '#FFD700', fontSize: '1.2em' }}>★</span>
          ))}
        </div>
      </div>

      {/* Carrossel de imagens */}
      <div className="row justify-content-around align-items-start">
        <div className="col-lg-6 mb-4">
          <Carousel images={images} />
        </div>

        {/* Card de serviços adicionais */}
        <div className="col-lg-3 mt-0">
          <div className="card p-3">
            <h5>Contato</h5>
            <div>Email: {hotel.contactEmail}</div>
            <div>Telefone: {hotel.contactPhone}</div>
            <div>Check-in: {hotel.checkInTime} | Check-out: {hotel.checkOutTime}</div>
          </div>
          <button className="btn btn-primary mt-4 w-100" onClick={() => navigate('/payment')}>
            Ir para Pagamento
          </button>
        </div>
      </div>

      {/* Descrição */}
      <div className="col-md-8 m-3 mt-0">
        <p className="fw-bold">{hotel.description}</p>
      </div>


      {/* Serviços e comodidades */}
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 gx-3 gy-3">
          <ServiceList title="Serviços inclusos" items={inclusos} />
          <ServiceList title="Serviços pagos" items={pagos} />
          <ServiceList title="Não ofertados" items={naoOfertados} />
          <ExtraCommoditiesList commoditieServices={hotel.commoditieServices} />
        </div>
      </div>

      {/* Listagem de quartos */}
      <div className="container mt-5">
        <RoomTypeList roomTypes={hotel.roomTypes} />
      </div>

    </div>
  );
};

export default Details;