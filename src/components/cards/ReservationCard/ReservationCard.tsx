import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReserveDTO } from '../../../types/Reservation';
import { getHotelById } from '../../../services/hotelService';

interface ReservationCardProps {
  reserva: ReserveDTO;
  detalheAberto: number | null;
  toggleDetalhes: (id: number) => void;
  onAvaliar?: (hotelId: number | undefined) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reserva,
  detalheAberto,
  toggleDetalhes,
  onAvaliar,
}) => {
  const navigate = useNavigate();
  const totalCompra = reserva.totalPrice || 0;
  const [hotelName, setHotelName] = useState<string | null>(null);

  useEffect(() => {
    if (reserva.hotelId) {
      getHotelById(reserva.hotelId)
        .then(hotel => setHotelName(hotel.name))
        .catch(() => setHotelName(null));
    }
  }, [reserva.hotelId]);

  return (
    <div className="reservepag-card mb-4" key={reserva.reserveId}>
      <button
        className="reservepag-toggle btn btn-outline-primary w-100 text-start d-flex justify-content-between align-items-center"
        onClick={() => toggleDetalhes(reserva.reserveId)}
      >
        <span>
          <strong>
            {reserva.packageId && reserva.packageId !== 0
              ? `Pacote #${reserva.packageId}`
              : reserva.hotelId
              ? hotelName
                ? `Hotel: ${hotelName}`
                : `Hotel #${reserva.hotelId}`
              : 'Reserva'}
          </strong>
          <span className="ms-2 text-muted">ID: {reserva.reserveId}</span>
        </span>
        <span className="reservepag-seta">
          {detalheAberto === reserva.reserveId ? '▲' : '▼'}
        </span>
      </button>
      {detalheAberto === reserva.reserveId && (
        <div className="reservepag-detalhes p-3 border rounded bg-light mt-2">
          <div className="row mb-2">
            <div className="col-md-6">
              <p>
                <strong>Check-in:</strong> {reserva.checkInDate?.substring(0, 10)}
              </p>
              <p>
                <strong>Check-out:</strong> {reserva.checkOutDate?.substring(0, 10)}
              </p>
              <p>
                <strong>Quarto:</strong> {reserva.roomTypeId || '-'}
              </p>
              <p>
                <strong>Nº de Quartos:</strong> {reserva.numberOfRooms}
              </p>
              <p>
                <strong>Hóspedes:</strong> {reserva.numberOfPeople}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Status:</strong> {reserva.status}
              </p>
              <p>
                <strong>Ativa:</strong> {reserva.isActive ? 'Sim' : 'Não'}
              </p>
              <p>
                <strong>Total:</strong> R$
                {Number(totalCompra).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p>
                <strong>Criada em:</strong> {reserva.createdAt?.substring(0, 10)}
              </p>
            </div>
          </div>
          <div className="reservepag-cancel-wrapper text-end d-flex gap-2 justify-content-end">
            <button
              className="btn btn-danger"
              onClick={() => navigate('/cancel-reservation')}
            >
              Cancelar minha reserva
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/edit-reservation/${reserva.reserveId}`)}
            >
              Alterar reserva
            </button>
            <button
              className="btn btn-success"
              onClick={() => onAvaliar && onAvaliar(reserva.hotelId)}
            >
              Avaliar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;