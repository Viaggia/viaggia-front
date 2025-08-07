import { FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReservationsByUserId } from '../../services/reserveService';

function PaymentConfirmed() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getReservationsByUserId(user.id)
        .then(setReservations)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleGoToReservations = () => {
    navigate('/my-reservations');
  };

  // Destaca a reserva mais recente (maior reserveId)
  const sortedReservations = [...reservations].sort((a, b) => (b.reserveId || 0) - (a.reserveId || 0));
  const latest = sortedReservations[0];
  const others = sortedReservations.slice(1);

  return (
    <div className="container mt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Alerta de pagamento confirmado */}
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <FaCheckCircle className="me-2" size={24} />
            <div>
              <h1 className="mb-0">Pagamento confirmado</h1>
              <p className="mb-0">Obrigado! O pagamento foi processado com sucesso.</p>
            </div>
          </div>

          {/* Reserva mais recente em destaque */}
          {latest && (
            <div className="card shadow mb-4 border-primary">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Sua Reserva Mais Recente</h5>
              </div>
              <div className="card-body">
                <p><strong>Reserva #</strong>{latest.reserveId}</p>
                <p><strong>Hotel:</strong> {latest.hotelName || latest.hotelId}</p>
                <p><strong>Check-in:</strong> {latest.checkInDate?.substring(0, 10)}</p>
                <p><strong>Check-out:</strong> {latest.checkOutDate?.substring(0, 10)}</p>
                <p><strong>Hóspedes:</strong> {latest.numberOfGuests}</p>
                <p><strong>Status:</strong> {latest.status}</p>
                <p><strong>Total:</strong> R$ {Number(latest.totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          )}

          {/* Lista das outras reservas */}
          <div className="mb-4">
            <h5 className="text-primary">Minhas Outras Reservas</h5>
            {loading ? (
              <div>Carregando reservas...</div>
            ) : sortedReservations.length === 0 ? (
              <div>Nenhuma reserva encontrada.</div>
            ) : others.length === 0 ? (
              <div>Você não possui outras reservas.</div>
            ) : (
              <ul className="list-group">
                {others.map((reserva, idx) => (
                  <li key={reserva.reserveId || idx} className="list-group-item">
                    <strong>Reserva #{reserva.reserveId}</strong> - Hotel: {reserva.hotelName || reserva.hotelId} - Check-in: {reserva.checkInDate?.substring(0, 10)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botões */}
          <div className="text-end mt-3">
            <a href="/recibo" className="btn btn-link me-2">
              Ver recibo
            </a>
            <button className="btn btn-primary" onClick={handleGoToReservations}>
              Ir para minhas reservas
            </button>
          </div>
          <div className="mt-5" />
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmed;