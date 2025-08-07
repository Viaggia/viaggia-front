import React, { useEffect, useState } from 'react';
import './MyReservations.css';
import { useAuth } from '../../context/AuthContext';
import { getReservationsByUserId } from '../../services/reserveService';
import { ReserveDTO } from '../../types/Reservation';
import ReservationCard from '../../components/cards/ReservationCard/ReservationCard';
import MakeReview from '../../pages/Review/MakeReview';

const MyReservations: React.FC = () => {
  const [detalheAberto, setDetalheAberto] = useState<number | null>(null);
  const [reservas, setReservas] = useState<ReserveDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
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

  const handleOpenReview = (hotelId: number | undefined) => {
    if (hotelId) {
      setSelectedHotelId(hotelId);
      setShowReviewModal(true);
    }
  };

  const handleCloseReview = () => {
    setShowReviewModal(false);
    setSelectedHotelId(null);
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
            reservas.map((reserva) => (
              <ReservationCard
                key={reserva.reserveId}
                reserva={reserva}
                detalheAberto={detalheAberto}
                toggleDetalhes={toggleDetalhes}
                onAvaliar={handleOpenReview}
              />
            ))
          )}
        </div>
        <div className="card-footer bg-white text-end">
          <a href="https://wa.me/558196631476" target="_blank" rel="noopener noreferrer" className="btn btn-success">
            <i className="bi bi-whatsapp me-2"></i> Fale conosco no WhatsApp
          </a>
        </div>
      </div>

      {/* Modal de avaliação */}
      {showReviewModal && selectedHotelId && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Avaliar Hotel</h5>
                <button type="button" className="btn-close" onClick={handleCloseReview}></button>
              </div>
              <div className="modal-body">
                <MakeReview hotelId={selectedHotelId} />
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={handleCloseReview}></div>
        </div>
      )}
    </div>
  );
};

export default MyReservations;