import { FaHotel, FaTrash, FaEdit, FaStar, FaRegStar, FaClock, FaBed, FaGift } from 'react-icons/fa';
import { HotelDTO, RoomTypeEnum } from '../../../types/Hotel';
import { formatPhone, formatCNPJ, formatCEP, formatCurrencyBRL } from '../../../utils/formatMask';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';
import { useState } from 'react';

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
  const [hoveredRoomId, setHoveredRoomId] = useState<number | null>(null);
  const [hoveredCommodity, setHoveredCommodity] = useState<string | null>(null);
  const [hoveredCustomCommodityId, setHoveredCustomCommodityId] = useState<number | null>(null);

  const imagem =
    hotel.medias && hotel.medias.length > 0
      ? (backendUrl ? backendUrl + hotel.medias[0].mediaUrl : hotel.medias[0].mediaUrl)
      : '/img/default.jpg';

  const enderecoCompleto = `${hotel.street}, ${hotel.city} - ${hotel.state}, CEP: ${formatCEP(hotel.zipCode)}`;
  const hotelCommodities = hotel.commodities?.[0] ?? {};

  // Commodities padrão com hover detalhado
  const activeIcons = Object.entries(comoditiesIcons)
    .filter(([key]) => (hotelCommodities as any)[key])
    .map(([key, icon]) => {
      let priceKey = key.replace(/^has/, '').replace(/^is/, '');
      priceKey = priceKey.charAt(0).toLowerCase() + priceKey.slice(1) + 'Price';
      const price = (hotelCommodities as any)[priceKey];

      return (
        <span
          key={key}
          className="me-2 position-relative"
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            verticalAlign: 'middle',
            marginBottom: 0
          }}
          onMouseEnter={() => setHoveredCommodity(key)}
          onMouseLeave={() => setHoveredCommodity(null)}
        >
          {icon}
          {hoveredCommodity === key && (
            <div
              className="shadow rounded p-2"
              style={{
                position: 'absolute',
                top: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                minWidth: 'max-content',
                maxWidth: 260,
                background: '#fff',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                fontSize: '0.95em',
                textAlign: 'center',
                whiteSpace: 'normal',
                padding: '12px 16px'
              }}
            >
              <div style={{ fontWeight: 600, wordBreak: 'break-word' }}>
                {comoditiesLabels[key] || key}
              </div>
              {price !== undefined && price !== null && price > 0 && (
                <span style={{
                  background: '#e3f2fd',
                  color: '#1976d2',
                  fontWeight: 600,
                  fontSize: '0.95em',
                  padding: '2px 5px', // reduzido para igualar à custom
                  borderRadius: 6,
                  border: '1px solid #bbdefb',
                  display: 'inline-block',
                  minWidth: 38,
                  maxWidth: 80,
                  textAlign: 'center',
                  marginTop: 8,
                  whiteSpace: 'nowrap'
                }}>
                  {formatCurrencyBRL(price)}
                </span>
              )}
            </div>
          )}
        </span>
      );
    });

  // Mini cards das custom commodities
  const customCommodityCards = hotel.customCommodities?.map(custom => {
    const isFree = !custom.price || custom.price === 0;
    return (
      <div
        key={custom.customCommodityId}
        className="position-relative w-100 mb-1"
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          minWidth: 120,
          maxWidth: '100%',
        }}
        onMouseEnter={() => setHoveredCustomCommodityId(custom.customCommodityId)}
        onMouseLeave={() => setHoveredCustomCommodityId(null)}
      >
        <FaGift className="me-1 text-success" />
        <span
          style={{
            fontWeight: 500,
            fontSize: '0.97em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flexGrow: 1,
            minWidth: 0,
            marginRight: 8,
          }}
          title={custom.name}
        >
          {custom.name}
        </span>
        <span
          style={{
            background: isFree ? '#e8f5e9' : '#e3f2fd',
            color: isFree ? '#388e3c' : '#1976d2',
            fontWeight: 600,
            fontSize: '0.95em',
            padding: '2px 5px',
            borderRadius: 6,
            border: isFree ? '1px solid #c8e6c9' : '1px solid #bbdefb',
            display: 'inline-block',
            minWidth: 38,
            maxWidth: 80,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {isFree ? 'Grátis' : formatCurrencyBRL(custom.price)}
        </span>
        {/* Hover card permanece igual */}
        {hoveredCustomCommodityId === custom.customCommodityId && (
          <div
            className="shadow rounded p-2"
            style={{
              position: 'absolute',
              top: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              minWidth: 'max-content',
              maxWidth: 260,
              background: '#fff',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              fontSize: '0.95em',
              textAlign: 'center',
              whiteSpace: 'normal',
              padding: '12px 16px'
            }}
          >
            <div style={{ fontWeight: 600, wordBreak: 'break-word', marginBottom: 4 }}>
              {custom.name}
            </div>
            <div style={{ fontSize: '0.93em', color: '#555', marginBottom: 6 }}>
              {custom.description}
            </div>
            <span
              style={{
                background: isFree ? '#e8f5e9' : '#e3f2fd',
                color: isFree ? '#388e3c' : '#1976d2',
                fontWeight: 600,
                fontSize: '0.95em',
                padding: '2px 5px',
                borderRadius: 6,
                border: isFree ? '1px solid #c8e6c9' : '1px solid #bbdefb',
                display: 'inline-block',
                minWidth: 38,
                maxWidth: 80,
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              {isFree ? 'Grátis' : formatCurrencyBRL(custom.price)}
            </span>
          </div>
        )}
      </div>
    );
  });

  function getRoomTypeLabel(room: any): string {
    if (typeof room.name === 'string' && roomTypeLabels[room.name as RoomTypeEnum]) {
      return roomTypeLabels[room.name as RoomTypeEnum];
    }
    const roomTypeEnumValues: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];
    if (typeof room.name === 'number' && roomTypeEnumValues[room.name]) {
      return roomTypeLabels[roomTypeEnumValues[room.name]];
    }
    return String(room.name);
  }

  // Mini cards dos quartos
  const roomCards = hotel.roomTypes?.map(room => (
    <div
      key={room.roomTypeId}
      className="border rounded px-2 py-1 me-2 mb-2 d-inline-flex align-items-center position-relative"
      style={{ fontSize: '0.85em', background: '#f8f9fa', minWidth: 120, cursor: 'pointer' }}
      onMouseEnter={() => setHoveredRoomId(room.roomTypeId)}
      onMouseLeave={() => setHoveredRoomId(null)}
    >
      <FaBed className="me-1 text-secondary" />
      <span>
        <strong>{getRoomTypeLabel(room)}</strong>
        <span className="ms-1">({room.availableRooms}/{room.totalRooms})</span>
      </span>
      <span
        className="ms-2 px-2 py-1 rounded"
        style={{
          background: '#e3f2fd',
          color: '#1976d2',
          fontWeight: 600,
          fontSize: '0.85em',
          marginLeft: 'auto',
          minWidth: 38, // reduzido para igualar à custom
          maxWidth: 80,
          textAlign: 'center',
          border: '1px solid #bbdefb',
          whiteSpace: 'nowrap'
        }}
      >
        R$ {room.price}
      </span>
      {hoveredRoomId === room.roomTypeId && (
        <div
          className="shadow rounded p-2"
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            zIndex: 10,
            minWidth: 220,
            background: '#fff',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          <div className="mb-1"><strong>{getRoomTypeLabel(room)}</strong></div>
          <div className="mb-1"><strong>Descrição:</strong> {room.description}</div>
          <div className="mb-1"><strong>Tipo de cama:</strong> {room.bedType}</div>
          <div className="mb-1"><strong>Capacidade:</strong> {room.capacity} pessoa{room.capacity !== 1 ? 's' : ''}</div>
          <div className="mb-1"><strong>Disponíveis:</strong> {room.availableRooms} / {room.totalRooms}</div>
          <div className="mb-1">
            <strong>Preço:</strong>
            <span
              style={{
                background: '#e3f2fd',
                color: '#1976d2',
                fontWeight: 600,
                fontSize: '0.95em',
                padding: '2px 5px',
                borderRadius: 6,
                border: '1px solid #bbdefb',
                display: 'inline-block',
                minWidth: 38,
                maxWidth: 80,
                textAlign: 'center',
                marginLeft: 6,
                whiteSpace: 'nowrap'
              }}
            >
              R$ {room.price}
            </span>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div className="card shadow-sm h-100 d-flex flex-column" style={{ minHeight: 480 }}>
      <img
        src={imagem}
        alt={hotel.name}
        className="card-img-top"
        style={{ objectFit: 'cover', height: 180 }}
      />
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
            {activeIcons}
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
            {roomCards}
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
                {customCommodityCards}
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