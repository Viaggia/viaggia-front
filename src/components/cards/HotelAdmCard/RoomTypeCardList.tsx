import React, { useState } from 'react';
import { FaBed } from 'react-icons/fa';
import { RoomTypeEnum } from '../../../types/Hotel';
import { formatCurrencyBRL } from '../../../utils/formatMask';

interface RoomType {
  roomTypeId: number;
  name: string | RoomTypeEnum;
  availableRooms: number;
  totalRooms: number;
  price: number;
  description?: string;
  bedType?: string;
  capacity?: number;
}

interface Props {
  roomTypes: RoomType[];
  roomTypeLabels: Record<RoomTypeEnum, string>;
}

const RoomTypeCardList: React.FC<Props> = ({ roomTypes, roomTypeLabels }) => {
  const [hoveredRoomId, setHoveredRoomId] = useState<number | null>(null);

  function getRoomTypeLabel(room: RoomType): string {
    if (typeof room.name === 'string' && roomTypeLabels[room.name as RoomTypeEnum]) {
      return roomTypeLabels[room.name as RoomTypeEnum];
    }
    const roomTypeEnumValues: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];
    if (typeof room.name === 'number' && roomTypeEnumValues[room.name]) {
      return roomTypeLabels[roomTypeEnumValues[room.name]];
    }
    return String(room.name);
  }

  return (
    <>
      {roomTypes.map(room => (
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
              minWidth: 38,
              maxWidth: 80,
              textAlign: 'center',
              border: '1px solid #bbdefb',
              whiteSpace: 'nowrap',
            }}
          >
            {formatCurrencyBRL(room.price)}
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
                    whiteSpace: 'nowrap',
                  }}
                >
                  {formatCurrencyBRL(room.price)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default RoomTypeCardList;