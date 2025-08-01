import React from 'react';
import { RoomTypeEnum, CreateHotelRoomTypeDTO } from '../../../types/Hotel';

interface Props {
  roomTypes: CreateHotelRoomTypeDTO[];
  setRoomTypes: (data: CreateHotelRoomTypeDTO[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const roomTypeOptions: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];

const HotelRoomTypesForm: React.FC<Props> = ({ roomTypes, setRoomTypes, nextStep, prevStep }) => {
  const handleRoomTypeChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedRoomTypes = [...roomTypes];
    const parsedValue = ['Price', 'Capacity', 'TotalRooms'].includes(name) ? Number(value) : value;
    updatedRoomTypes[index][name as keyof CreateHotelRoomTypeDTO] = parsedValue as never;
    setRoomTypes(updatedRoomTypes);
  };

  const addRoomType = () => {
    setRoomTypes([...roomTypes, {
      Name: 'Single',
      Description: '',
      Price: 0,
      Capacity: 1,
      BedType: '',
      TotalRooms: 1
    }]);
  };

  const removeRoomType = (index: number) => {
    setRoomTypes(roomTypes.filter((_, i) => i !== index));
  };

  const validateRoomTypes = () => {
    return roomTypes.every(room =>
      room.Name &&
      room.Price > 0 &&
      room.Capacity > 0 &&
      room.BedType.trim() !== '' &&
      room.TotalRooms > 0
    );
  };

  return (
    <div>
      <h5 className="mb-3">Tipos de Quarto</h5>
      {roomTypes.map((room, index) => (
        <div key={index} className="card mb-3 p-3">
          <div className="mb-2">
            <label className="form-label">Tipo</label>
            <select
              name="Name"
              value={room.Name}
              onChange={(e) => handleRoomTypeChange(index, e)}
              className="form-select"
            >
              {roomTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          {[
            { name: 'Description', label: 'Descrição', type: 'text', required: false },
            { name: 'Price', label: 'Preço', type: 'number', required: true },
            { name: 'Capacity', label: 'Capacidade', type: 'number', required: true },
            { name: 'BedType', label: 'Tipo de Cama', type: 'text', required: true },
            { name: 'TotalRooms', label: 'Total de Quartos', type: 'number', required: true }
          ].map(({ name, label, type, required }) => (
            <div className="mb-2" key={name}>
              <label className="form-label">
                {label} {required && <span className="text-danger">*</span>}
              </label>
              <input
                type={type}
                name={name}
                value={(room as any)[name]}
                onChange={(e) => handleRoomTypeChange(index, e)}
                className="form-control"
                required={required}
              />
            </div>
          ))}
          <button type="button" className="btn btn-danger mt-2" onClick={() => removeRoomType(index)}>
            Remover Tipo de Quarto
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary mb-3" onClick={addRoomType}>
        Adicionar Tipo de Quarto
      </button>
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary" onClick={prevStep}>Voltar</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const formElements = document.querySelectorAll('.form-control');
            let isValid = true;

            for (const el of formElements) {
              if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
                if (!el.checkValidity()) {
                  el.reportValidity();
                  isValid = false;
                  break;
                }
              }
            }

            if (isValid && validateRoomTypes()) {
              nextStep();
            }
          }}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default HotelRoomTypesForm;
