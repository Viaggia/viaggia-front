import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateHotelDTO } from '../../../types/Hotel';
import { createHotel } from '../../../services/hotelService';

function CreateHotelForm() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState<CreateHotelDTO>({
    name: '',
    cnpj: '',
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

  const resetForm = () => {
    setFormData({
      name: '',
      cnpj: '',
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createHotel(formData);
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
                  { name: 'description', label: 'Descrição', type: 'text', required: false },
                  { name: 'starRating', label: 'Classificação (1 a 5)', type: 'number', required: true },
                  { name: 'checkInTime', label: 'Check-in', type: 'text', required: false },
                  { name: 'checkOutTime', label: 'Check-out', type: 'text', required: false },
                  { name: 'contactPhone', label: 'Telefone de Contato', type: 'text', required: false },
                  { name: 'contactEmail', label: 'Email de Contato', type: 'email', required: false }
                ].map(({ name, label, type, required }) => (
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
                ))
                }
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
