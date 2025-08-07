import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../../services/paymentService';
import { ReservationCreateDTO } from '../../types/Reservation';
import { useAuth } from '../../context/AuthContext';

const Payment: React.FC = () => {

  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { 
  hotel, 
  selectedRooms,
  package: packageData,
  reservationType,
  checkInDate: receivedCheckIn,
  checkOutDate: receivedCheckOut,
  numberOfGuests: receivedGuests
} = location.state || {};

  const [loading, setLoading] = useState(false);

  // Função para determinar o tipo de reserva
  const determineReservationType = (): 'hotel' | 'package' | null => {
    // Prioridade 1: Tipo explícito passado no state
    if (reservationType) return reservationType;
    
    // Prioridade 2: Detectar por dados disponíveis
    if (packageData && packageData.packageId) return 'package';
    if (hotel && selectedRooms && selectedRooms.length > 0) return 'hotel';
    
    return null;
  };

  const currentReservationType = determineReservationType();

  // Validação de estado válido
  if (!currentReservationType) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h5>Dados de reserva inválidos</h5>
          <p>Não foi possível identificar o tipo de reserva. Por favor, volte e tente novamente.</p>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Função para calcular o total baseado no tipo de reserva
  const calculateTotal = (): number => {
    if (currentReservationType === 'package') {
      return packageData?.basePrice || 0;
    }
    
    if (currentReservationType === 'hotel') {
      return Array.isArray(selectedRooms)
        ? selectedRooms.reduce((sum, room) => sum + (room.price * room.quantity), 0)
        : 0;
    }
    
    return 0;
  };

  const total = calculateTotal();

  // Dados do usuário e datas
  const userId = user?.id || 1;
  const checkInDate = receivedCheckIn || new Date().toISOString();
  const checkOutDate = receivedCheckOut || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const numberOfGuests = receivedGuests || selectedRooms?.[0]?.quantity || 1;

  const handleGoToPaymentPending = async () => {
    // Validação baseada no tipo de reserva
    if (currentReservationType === 'hotel') {
      if (!hotel || !selectedRooms || selectedRooms.length === 0) return;
    } else if (currentReservationType === 'package') {
      if (!packageData || !packageData.packageId) return;
    } else {
      alert('Tipo de reserva não identificado');
      return;
    }

    setLoading(true);

    // Função para construir o DTO baseado no tipo de reserva
    const buildReservationDTO = (): ReservationCreateDTO => {
      const baseDTO = {
        userId,
        userNameReservation: user?.name || '',
        checkInDate,
        checkOutDate,
        totalPrice: total,
        numberOfGuests,
        status: 'Pendente',
        isActive: true,
      };

      if (currentReservationType === 'package') {
        return {
          ...baseDTO,
          packageId: packageData.packageId,
          // roomTypeId e hotelId ficam undefined para pacotes
        };
      }

      if (currentReservationType === 'hotel') {
        return {
          ...baseDTO,
          roomTypeId: selectedRooms[0].roomTypeId,
          hotelId: hotel.hotelId,
          // packageId fica undefined para reservas avulsas
        };
      }

      throw new Error('Tipo de reserva inválido');
    };

    const dto = buildReservationDTO();

    try {
      const result = await createPaymentIntent(dto);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error('Erro ao criar pagamento:', err);
      const errorMessage = currentReservationType === 'package' 
        ? 'Erro ao processar pagamento do pacote'
        : 'Erro ao processar pagamento da reserva';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Função para renderizar o resumo baseado no tipo de reserva
  const renderReservationSummary = () => {
    if (currentReservationType === 'package') {
      return (
        <>
          <p><strong>Tipo:</strong> Pacote de Viagem</p>
          <p><strong>Destino:</strong> {packageData.destination}</p>
          <p><strong>Pacote:</strong> {packageData.name}</p>
          <p><strong>Hotel:</strong> {packageData.hotelName}</p>
          {packageData.description && (
            <p><strong>Descrição:</strong> {packageData.description}</p>
          )}
          <p><strong>Período:</strong> {new Date(checkInDate).toLocaleDateString('pt-BR')} - {new Date(checkOutDate).toLocaleDateString('pt-BR')}</p>
          <p><strong>Hóspedes:</strong> {numberOfGuests}</p>
          <p><strong>Total:</strong> R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </>
      );
    }

    if (currentReservationType === 'hotel') {
      return (
        <>
          <p><strong>Tipo:</strong> Reserva de Hotel</p>
          <p><strong>Hotel:</strong> {hotel?.name}</p>
          <ul className="list-group mb-3">
            {Array.isArray(selectedRooms) && selectedRooms.map((room) => (
              <li key={room.roomTypeId} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {typeof room.name === 'string' ? room.name : 'Quarto'} ({room.quantity}x)
                </span>
                <span>
                  R$ {(room.price * room.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </>
      );
    }

    return <p>Tipo de reserva não identificado</p>;
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Coluna Esquerda: Informações e Forma de Pagamento */}
        <div className="col-md-6 mb-4">
          <div className="mb-4">
            <h5>Informações do Cliente</h5>
            {currentReservationType === 'hotel' && (
              <>
                <p><strong>Hotel:</strong> {hotel?.name}</p>
                <p><strong>Cidade:</strong> {hotel?.city} - {hotel?.state}</p>
              </>
            )}
            {currentReservationType === 'package' && (
              <>
                <p><strong>Destino:</strong> {packageData?.destination}</p>
                <p><strong>Hotel:</strong> {packageData?.hotelName}</p>
              </>
            )}
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="nomeCompleto" className="form-label">Nome Completo</label>
              <input type="text" className="form-control" id="nomeCompleto" placeholder="Nome Completo" required />
            </div>

            <div className="mb-3">
              <label htmlFor="cpforpassport" className="form-label">CPF ou Passport</label>
              <input type="text" className="form-control" id="cpforpassport" placeholder="CPF ou Passport" required />
            </div>
          </form>
        </div>

        {/* Coluna Direita: Resumo do Pagamento */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Resumo do Pedido</h5>
            </div>
            <div className="card-body">
              {renderReservationSummary()}
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-success"
                onClick={handleGoToPaymentPending}
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Ir para o pagamento'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
