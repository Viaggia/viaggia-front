import { FaHotel, FaTrash, FaEdit, FaStar, FaRegStar, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HotelDTO, RoomTypeEnum } from '../../../types/Hotel';
import { formatPhone, formatCNPJ, formatCEP, formatCurrencyBRL } from '../../../utils/formatMask';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';
import { useState } from 'react';
import HotelCommoditiesIcons from './HotelCommoditiesIcons';
import RoomTypeCardList from './RoomTypeCardList';
import CustomCommodityCardList from './CustomCommodityCardList';

const comoditiesLabels: Record<string, string> = {
  hasParking: 'Estacionamento',
  hasBreakfast: 'Café da manhã',
  hasLunch: 'Almoço',
  hasDinner: 'Jantar',
  hasSpa: 'Spa',
  hasPool: 'Piscina',
  hasGym: 'Academia',
  hasWiFi: 'Wi-Fi',
  hasAirConditioning: 'Ar-condicionado',
  hasAccessibilityFeatures: 'Acessibilidade',
  isPetFriendly: 'Aceita pets',
};

const roomTypeLabels: Record<RoomTypeEnum, string> = {
  Single: 'Solteiro',
  Double: 'Duplo',
  Suite: 'Suíte',
  Deluxe: 'Deluxe',
  Family: 'Família',
};

interface Props {
  hotel: HotelDTO;
  onEdit: (hotelId: number) => void;
  onDelete: (hotelId: number) => void;
  deleting: boolean;
  backendUrl?: string;
}

function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const HotelAdmCard = ({ hotel, onEdit, onDelete, deleting, backendUrl }: Props) => {
  // Carousel state
  const [imgIndex, setImgIndex] = useState(0);
  const images = hotel.medias && hotel.medias.length > 0
    ? hotel.medias.map(m => backendUrl ? backendUrl + m.mediaUrl : m.mediaUrl)
    : ['/img/default.jpg'];

  const enderecoCompleto = `${hotel.street}, ${hotel.city} - ${hotel.state}, CEP: ${formatCEP(hotel.zipCode)}`;
  const hotelCommodities = hotel.commodities?.[0] ?? {};

  function handlePrevImg() {
    setImgIndex(i => (i === 0 ? images.length - 1 : i - 1));
  }
  function handleNextImg() {
    setImgIndex(i => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="card shadow-sm h-100 d-flex flex-column" style={{ minHeight: 480 }}>
      <div style={{ position: 'relative', height: 180 }}>
        <img
          src={images[imgIndex]}
          alt={hotel.name}
          className="card-img-top"
          style={{ objectFit: 'cover', height: 180, width: '100%' }}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              style={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.7)',
                border: 'none',
                borderRadius: '50%',
                padding: 6,
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              style={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.7)',
                border: 'none',
                borderRadius: '50%',
                padding: 6,
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <FaChevronRight />
            </button>
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                borderRadius: 12,
                fontSize: '0.95em',
                padding: '2px 10px',
                zIndex: 2
              }}
            >
              {imgIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      <div className="card-body d-flex flex-column flex-grow-1">
        {/* Seção de dados principais */}
        <div>
          <div className="d-flex align-items-center mb-2">
            <FaHotel className="me-2 text-primary" size={24} />
            <h5 className="card-title mb-0">{hotel.name}</h5>
          </div>
          {/* Estrelas */}
          <div className="mb-2">
            {[...Array(5)].map((_, i) =>
              i < hotel.starRating ? (
                <FaStar key={i} className="text-warning" />
              ) : (
                <FaRegStar key={i} className="text-warning" />
              )
            )}
          </div>
          {/* Ícones das comodidades padrão */}
          <div className="mb-2 d-flex flex-wrap align-items-center gap-2">
            <HotelCommoditiesIcons
              commodities={hotelCommodities}
              comoditiesIcons={comoditiesIcons}
              comoditiesLabels={comoditiesLabels}
              formatCurrencyBRL={formatCurrencyBRL}
            />
          </div>
          <hr className="my-2" />
          <p
            className="mb-1"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              maxHeight: '3em',
              whiteSpace: 'normal',
              textAlign: 'justify',
            }}
            title={enderecoCompleto}
          >
            {enderecoCompleto}
          </p>
          <p className="mb-1"><strong>CNPJ:</strong> {formatCNPJ(hotel.cnpj)}</p>
          {/* Check-in/out com ícone de relógio */}
          <p className="mb-1 d-flex align-items-center">
            <FaClock className="me-1" /> <strong>Check-in:</strong> {hotel.checkInTime}
            <span className="mx-2"></span>
            <FaClock className="me-1" /> <strong>Check-out:</strong> {hotel.checkOutTime}
          </p>
          <p
            className="mb-1"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
            title={formatPhone(hotel.contactPhone ?? '')}
          >
            <strong>Telefone:</strong> {formatPhone(hotel.contactPhone ?? '')}
          </p>
          <p
            className="mb-1"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
            title={hotel.contactEmail}
          >
            <strong>E-mail:</strong> {hotel.contactEmail}
          </p>
          <p className="mb-1"><strong>Descrição:</strong> {truncateText(hotel.description ?? '', 120)}</p>
        </div>

        {/* Seção dos quartos */}
        <hr className="my-3" />
        <div>
          <h6 className="mb-2 text-primary" style={{ fontWeight: 600 }}>
            Quartos disponíveis
          </h6>
          <div className="d-flex flex-wrap">
            <RoomTypeCardList roomTypes={hotel.roomTypes ?? []} roomTypeLabels={roomTypeLabels} />
          </div>
        </div>

        {/* Seção das custom commodities */}
        {hotel.customCommodities && hotel.customCommodities.length > 0 && (
          <>
            <hr className="my-3" />
            <div>
              <h6 className="mb-2 text-success" style={{ fontWeight: 600 }}>
                Serviços e comodidades extras
              </h6>
              <div className="d-flex flex-column">
                <CustomCommodityCardList customCommodities={hotel.customCommodities} />
              </div>
            </div>
          </>
        )}

        <div className="d-flex justify-content-end gap-2 mt-3 mt-auto">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(hotel.hotelId)}
          >
            <FaEdit /> Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(hotel.hotelId)}
            disabled={deleting}
          >
            <FaTrash /> {deleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelAdmCard;