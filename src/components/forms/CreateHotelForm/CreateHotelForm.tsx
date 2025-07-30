import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateHotelDTO } from '../../../types/Hotel';
//import { createHotel } from '../../services/hotelService';

function CreateHotelForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateHotelDTO>({
    name: '',
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
    roomTypes: [],
    hotelDates: [],
    mediaFiles: [],
    commoditie: {
      hotelId: 0,
      hasParking: false,
      isParkingFree: false,
      hasBreakfast: false,
      isBreakfastFree: false,
      hasLunch: false,
      isLunchFree: false,
      hasDinner: false,
      isDinnerFree: false,
      hasSpa: false,
      isSpaFree: false,
      hasPool: false,
      isPoolFree: false,
      hasGym: false,
      isGymFree: false,
      hasWiFi: false,
      isWiFiFree: false,
      hasAirConditioning: false,
      isAirConditioningFree: false,
      hasAccessibilityFeatures: false,
      isAccessibilityFeaturesFree: false,
      isPetFriendly: false,
      isPetFriendlyFree: false,
      commoditiesServices: []
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    //setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //const response = await createHotel(formData);
     // console.log('Hotel cadastrado com sucesso:', response);
      navigate('/profile');
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
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Nome do Hotel', type: 'text' },
                  { name: 'street', label: 'Rua', type: 'text' },
                  { name: 'city', label: 'Cidade', type: 'text' },
                  { name: 'state', label: 'Estado', type: 'text' },
                  { name: 'zipCode', label: 'CEP', type: 'text' },
                  { name: 'description', label: 'Descrição', type: 'text' },
                  { name: 'starRating', label: 'Classificação (1 a 5)', type: 'number' },
                  { name: 'checkInTime', label: 'Check-in', type: 'text' },
                  { name: 'checkOutTime', label: 'Check-out', type: 'text' },
                  { name: 'contactPhone', label: 'Telefone de Contato', type: 'text' },
                  { name: 'contactEmail', label: 'Email de Contato', type: 'email' }
                ].map(({ name, label, type }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      className="form-control"
                      required={name !== 'description' && name !== 'checkInTime' && name !== 'checkOutTime'}
                    />
                  </div>
                ))}
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
