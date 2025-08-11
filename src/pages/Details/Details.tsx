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

  const [mainImageIdx, setMainImageIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

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

  const getNumberOfNights = (checkIn: string, checkOut: string) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    return Math.max(1, Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const numberOfNights = getNumberOfNights(checkIn, checkOut);

  const totalPrice = hotel.roomTypes
    .filter(rt => selectedQuantities[rt.roomTypeId] > 0)
    .reduce(
      (sum, rt) => sum + (rt.price * selectedQuantities[rt.roomTypeId] * numberOfNights),
      0
    );

  return (
    <div className="container-fluid py-5">
      {/* Container centralizado para cabeçalho, fotos e contato */}
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="m-3">
          <h1 className="mb-2">{hotel.name}</h1>
          <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <span key={i} style={{ color: '#FFD700', fontSize: '1.5em', marginRight: '4px' }}>★</span>
            ))}
          </div>
          {/* Nota média abaixo das estrelas */}
          <div className="mb-2 d-flex align-items-center" style={{ fontSize: '1.1em', fontWeight: 500 }}>
            {(() => {
              const nota = +(hotel.averageRating * 2).toFixed(1);
              let cor = '#e74c3c';
              let texto = 'Regular';
              if (nota >= 9) {
                cor = '#27ae60';
                texto = 'Excelente';
              } else if (nota >= 8) {
                cor = '#2ecc40';
                texto = 'Muito Bom';
              } else if (nota >= 7) {
                cor = '#f1c40f';
                texto = 'Bom';
              } else if (nota >= 6) {
                cor = '#f39c12';
                texto = 'Ok';
              }
              return (
                <>
                  <div
                    style={{
                      background: cor,
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '4px 14px',
                      fontWeight: 700,
                      fontSize: '1.2em',
                      minWidth: 55,
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                      marginRight: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <i className="bi bi-star-fill" style={{ fontSize: '1em', marginRight: 4 }} />
                    {nota}
                  </div>
                  <span style={{ color: cor, fontWeight: 600, fontSize: '1.1em' }}>{texto}</span>
                </>
              );
            })()}
          </div>
          <div className="mb-2 text-muted fw-semibold">
            {hotel.street}, {hotel.city} - {hotel.state}, CEP: {hotel.zipCode}
          </div>
        </div>

        {/* Imagens do hotel e card de contato */}
        <div className="row mb-4 justify-content-between align-items-start">
          {/* Bloco das imagens */}
          <div className="col-lg-7 d-flex">
            <div style={{ flex: 1 }}>
              {images[mainImageIdx] && (
                <img
                  src={images[mainImageIdx]}
                  alt="Imagem principal do hotel"
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', height: '350px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => { setModalImg(images[mainImageIdx]); setModalOpen(true); }}
                />
              )}
            </div>
            <div className="d-flex flex-column gap-3 ms-3">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Foto ${idx + 1} do hotel`}
                  className={`img-fluid rounded ${mainImageIdx === idx ? 'border border-primary' : ''}`}
                  style={{ width: '120px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => setMainImageIdx(idx)}
                  onDoubleClick={() => { setModalImg(img); setModalOpen(true); }}
                />
              ))}
            </div>
          </div>
          {/* Card de contato encostado à direita */}
          <div className="col-lg-4 d-flex flex-column align-items-end">
            <div
              className="card shadow-lg border-0 p-4 w-100"
              style={{
                minWidth: 260,
                background: 'linear-gradient(135deg, #f8fafc 80%, #e3e7ed 100%)',
                borderRadius: '18px'
              }}
            >
              <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>
                <i className="bi bi-person-lines-fill me-2"></i>Contato
              </h5>
              <div className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope-fill text-secondary me-2"></i>
                <span className="fw-semibold">{hotel.contactEmail}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone-fill text-secondary me-2"></i>
                <span className="fw-semibold">{hotel.contactPhone}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <i className="bi bi-clock-fill text-secondary me-2"></i>
                <span>
                  <span className="fw-semibold">Check-in:</span> {hotel.checkInTime}
                  <span className="mx-2">|</span>
                  <span className="fw-semibold">Check-out:</span> {hotel.checkOutTime}
                </span>
              </div>
            </div>
            <button
              className="btn btn-primary mt-4 w-100"
              style={{ borderRadius: '10px', fontWeight: 600, fontSize: '1.1em' }}
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
                    totalPrice
                  }
                });
              }}
            >
              <i className="bi bi-credit-card-2-front me-2"></i>
              Ir para Pagamento
            </button>
            {showError && (
              <div className="alert alert-danger mt-3 w-100" role="alert">
                Selecione pelo menos um quarto para continuar.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para imagem ampliada */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)' }}
          tabIndex={-1}
          role="dialog"
          onClick={() => setModalOpen(false)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body p-0 text-center">
                <img src={modalImg || ''} alt="Imagem ampliada" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }} />
              </div>
              <button
                type="button"
                className="btn btn-light position-absolute top-0 end-0 m-3"
                onClick={() => setModalOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Descrição destacada e centralizada */}
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="m-3 mt-0">
          <div
            className="card shadow-sm border-0"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 80%, #e3e7ed 100%)',
              borderRadius: '18px',
              padding: '24px 32px 24px 0'
            }}
          >
            <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>
              <i className="bi bi-info-circle me-2"></i>Sobre o Hotel
            </h5>
            <p
              className="fw-bold"
              style={{
                textAlign: 'justify',
                color: '#333',
                fontSize: '1.08em',
                marginBottom: 0
              }}
            >
              {hotel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Serviços e comodidades */}
      <div className="container mt-3" style={{ maxWidth: 1200 }}>
        <div className="d-flex flex-column gap-4">
          <ServiceList title="Serviços inclusos" items={inclusos} />
          <ServiceList title="Serviços pagos" items={pagos} />
          <ExtraCommoditiesList
            customCommodities={hotel.customCommodities || []}
          />
        </div>
      </div>

      {/* Listagem de quartos */}
      <div className="container mt-5" style={{ maxWidth: 1200 }}>
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
          checkIn={checkIn}
          checkOut={checkOut}
          onGoToPayment={() => {
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
                totalPrice // <-- Adicione esta linha!
              }
            });
          }}
        />
        {showError && (
          <div className="alert alert-danger mt-3" role="alert">
            Selecione pelo menos um quarto para continuar.
          </div>
        )}
      </div>

      {/* Lista de avaliações dos hóspedes */}
      <div className="container mt-5" style={{ maxWidth: 1200 }}>
        <div className="card shadow-sm border-0 p-4 mb-4">
          <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>
            <i className="bi bi-chat-dots me-2"></i>Avaliações dos hóspedes
          </h5>
          <ReviewList reviews={reviews} loading={loadingReviews} userMap={userMap} />
        </div>
      </div>

      {/* Descrição + Mapa */}
      <div className="container mt-5" style={{ maxWidth: 1200 }}>
        <div className="card shadow-sm border-0 p-4 mb-4">
          <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>
            <i className="bi bi-geo-alt me-2"></i>Localização
          </h5>
          <div className="mb-2 fw-semibold text-secondary" style={{ fontSize: '1.1em' }}>
            {hotel.street}, {hotel.city} - {hotel.state}, CEP: {hotel.zipCode}
          </div>
          <Maps address={`${hotel.street}, ${hotel.city}, ${hotel.state}`} />
        </div>
      </div>
    </div>
  );
};
export default Details;