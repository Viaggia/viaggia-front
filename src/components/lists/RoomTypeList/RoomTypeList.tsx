import React from 'react';
import { HotelRoomTypeDTO } from '../../../types/Hotel';

interface RoomTypeListProps {
  roomTypes: HotelRoomTypeDTO[];
  selectedQuantities: { [roomTypeId: number]: number };
  onQuantityChange: (roomTypeId: number, quantity: number) => void;
  showError?: boolean;
}

const RoomTypeList: React.FC<RoomTypeListProps> = ({ roomTypes, selectedQuantities, onQuantityChange, showError }) => (
  <div className="col-12">
    <h4 className="mb-3">Escolha a quantidade de quartos</h4>
    {roomTypes.map(rt => (
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted text-decoration-line-through me-2">R$ {(rt.price * 1.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              <span className="fw-bold text-success">R$ {rt.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              <div className="text-muted small">Preço para 33 diárias</div>
            </div>
            <div>
              <label htmlFor={`roomQty-${rt.roomTypeId}`} className="form-label mb-0">Quantidade</label>
              <select
                id={`roomQty-${rt.roomTypeId}`}
                className={`form-select form-select-sm w-auto ms-2${showError && (selectedQuantities[rt.roomTypeId] || 0) === 0 ? ' border-danger' : ''}`}
                value={selectedQuantities[rt.roomTypeId] || 0}
                onChange={e => onQuantityChange(rt.roomTypeId, Number(e.target.value))}
              >
                {[...Array(rt.availableRooms + 1).keys()].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RoomTypeList;