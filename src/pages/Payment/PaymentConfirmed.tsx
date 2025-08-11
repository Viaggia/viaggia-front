import { FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReservationsByUserId } from '../../services/reserveService';
import { getHotelById } from '../../services/hotelService';
import { formatDateToBR } from '../../utils/formatMask';

function formatDateUniversal(dateStr?: string) {
  if (!dateStr) return '';
  // ISO: yyyy-mm-dd ou yyyy-mm-ddTHH:mm:ss
  const isoMatch = dateStr.match(/^\d{4}-\d{2}-\d{2}/);
  if (isoMatch) {
    const [year, month, day] = dateStr.substring(0, 10).split('-');
    return `${day}/${month}/${year}`;
  }
  // BR: dd/mm/yyyy
  if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) return dateStr;
  // Fallback: tenta converter
  try {
    const d = new Date(dateStr);
    return formatDateToBR(d);
  } catch {
    return dateStr;
  }
}

function PaymentConfirmed() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reservation, setReservation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [hotelName, setHotelName] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      getReservationsByUserId(user.id)
        .then(async (reservas: any[]) => {
          // Pega a reserva mais recente
          const sorted = [...reservas].sort((a, b) => (b.reserveId || 0) - (a.reserveId || 0));
          const latest = sorted[0];
          setReservation(latest);
          // Busca nome do hotel se não vier
          if (latest) {
            if (latest.hotelName) {
              setHotelName(latest.hotelName);
            } else if (typeof latest.hotelId === 'number') {
              try {
                const hotel = await getHotelById(latest.hotelId);
                setHotelName(hotel.name);
              } catch {
                setHotelName(String(latest.hotelId));
              }
            }
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleGoToReservations = () => {
    navigate('/profile', { state: { showReservations: true } });
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Alerta de pagamento confirmado */}
          <div className="alert alert-success d-flex align-items-center mb-4" role="alert" style={{ fontSize: '1.2em' }}>
            <FaCheckCircle className="me-3" size={32} />
            <div>
              <h2 className="mb-1 fw-bold">Pagamento confirmado!</h2>
              <p className="mb-0">Obrigado pela sua reserva. Os detalhes estão abaixo:</p>
            </div>
          </div>

          {/* Detalhes da reserva */}
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <h4 className="mb-0 fw-semibold">
                <i className="bi bi-file-earmark-check me-2"></i>
                Detalhes da Reserva
              </h4>
            </div>
            <div className="card-body py-4 px-4">
              {loading ? (
                <div>Carregando detalhes da reserva...</div>
              ) : !reservation ? (
                <div>Nenhuma reserva encontrada.</div>
              ) : (
                <div className="row g-3">
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Reserva #</strong> {reservation.reserveId}</p>
                    <p className="mb-2"><strong>Hotel:</strong> {hotelName}</p>
                    <p className="mb-2"><strong>Check-in:</strong> {formatDateUniversal(reservation.checkInDate)}</p>
                    <p className="mb-2"><strong>Check-out:</strong> {formatDateUniversal(reservation.checkOutDate)}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Hóspedes:</strong> {reservation.numberOfPeople}</p>
                    <p className="mb-2"><strong>Status:</strong> <span className={`badge ${reservation.status === 'Pendente' ? 'bg-warning text-dark' : 'bg-success'}`}>{reservation.status}</span></p>
                    <p className="mb-2"><strong>Total:</strong> <span className="fw-bold text-success">R$ {Number(reservation.totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer text-end bg-light rounded-bottom-4">
              <button className="btn btn-primary px-4 py-2 fw-semibold" onClick={handleGoToReservations}>
                Ir para minhas reservas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmed;