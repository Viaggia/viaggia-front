import React, { useState } from 'react';
import { RoomTypeEnum, CreateHotelRoomTypeDTO, HotelRoomTypeDTO } from '../../../types/Hotel';
import { formatCurrencyBRL, parseCurrencyBRL, parseFieldValue } from '../../../utils/formatMask';

type RoomType = CreateHotelRoomTypeDTO | HotelRoomTypeDTO;

interface Props<T extends RoomType = RoomType> {
  roomTypes: T[];
  setRoomTypes: (data: T[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const roomTypeOptions: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];

const defaultRoom: CreateHotelRoomTypeDTO = {
  name: 'Single',
  description: '',
  price: 0,
  capacity: 1,
  bedType: '',
  totalRooms: 1,
};

// Função para garantir que o name seja sempre do tipo RoomTypeEnum válido
function normalizeRoom(room: RoomType): CreateHotelRoomTypeDTO {
  let name: RoomTypeEnum;

  if (typeof room.name === 'number') {
    // Se vier como número, converte para o valor do enum (RoomTypeEnum[])
    name = roomTypeOptions[room.name - 1] || 'Single';
  } else if (roomTypeOptions.includes(room.name as RoomTypeEnum)) {
    name = room.name as RoomTypeEnum;
  } else {
    name = 'Single';
  }

  return {
    name,
    description: room.description ?? '',
    price: room.price ?? 0,
    capacity: room.capacity ?? 1,
    bedType: room.bedType ?? '',
    totalRooms: room.totalRooms ?? 1,
  };
}

const HotelRoomTypesForm = <T extends RoomType = RoomType>({
  roomTypes,
  setRoomTypes,
  nextStep,
  prevStep,
}: Props<T>) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newRoom, setNewRoom] = useState<CreateHotelRoomTypeDTO>({ ...defaultRoom });

  const handleNewRoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;

    if (name === 'price') {
      parsedValue = parseCurrencyBRL(value);
    } else {
      parsedValue = parseFieldValue(name, value, type, ['price', 'capacity', 'totalRooms']);
    }

    setNewRoom(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleExistingRoomChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;

    if (name === 'price') {
      parsedValue = parseCurrencyBRL(value);
    } else {
      parsedValue = parseFieldValue(name, value, type, ['price', 'capacity', 'totalRooms']);
    }

    // Normaliza para garantir compatibilidade
    const updated = roomTypes.map((room, i) =>
      i === index ? { ...room, [name]: parsedValue } : room
    );
    setRoomTypes(updated as T[]);
  };

  const addRoomType = () => {
    if (
      newRoom.name &&
      newRoom.price > 0 &&
      newRoom.capacity > 0 &&
      newRoom.bedType.trim() !== '' &&
      newRoom.totalRooms > 0
    ) {
      setRoomTypes([...roomTypes, newRoom] as T[]);
      setNewRoom({ ...defaultRoom });
      setIsAdding(false);
    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }
  };

  const removeRoomType = (index: number) => {
    const updated = roomTypes.filter((_, i) => i !== index);
    setRoomTypes(updated as T[]);
  };

  const validateRoomTypes = () =>
    roomTypes.every(room => {
      const r = normalizeRoom(room);
      return (
        r.name &&
        roomTypeOptions.includes(r.name as RoomTypeEnum) &&
        r.price > 0 &&
        r.capacity > 0 &&
        r.bedType.trim() !== '' &&
        r.totalRooms > 0
      );
    });

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
              name="name"
              value={newRoom.name}
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
              name="description"
              value={newRoom.description}
              onChange={handleNewRoomChange}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-md-3 mb-2">
              <label className="form-label">Preço <span className="text-danger">*</span></label>
              <input
                type="text"
                name="price"
                value={formatCurrencyBRL(newRoom.price)}
                onChange={handleNewRoomChange}
                className="form-control"
                required
                min={0}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Capacidade <span className="text-danger">*</span></label>
              <input
                type="number"
                name="capacity"
                value={newRoom.capacity}
                onChange={handleNewRoomChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Tipo de Cama <span className="text-danger">*</span></label>
              <input
                type="text"
                name="bedType"
                value={newRoom.bedType}
                onChange={handleNewRoomChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Total de Quartos <span className="text-danger">*</span></label>
              <input
                type="number"
                name="totalRooms"
                value={newRoom.totalRooms}
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
        {roomTypes.map((room, index) => {
          const r = normalizeRoom(room);
          return (
            <div key={index} className="col-md-6 mb-3">
              <div className="card p-3 h-100">
                <h6 className="mb-3">Tipo de Quarto #{index + 1}</h6>
                <div className="mb-2">
                  <label className="form-label">Tipo</label>
                  <select
                    name="name"
                    value={r.name}
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
                    name="description"
                    value={r.description}
                    onChange={(e) => handleExistingRoomChange(index, e)}
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-6 mb-2">
                    <label className="form-label">Preço</label>
                    <input
                      type="text"
                      name="price"
                      value={formatCurrencyBRL(r.price)}
                      onChange={e => handleExistingRoomChange(index, e)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="form-label">Capacidade</label>
                    <input
                      type="number"
                      name="capacity"
                      value={r.capacity}
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
                      name="bedType"
                      value={r.bedType}
                      onChange={(e) => handleExistingRoomChange(index, e)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="form-label">Total de Quartos</label>
                    <input
                      type="number"
                      name="totalRooms"
                      value={r.totalRooms}
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
          );
        })}
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