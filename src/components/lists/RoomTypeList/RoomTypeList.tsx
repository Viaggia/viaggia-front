import React from 'react';
import { HotelRoomTypeDTO } from '../../../types/Hotel';

interface RoomTypeListProps {
  roomTypes: HotelRoomTypeDTO[];
  selectedQuantities: { [roomTypeId: number]: number };
  onQuantityChange: (roomTypeId: number, quantity: number) => void;
  showError?: boolean;
  checkIn?: string;
  checkOut?: string;
  onGoToPayment?: () => void;
}

function getDays(checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut) return 1;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  // Se for do dia 12 pro 13, conta 1 diária
  const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

const RoomTypeList: React.FC<RoomTypeListProps> = ({
  roomTypes,
  selectedQuantities,
  onQuantityChange,
  showError,
  checkIn,
  checkOut,
  onGoToPayment
}) => {
  const numDays = getDays(checkIn, checkOut);

  // Soma total de todos os quartos selecionados
  const totalFinal = roomTypes.reduce((sum, rt) => {
    const qty = selectedQuantities[rt.roomTypeId] || 0;
    return sum + rt.price * numDays * qty;
  }, 0);

  const totalSelected = Object.values(selectedQuantities).reduce((sum, q) => sum + q, 0);

  return (
    <div>
      <h4 className="mb-3">Escolha a quantidade de quartos</h4>
      <div className="row">
        <div className="col-md-8">
          <div>
            {roomTypes.map(rt => {
              const qty = selectedQuantities[rt.roomTypeId] || 0;
              const totalAllDays = rt.price * numDays;
              const totalSelectedRoom = rt.price * numDays * qty;
              return (
                <div key={rt.roomTypeId} className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {typeof rt.name === 'string' ? rt.name : 'Quarto'}
                    </h5>
                    <p className="mb-1">{rt.description}</p>
                    <ul className="list-inline small text-muted">
                      <li className="list-inline-item">🛏 {rt.bedType}</li>
                      <li className="list-inline-item">👤 {rt.capacity} pessoa(s)</li>
                      <li className="list-inline-item">📦 {rt.availableRooms} disponíveis</li>
                    </ul>
                    <div className="row mt-3">
                      <div className="col-md-6 mb-2">
                        <div>
                          <span className="fw-bold text-success">
                            R$ {rt.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <div className="text-muted small">
                            Preço por diária
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="fw-bold text-primary">
                            R$ {totalAllDays.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <div className="text-muted small">
                            Total para {numDays} diária(s)
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex flex-column align-items-end">
                        <label htmlFor={`roomQty-${rt.roomTypeId}`} className="form-label mb-0">Quantidade</label>
                        <select
                          id={`roomQty-${rt.roomTypeId}`}
                          className={`form-select form-select-sm w-auto ms-2${showError && qty === 0 ? ' border-danger' : ''}`}
                          value={qty}
                          onChange={e => onQuantityChange(rt.roomTypeId, Number(e.target.value))}
                        >
                          {[...Array(rt.availableRooms + 1).keys()].map(i => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                        {qty > 0 && (
                          <div className="mt-3 text-end">
                            <span className="fw-bold text-success">
                              R$ {totalSelectedRoom.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            <div className="text-muted small">
                              {qty} quarto(s) × {numDays} diária(s)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-end">
          <div
            className="card p-4 w-100 mb-3"
            style={{
              position: 'sticky',
              top: 100,
              zIndex: 2,
              maxWidth: '350px'
            }}
          >
            <h5 className="mb-3 text-primary" style={{ fontWeight: 700 }}>
              <i className="bi bi-credit-card-2-front me-2"></i>Resumo da Reserva
            </h5>
            <div className="mb-2 fw-bold fs-5">
              Total: <span className="text-success">R$ {totalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="mb-2 text-muted small">
              {totalSelected} quarto(s) × {numDays} diária(s)
            </div>
            <button
              className="btn btn-primary mt-3 w-100"
              style={{ borderRadius: '10px', fontWeight: 600, fontSize: '1.1em' }}
              onClick={() => {
                if (totalSelected === 0 && onGoToPayment) {
                  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (onGoToPayment) onGoToPayment();
                  return;
                }
                if (onGoToPayment) onGoToPayment();
              }}
            >
              Ir para Pagamento
            </button>
            {showError && (
              <div className="alert alert-danger mt-3 w-100" role="alert">
                Selecione pelo menos um quarto para continuar.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeList;