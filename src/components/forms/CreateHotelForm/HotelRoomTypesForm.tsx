import React, { useState } from 'react';
import { RoomTypeEnum, CreateHotelRoomTypeDTO } from '../../../types/Hotel';

interface Props {
  roomTypes: CreateHotelRoomTypeDTO[];
  setRoomTypes: (data: CreateHotelRoomTypeDTO[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const roomTypeOptions: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];

const defaultRoom: CreateHotelRoomTypeDTO = {
  Name: 'Single',
  Description: '',
  Price: 0,
  Capacity: 1,
  BedType: '',
  TotalRooms: 1,
};

const HotelRoomTypesForm: React.FC<Props> = ({ roomTypes, setRoomTypes, nextStep, prevStep }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newRoom, setNewRoom] = useState<CreateHotelRoomTypeDTO>({ ...defaultRoom });

  const handleNewRoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Permite campo vazio para inputs numéricos
    const parsedValue =
      type === 'number' && value === ''
        ? ''
        : ['Price', 'Capacity', 'TotalRooms'].includes(name)
          ? Number(value)
          : value;
    setNewRoom(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleExistingRoomChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const parsedValue =
      type === 'number' && value === ''
        ? ''
        : ['Price', 'Capacity', 'TotalRooms'].includes(name)
          ? Number(value)
          : value;
    const updated = [...roomTypes];
    updated[index] = { ...updated[index], [name]: parsedValue };
    setRoomTypes(updated);
  };

  const addRoomType = () => {
    if (
      newRoom.Name &&
      newRoom.Price > 0 &&
      newRoom.Capacity > 0 &&
      newRoom.BedType.trim() !== '' &&
      newRoom.TotalRooms > 0
    ) {
      setRoomTypes([...roomTypes, newRoom]);
      setNewRoom({ ...defaultRoom });
      setIsAdding(false);
    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }
  };

  const removeRoomType = (index: number) => {
    const updated = roomTypes.filter((_, i) => i !== index);
    setRoomTypes(updated);
  };

  const validateRoomTypes = () =>
    roomTypes.every(
      room =>
        room.Name &&
        room.Price > 0 &&
        room.Capacity > 0 &&
        room.BedType.trim() !== '' &&
        room.TotalRooms > 0
    );

  return (
    <div>
      <h5 className="mb-3">Tipos de Quarto</h5>

      {roomTypes.length === 0 && !isAdding && (
        <p className="text-muted">Nenhum tipo de quarto adicionado ainda.</p>
      )}

      {isAdding && (
        <div className="card mb-3 p-3 border-primary">
          <h6 className="mb-3">Novo Tipo de Quarto</h6>
          <div className="mb-2">
            <label className="form-label">Tipo</label>
            <select
              name="Name"
              value={newRoom.Name}
              onChange={handleNewRoomChange}
              className="form-select"
            >
              {roomTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              name="Description"
              value={newRoom.Description}
              onChange={handleNewRoomChange}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-md-3 mb-2">
              <label className="form-label">Preço <span className="text-danger">*</span></label>
              <input
                type="number"
                name="Price"
                value={newRoom.Price}
                onChange={handleNewRoomChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Capacidade <span className="text-danger">*</span></label>
              <input
                type="number"
                name="Capacity"
                value={newRoom.Capacity}
                onChange={handleNewRoomChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Tipo de Cama <span className="text-danger">*</span></label>
              <input
                type="text"
                name="BedType"
                value={newRoom.BedType}
                onChange={handleNewRoomChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Total de Quartos <span className="text-danger">*</span></label>
              <input
                type="number"
                name="TotalRooms"
                value={newRoom.TotalRooms}
                onChange={handleNewRoomChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success" onClick={addRoomType}>Salvar</button>
            <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Cards em grid 2 por linha */}
      <div className="row">
        {roomTypes.map((room, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card p-3 h-100">
              <h6 className="mb-3">Tipo de Quarto #{index + 1}</h6>
              <div className="mb-2">
                <label className="form-label">Tipo</label>
                <select
                  name="Name"
                  value={room.Name}
                  onChange={(e) => handleExistingRoomChange(index, e)}
                  className="form-select"
                >
                  {roomTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Descrição</label>
                <input
                  type="text"
                  name="Description"
                  value={room.Description}
                  onChange={(e) => handleExistingRoomChange(index, e)}
                  className="form-control"
                />
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">Preço</label>
                  <input
                    type="number"
                    name="Price"
                    value={room.Price}
                    onChange={(e) => handleExistingRoomChange(index, e)}
                    className="form-control"
                  />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Capacidade</label>
                  <input
                    type="number"
                    name="Capacity"
                    value={room.Capacity}
                    onChange={(e) => handleExistingRoomChange(index, e)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">Tipo de Cama</label>
                  <input
                    type="text"
                    name="BedType"
                    value={room.BedType}
                    onChange={(e) => handleExistingRoomChange(index, e)}
                    className="form-control"
                  />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Total de Quartos</label>
                  <input
                    type="number"
                    name="TotalRooms"
                    value={room.TotalRooms}
                    onChange={(e) => handleExistingRoomChange(index, e)}
                    className="form-control"
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => removeRoomType(index)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isAdding && (
        <button type="button" className="btn btn-secondary mb-4" onClick={() => setIsAdding(true)}>
          Adicionar Tipo de Quarto
        </button>
      )}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary" onClick={prevStep}>Voltar</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (validateRoomTypes()) {
              nextStep();
            } else {
              alert('Preencha todos os campos obrigatórios corretamente.');
            }
          }}
          disabled={roomTypes.length === 0}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default HotelRoomTypesForm;