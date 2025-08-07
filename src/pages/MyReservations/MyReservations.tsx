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

  return (
    <div className="container">
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <i className="bi bi-calendar2-check me-2" style={{ fontSize: 24 }}></i>
          <h4 className="mb-0">Minhas Reservas</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <div className="mt-3">Carregando reservas...</div>
            </div>
          ) : reservas.length === 0 ? (
            <div className="alert alert-info text-center my-5">
              <i className="bi bi-info-circle me-2"></i>
              Você ainda não possui reservas cadastradas.<br />
              Explore nossos hotéis e pacotes para fazer sua primeira reserva!
            </div>
          ) : (
            reservas.map((reserva) => {
              const totalCompra = reserva.totalPrice || 0;
              return (
                <div className="reservepag-card mb-4" key={reserva.reservationId}>
                  <button
                    className="reservepag-toggle btn btn-outline-primary w-100 text-start d-flex justify-content-between align-items-center"
                    onClick={() => toggleDetalhes(reserva.reservationId)}
                  >
                    <span>
                      <strong>
                        {reserva.hotelId
                          ? `Hotel #${reserva.hotelId}`
                          : reserva.packageId
                          ? `Pacote #${reserva.packageId}`
                          : 'Reserva'}
                      </strong>
                      <span className="ms-2 text-muted">ID: {reserva.reservationId}</span>
                    </span>
                    <span className="reservepag-seta">{detalheAberto === reserva.reservationId ? '▲' : '▼'}</span>
                  </button>
                  {detalheAberto === reserva.reservationId && (
                    <div className="reservepag-detalhes p-3 border rounded bg-light mt-2">
                      <div className="row mb-2">
                        <div className="col-md-6">
                          <p><strong>Check-in:</strong> {reserva.checkInDate?.substring(0,10)}</p>
                          <p><strong>Check-out:</strong> {reserva.checkOutDate?.substring(0,10)}</p>
                          <p><strong>Quarto:</strong> {reserva.roomTypeId || '-'}</p>
                          <p><strong>Hóspedes:</strong> {reserva.numberOfGuests}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Status:</strong> {reserva.status}</p>
                          <p><strong>Ativa:</strong> {reserva.isActive ? 'Sim' : 'Não'}</p>
                          <p><strong>Total:</strong> R${Number(totalCompra).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                      </div>
                      <div className="reservepag-cancel-wrapper text-end">
                        <button className="btn btn-danger" onClick={() => navigate('/cancel-reservation')}>
                          Cancelar minha reserva
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="card-footer bg-white text-end">
          <a href="https://wa.me/558196631476" target="_blank" rel="noopener noreferrer" className="btn btn-success">
            <i className="bi bi-whatsapp me-2"></i> Fale conosco no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;