import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HotelDTO } from '../../types/Hotel';
import { getAvailableRooms, getHotelById } from '../../services/hotelService';
import Carousel from '../../components/cards/Carrossel/CarouselCards';
import ServiceList from '../../components/lists/ServiceList/ServiceList';
import RoomTypeList from '../../components/lists/RoomTypeList/RoomTypeList';
import ExtraCommoditiesList from '../../components/lists/ExtraCommoditiesList/ExtraCommoditiesList';
import DateRangePicker, { getFutureISO, getTodayISO } from '../../components/forms/DateRangePicker/DateRangePicker';

// IMPORT DO ReviewList
import ReviewList from '../../components/lists/ReviewList/ReviewList';
import { ReviewDTO } from '../../types/Review';
import { getReviewsByHotel } from '../../services/reviewServices';
import { getUserById } from '../../services/userService';
import Maps from '../../components/Map/Map';

const backendUrl = "https://localhost:7164";

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<HotelDTO | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [roomTypeId: number]: number }>({});
  const [showError, setShowError] = useState(false);

  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const location = useLocation();

  const searchState = location.state || {};
  const [userMap, setUserMap] = useState<{ [userId: number]: { name: string } }>({});

  const [checkIn, setCheckIn] = useState(
    searchState.checkInDate || getTodayISO()
  );
  const [checkOut, setCheckOut] = useState(
    searchState.checkOutDate || getFutureISO(7)
  );
  const [adults, setAdults] = useState(
    typeof searchState.adults === 'number'
      ? searchState.adults
      : typeof searchState.numberOfPeople === 'number'
        ? Math.max(1, searchState.numberOfPeople - (searchState.children || 0))
        : 1
  );
  const [children, setChildren] = useState(
    typeof searchState.children === 'number' ? searchState.children : 0
  );
  const [rooms, setRooms] = useState(
    typeof searchState.numberOfRooms === 'number' ? searchState.numberOfRooms : 1
  );

  useEffect(() => {
    const state = location.state || {};
    setCheckIn(state.checkInDate || getTodayISO());
    setCheckOut(state.checkOutDate || getFutureISO(7));
    setAdults(
      typeof state.adults === 'number'
        ? state.adults
        : typeof state.numberOfPeople === 'number'
          ? Math.max(1, state.numberOfPeople - (state.children || 0))
          : 1
    );
    setChildren(typeof state.children === 'number' ? state.children : 0);
    setRooms(typeof state.numberOfRooms === 'number' ? state.numberOfRooms : 1);
  }, [location.state]);

  const handleQuantityChange = (roomTypeId: number, quantity: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [roomTypeId]: quantity
    }));
    if (showError && quantity > 0) setShowError(false);
  };

  const totalSelected = Object.values(selectedQuantities).reduce((sum, q) => sum + q, 0);

  useEffect(() => {
    if (hotelId) {
      getHotelById(Number(hotelId)).then(data => setHotel(data));
    }
  }, [hotelId]);

  // Busca os reviews ao carregar o hotel
  useEffect(() => {
    async function fetchReviewsAndUsers() {
      if (!hotelId) return;
      setLoadingReviews(true);
      try {
        const data = await getReviewsByHotel(Number(hotelId));
        setReviews(data);

        // Busca os usuários únicos das reviews
        const uniqueUserIds = Array.from(new Set(data.map(r => r.userId)));
        const userPromises = uniqueUserIds.map(id => getUserById(id).catch(() => null));
        const users = await Promise.all(userPromises);

        // Monta o mapa userId -> nome
        const map: { [userId: number]: { name: string } } = {};
        users.forEach((user, idx) => {
          if (user) map[uniqueUserIds[idx]] = { name: user.name };
        });
        setUserMap(map);

      } catch (error) {
        setReviews([]);
        setUserMap({});
      } finally {
        setLoadingReviews(false);
      }
    }
    fetchReviewsAndUsers();
  }, [hotelId]);

  console.log("hotel", hotel)

  if (!hotel) return <div>Carregando...</div>;

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

  const handleSearch = async () => {
    try {
      // Soma adultos + crianças para o filtro
      const numberOfPeople = adults + children;
      if (!checkIn || !checkOut) {
        alert('Selecione as datas de check-in e check-out.');
        return;
      }
      const availableRooms = await getAvailableRooms(
        hotel.hotelId,
        numberOfPeople,
        checkIn,
        checkOut
      );
      // Atualiza os quartos do hotel com o resultado filtrado
      setHotel(prev => prev ? { ...prev, roomTypes: availableRooms } : prev);
    } catch (error) {
      alert('Não foi possível buscar quartos disponíveis.');
      console.error(error);
    }
  };

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
          <ExtraCommoditiesList
            customCommodities={hotel.commodities[0]?.customCommodities || []}
          />
        </div>
      </div>

      {/* Listagem de quartos */}
      <div className="container mt-5">
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          adults={adults}
          children={children}
          rooms={rooms}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          onRoomsChange={setRooms}
          onSearch={handleSearch}
        />
        <RoomTypeList
          roomTypes={hotel.roomTypes}
          selectedQuantities={selectedQuantities}
          onQuantityChange={handleQuantityChange}
          showError={showError}
        />
        {showError && (
          <div className="alert alert-danger mt-3" role="alert">
            Selecione pelo menos um quarto para continuar.
          </div>
        )}
        <button
          className="btn btn-primary mt-4"
          onClick={() => {
            if (totalSelected === 0) {
              setShowError(true);
              return;
            }
            const selectedRooms = hotel.roomTypes
              .filter(rt => selectedQuantities[rt.roomTypeId] > 0)
              .map(rt => ({
                ...rt,
                quantity: selectedQuantities[rt.roomTypeId]
              }));
            navigate('/payment', {
              state: {
                hotel,
                selectedRooms,
                checkInDate: checkIn,
                checkOutDate: checkOut,
              }
            });
          }}
        >
          Ir para Pagamento
        </button>
      </div>
      {/* Lista de avaliações dos hóspedes */}
      <ReviewList reviews={reviews} loading={loadingReviews} userMap={userMap} />

      <div>
        {/* Descrição + Mapa */}
        <div className="col-md-8 m-3 mt-0">
          {/* Mapa com endereço do hotel */}
          <div className="mt-4">
            <h1>Localização</h1>
            <Maps address={`${hotel.street}, ${hotel.city}, ${hotel.state}`} />
          </div>
        </div>

      </div>
    </div>
  );
};
export default Details;