import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../../services/paymentService';
import { ReservationCreateDTO } from '../../types/Reservation';
import { useAuth } from '../../context/AuthContext';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotel, selectedRooms, pkg } = location.state || {};
  const { user } = useAuth(); // <-- pega o usuário logado

  const isPackage = !!pkg;
  const [loading, setLoading] = useState(false);

  const total = isPackage
    ? pkg.basePrice
    : Array.isArray(selectedRooms)
      ? selectedRooms.reduce((sum, room) => sum + (room.price * room.quantity), 0)
      : 0;

  // Pegue as datas da tela anterior ou defina padrão
  const checkInDate = isPackage
    ? pkg.packageDates?.[0]?.startDate
    : location.state?.checkInDate;
  const checkOutDate = isPackage
    ? pkg.packageDates?.[0]?.endDate
    : location.state?.checkOutDate;

  const handleGoToPaymentPending = async () => {
    setLoading(true);

    try {
      let dto: ReservationCreateDTO | null = null;

      if (!user) {
        alert('Usuário não autenticado!');
        setLoading(false);
        return;
      }

      if (isPackage && pkg) {
        dto = {
          userId: user.id,
          packageId: pkg.packageId,
          roomTypeId: 0,
          hotelId: pkg.hotelId,
          checkInDate: pkg.packageDates?.[0]?.startDate || '',
          checkOutDate: pkg.packageDates?.[0]?.endDate || '',
          totalPrice: pkg.basePrice,
          numberOfGuests: 2, 
          status: 'Pendente',
          isActive: true,
        };
      } else if (hotel && selectedRooms && selectedRooms.length > 0) {
        dto = {
          userId: user.id,
          packageId: 0,
          roomTypeId: selectedRooms[0].roomTypeId,
          hotelId: hotel.hotelId,
          checkInDate: checkInDate || new Date().toISOString(),
          checkOutDate: checkOutDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          totalPrice: total,
          numberOfGuests: selectedRooms[0].quantity,
          status: 'Pendente',
          isActive: true,
        };
      } else {
        setLoading(false);
        return;
      }

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
            {isPackage ? (
              <>
                <p><strong>Pacote:</strong> {pkg.name}</p>
                <p><strong>Destino:</strong> {pkg.destination}</p>
                <p><strong>Hotel:</strong> {hotel?.name || pkg.hotelName}</p>
                <p><strong>Datas:</strong> {pkg.packageDates?.[0]?.startDate} até {pkg.packageDates?.[0]?.endDate}</p>
              </>
            ) : (
              <>
                <p><strong>Hotel:</strong> {hotel?.name}</p>
                <p><strong>Cidade:</strong> {hotel?.city} - {hotel?.state}</p>
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

            <div className="mb-3">
              <label className="form-label">Forma de Pagamento</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="formapagamento" id="boleto" value="boleto" />
                <label className="form-check-label" htmlFor="boleto">Boleto</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="formapagamento" id="pix" value="pix" />
                <label className="form-check-label" htmlFor="pix">Pix</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="formapagamento" id="cartao" value="cartao" />
                <label className="form-check-label" htmlFor="cartao">Cartão</label>
              </div>
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
              {isPackage ? (
                <>
                  <p><strong>Pacote:</strong> {pkg.name}</p>
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Pacote completo</span>
                      <span>R$ {pkg.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </li>
                  </ul>
                  <p><strong>Total:</strong> R$ {pkg.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </>
              ) : (
                <>
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
                </>
              )}
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
