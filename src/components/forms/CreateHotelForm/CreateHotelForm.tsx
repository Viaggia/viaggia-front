import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateHotelDTO, CreateHotelRoomTypeDTO, RoomTypeEnum } from '../../../types/Hotel';
import { createHotel } from '../../../services/hotelService';


const roomTypeOptions: RoomTypeEnum[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];


function CreateHotelForm() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);


  const [formData, setFormData] = useState<Omit<CreateHotelDTO, 'roomTypesJson'>>({
    name: '',
    cnpj: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    starRating: 3,
    checkInTime: '',
    checkOutTime: '',
    contactPhone: '',
    contactEmail: '',
    isActive: true,
    mediaFiles: []
  });



  const [roomTypes, setRoomTypes] = useState<CreateHotelRoomTypeDTO[]>([
    {
      Name: 'Single',
      Description: '',
      Price: 0,
      Capacity: 1,
      BedType: '',
      TotalRooms: 1
    }
  ]);


  const handleRoomTypeChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedRoomTypes = [...roomTypes];

    const parsedValue =
      name === 'Price' || name === 'Capacity' || name === 'TotalRooms'
        ? Number(value)
        : value;

    updatedRoomTypes[index][name as keyof CreateHotelRoomTypeDTO] = parsedValue as never;
    setRoomTypes(updatedRoomTypes);
  };




  const addRoomType = () => {
    setRoomTypes([
      ...roomTypes,
      {
        Name: 'Single',
        Description: '',
        Price: 0,
        Capacity: 1,
        BedType: '',
        TotalRooms: 1
      }
    ]);
  };




  const removeRoomType = (index: number) => {
    const updatedRoomTypes = roomTypes.filter((_, i) => i !== index);
    setRoomTypes(updatedRoomTypes);
  };





  const resetForm = () => {
    setFormData({
      name: '',
      cnpj: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      description: '',
      starRating: 3,
      checkInTime: '',
      checkOutTime: '',
      contactPhone: '',
      contactEmail: '',
      isActive: true,
      mediaFiles: []
    });
    setRoomTypes([
      {
        Name: 'Single',
        Description: '',
        Price: 0,
        Capacity: 1,
        BedType: '',
        TotalRooms: 1
      }
    ]);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        mediaFiles: Array.from(files)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const roomTypesJson = JSON.stringify(roomTypes);
      const payload: CreateHotelDTO = {
        ...formData,
        roomTypesJson
      };

      console.log(payload)

      const result = await createHotel(payload);
      console.log("result, ", result)
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      resetForm();
    } catch (error) {
      alert('Erro ao cadastrar hotel. Verifique os dados e tente novamente.');
    }
  };


  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Cadastro de Hotel</h4>
              {showToast && (
                <div
                  className="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-4 show"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  style={{ zIndex: 9999 }}
                >
                  <div className="d-flex">
                    <div className="toast-body">
                      Hotel cadastrado com sucesso!
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      onClick={() => setShowToast(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Nome do Hotel', type: 'text', required: true },
                  { name: 'cnpj', label: 'CNPJ', type: 'text', required: true },
                  { name: 'street', label: 'Rua', type: 'text', required: true },
                  { name: 'city', label: 'Cidade', type: 'text', required: true },
                  { name: 'state', label: 'Estado', type: 'text', required: true },
                  { name: 'zipCode', label: 'CEP', type: 'text', required: true },
                  { name: 'description', label: 'Descrição', type: 'text', required: false },
                  { name: 'starRating', label: 'Classificação (1 a 5)', type: 'number', required: true },
                  { name: 'checkInTime', label: 'Check-in', type: 'text', required: false },
                  { name: 'checkOutTime', label: 'Check-out', type: 'text', required: false },
                  { name: 'contactPhone', label: 'Telefone de Contato', type: 'text', required: false },
                  { name: 'contactEmail', label: 'Email de Contato', type: 'email', required: false }
                ].

                  map(({ name, label, type, required }) => (
                    <div className="mb-3" key={name}>
                      <label htmlFor={name} className="form-label">
                        {label} {required && <span className="text-danger">*</span>}
                      </label>
                      <input
                        type={type}
                        name={name}
                        id={name}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className="form-control"
                        required={required}
                      />
                    </div>
                  ))}


                <div className="mb-3">
                  <label htmlFor="mediaFiles" className="form-label">Imagens</label>
                  <input
                    type="file"
                    name="mediaFiles"
                    id="mediaFiles"
                    multiple
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>

                <h5 className="mt-4">Tipos de Quarto</h5>
                {roomTypes.map((room, index) => (
                  <div key={index} className="border p-3 mb-3">
                    
<div className="mb-2">
                      <label className="form-label">Tipo</label>
                      <select
                        name="Name"
                        value={room.Name}
                        onChange={(e) => handleRoomTypeChange(index, e)}
                        className="form-select"
                        required
                      >
                        {roomTypeOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                   
{[
                      { name: 'Description', label: 'Descrição', type: 'text' },
                      { name: 'Price', label: 'Preço', type: 'number' },
                      { name: 'Capacity', label: 'Capacidade', type: 'number' },
                      { name: 'BedType', label: 'Tipo de Cama', type: 'text' },
                      { name: 'TotalRooms', label: 'Total de Quartos', type: 'number' }
                    ].
map(({ name, label, type }) => (
                      <div className="mb-2" key={name}>
                        <label className="form-label">{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={(room as any)[name]}
                          onChange={(e) => handleRoomTypeChange(index, e)}
                          className="form-control"
                          required
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

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Cadastrar Hotel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateHotelForm;
