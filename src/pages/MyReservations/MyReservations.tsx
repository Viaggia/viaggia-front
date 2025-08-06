import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyReservations.css';
import { useAuth } from '../../context/AuthContext';
import { getReservationsByUserId } from '../../services/reserveService';
import { Reservation } from '../../types/Reservation';

const MyReservations: React.FC = () => {
  const [detalheAberto, setDetalheAberto] = useState<number | null>(null);
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getReservationsByUserId(user.id)
        .then(setReservas)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const toggleDetalhes = (id: number) => {
    setDetalheAberto(detalheAberto === id ? null : id);
  };

  if (loading) {
    return <div className="reservepag-container">Carregando reservas...</div>;
  }

  return (
    <div className="reservepag-container">
      <h2 className="reservepag-title">Minhas Reservas</h2>

      {reservas.length === 0 ? (
        <div>Nenhuma reserva encontrada.</div>
      ) : reservas.map((reserva) => {
        // Cálculo de total (ajuste conforme sua regra)
        const totalCompra = reserva.totalPrice || 0;

        return (
          <div className="reservepag-card" key={reserva.reservationId}>
            <button className="reservepag-toggle" onClick={() => toggleDetalhes(reserva.reservationId)}>
              <span className="reservepag-toggle-text">
                Reserva - {reserva.hotelId ? `Hotel #${reserva.hotelId}` : reserva.packageId ? `Pacote #${reserva.packageId}` : 'Sem identificação'}
              </span>
              <span className="reservepag-seta">▼</span>
            </button>

            {detalheAberto === reserva.reservationId && (
              <div className="reservepag-detalhes">
                <p><strong>ID da Reserva:</strong> {reserva.reservationId}</p>
                <p><strong>Hotel:</strong> {reserva.hotelId || '-'}</p>
                <p><strong>Pacote:</strong> {reserva.packageId || '-'}</p>
                <p><strong>Check-in:</strong> {reserva.checkInDate?.substring(0,10)}</p>
                <p><strong>Check-out:</strong> {reserva.checkOutDate?.substring(0,10)}</p>
                <p><strong>Quarto:</strong> {reserva.roomTypeId || '-'}</p>
                <p><strong>Hóspedes:</strong> {reserva.numberOfGuests}</p>
                <p><strong>Status:</strong> {reserva.status}</p>
                <p><strong>Ativa:</strong> {reserva.isActive ? 'Sim' : 'Não'}</p>
                <p><strong>Resumo de Compra:</strong></p>
                <ul>
                  <li><strong>Total:</strong> R${Number(totalCompra).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</li>
                </ul>

                <div className="reservepag-cancel-wrapper">
                  <button className="reservepag-cancelar" onClick={() => navigate('/cancel-reservation')}>
                    Cancelar minha reserva
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="reservepag-whatsapp">
        <a href="https://wa.me/558196631476" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="reservepag-whatsapp-icon"
          />
        </a>
      </div>
    </div>
  );
};

export default MyReservations;