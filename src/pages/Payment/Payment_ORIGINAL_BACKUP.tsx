import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../../services/paymentService';
import { ReservationCreateDTO } from '../../types/Reservation';

const Payment: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { hotel, selectedRooms } = location.state || {};

  const [loading, setLoading] = useState(false);

  const total =
    Array.isArray(selectedRooms)
      ? selectedRooms.reduce(
        (sum, room) => sum + (room.price * room.quantity),
        0
      )
      : 0;

  // Exemplo: pegue os dados do usuário logado e das datas conforme sua lógica real
  const userId = 1; // Troque pelo id real do usuário logado
  const checkInDate = new Date().toISOString();
  const checkOutDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const handleGoToPaymentPending = async () => {
    if (!hotel || !selectedRooms || selectedRooms.length === 0) return;

    setLoading(true);

    // Exemplo: monta o DTO para o primeiro quarto selecionado
    const dto: ReservationCreateDTO = {
      userId,
      userNameReservation: '', // Preencha se tiver
      packageId: 0, // Ajuste conforme necessário
      roomTypeId: selectedRooms[0].roomTypeId,
      hotelId: hotel.hotelId,
      checkInDate,
      checkOutDate,
      totalPrice: total,
      numberOfGuests: selectedRooms[0].quantity,
      status: 'Pendente',
      isActive: true,
    };

    try {
      const result = await createPaymentIntent(dto);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      alert('Erro ao criar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Coluna Esquerda: Informações e Forma de Pagamento */}
        <div className="col-md-6 mb-4">
          <div className="mb-4">
            <h5>Informações do Cliente</h5>
            <p><strong>Hotel:</strong> {hotel?.name}</p>
            <p><strong>Cidade:</strong> {hotel?.city} - {hotel?.state}</p>
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
              <p><strong>Hotel:</strong> {hotel?.name}</p>
              <ul className="list-group mb-3">
                {Array.isArray(selectedRooms) && selectedRooms.map((room, idx) => (
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
