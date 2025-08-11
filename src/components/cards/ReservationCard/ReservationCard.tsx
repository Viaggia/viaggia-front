import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReserveDTO } from '../../../types/Reservation';
import { getHotelById } from '../../../services/hotelService';
import { formatDateToBR, parseLocalDate } from '../../../utils/formatMask';

interface ReservationCardProps {
  reserva: ReserveDTO;
  detalheAberto: number | null;
  toggleDetalhes: (id: number) => void;
  onAvaliar?: (hotelId: number | undefined) => void;
  onAlterarReserva?: (hotelId: number | undefined) => void; // Adicione esta linha
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reserva,
  detalheAberto,
  toggleDetalhes,
  onAvaliar,
  onAlterarReserva, // Adicione esta linha
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
            <span className="ms-2 text-muted">Reserva #{reserva.reserveId} </span>
            {reserva.packageId && reserva.packageId !== 0
              ? `Reserva #${reserva.reserveId}`
              : reserva.hotelId
                ? hotelName
                  ? ` - ${hotelName}`
                  : `Hotel #${reserva.hotelId}`
                : 'Reserva'}
          </strong>
          
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
              <strong>Check-in:</strong> {
                formatDateToBR(parseLocalDate(reserva.checkInDate?.substring(0, 10)))
              }
            </p>
            <p>
              <strong>Check-out:</strong> {
                formatDateToBR(parseLocalDate(reserva.checkOutDate?.substring(0, 10)))
              }
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
                <strong>Total:</strong> R$
                {Number(totalCompra).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="reservepag-cancel-wrapper text-end d-flex gap-2 justify-content-end">
            <button
              className="btn btn-warning"
              onClick={() => onAlterarReserva && onAlterarReserva(reserva.hotelId)}
            >
              Alterar Reserva
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