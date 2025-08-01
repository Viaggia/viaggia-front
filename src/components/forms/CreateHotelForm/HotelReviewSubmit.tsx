import React from 'react';
import { CreateHotelDTO, CreateHotelRoomTypeDTO } from '../../../types/Hotel';

interface Props {
  formData: CreateHotelDTO;
  roomTypes: CreateHotelRoomTypeDTO[];
  handleSubmit: () => void;
  prevStep: () => void;
}

const HotelReviewSubmit: React.FC<Props> = ({ formData, roomTypes, handleSubmit, prevStep }) => {
  return (
    <div>
      <h5 className="mb-3">Revisar Dados</h5>

      <div className="mb-4">
        <h6>📌 Informações do Hotel</h6>
        <ul className="list-group">
          <li className="list-group-item"><strong>Nome:</strong> {formData.name}</li>
          <li className="list-group-item"><strong>CNPJ:</strong> {formData.cnpj}</li>
          <li className="list-group-item"><strong>Endereço:</strong> {formData.street}, {formData.city} - {formData.state}, {formData.zipCode}</li>
          <li className="list-group-item"><strong>Descrição:</strong> {formData.description || '—'}</li>
          <li className="list-group-item"><strong>Classificação:</strong> {formData.starRating} estrelas</li>
          <li className="list-group-item"><strong>Check-in:</strong> {formData.checkInTime || '—'}</li>
          <li className="list-group-item"><strong>Check-out:</strong> {formData.checkOutTime || '—'}</li>
          <li className="list-group-item"><strong>Telefone:</strong> {formData.contactPhone || '—'}</li>
          <li className="list-group-item"><strong>Email:</strong> {formData.contactEmail || '—'}</li>
          <li className="list-group-item"><strong>Ativo:</strong> {formData.isActive ? 'Sim' : 'Não'}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h6>🛏️ Tipos de Quarto</h6>
        {roomTypes.map((room, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <p><strong>Tipo:</strong> {room.Name}</p>
            <p><strong>Descrição:</strong> {room.Description || '—'}</p>
            <p><strong>Preço:</strong> R$ {room.Price.toFixed(2)}</p>
            <p><strong>Capacidade:</strong> {room.Capacity} pessoa(s)</p>
            <p><strong>Tipo de Cama:</strong> {room.BedType}</p>
            <p><strong>Total de Quartos:</strong> {room.TotalRooms}</p>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary" onClick={prevStep}>Voltar</button>
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default HotelReviewSubmit;