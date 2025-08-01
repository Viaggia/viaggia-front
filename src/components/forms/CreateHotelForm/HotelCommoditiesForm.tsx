import React from 'react';
import { CommoditieServicesDTO, CreateCommoditieDTO } from '../../../types/Hotel';

interface Props {
  commoditiesFormData: Omit<CreateCommoditieDTO, 'hotelId'>;
  setCommoditiesFormData: React.Dispatch<React.SetStateAction<Omit<CreateCommoditieDTO, 'hotelId'>>>;
  nextStep: () => void;
  prevStep: () => void;
}

// Define apenas os campos booleanos
type BooleanFields = {
  [K in keyof CreateCommoditieDTO as CreateCommoditieDTO[K] extends boolean ? K : never]: boolean;
};

const HotelCommoditiesForm: React.FC<Props> = ({
  commoditiesFormData,
  setCommoditiesFormData,
  nextStep,
  prevStep
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCommoditiesFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleServiceChange = (index: number, field: keyof CommoditieServicesDTO, value: string | boolean) => {
    const updatedServices = [...commoditiesFormData.commoditieServices];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setCommoditiesFormData(prev => ({ ...prev, commoditieServices: updatedServices }));
  };

  const addService = () => {
    setCommoditiesFormData(prev => ({
      ...prev,
      commoditieServices: [
        ...prev.commoditieServices,
        { name: '', isPaid: false, description: '', isActive: true, commoditieId: 0 }
      ]
    }));
  };

  const removeService = (index: number) => {
    const updated = commoditiesFormData.commoditieServices.filter((_, i) => i !== index);
    setCommoditiesFormData(prev => ({ ...prev, commoditieServices: updated }));
  };

  const comoditiesLabels: { field: keyof BooleanFields; label: string }[] = [
    { field: 'hasParking', label: 'Tem Estacionamento?' },
    { field: 'isParkingPaid', label: 'Estacionamento é pago?' },
    { field: 'hasBreakfast', label: 'Tem Café da Manhã?' },
    { field: 'isBreakfastPaid', label: 'Café da Manhã é pago?' },
    { field: 'hasLunch', label: 'Tem Almoço?' },
    { field: 'isLunchPaid', label: 'Almoço é pago?' },
    { field: 'hasDinner', label: 'Tem Jantar?' },
    { field: 'isDinnerPaid', label: 'Jantar é pago?' },
    { field: 'hasSpa', label: 'Tem Spa?' },
    { field: 'isSpaPaid', label: 'Spa é pago?' },
    { field: 'hasPool', label: 'Tem Piscina?' },
    { field: 'isPoolPaid', label: 'Piscina é paga?' },
    { field: 'hasGym', label: 'Tem Academia?' },
    { field: 'isGymPaid', label: 'Academia é paga?' },
    { field: 'hasWiFi', label: 'Tem Wi-Fi?' },
    { field: 'isWiFiPaid', label: 'Wi-Fi é pago?' },
    { field: 'hasAirConditioning', label: 'Tem Ar-condicionado?' },
    { field: 'isAirConditioningPaid', label: 'Ar-condicionado é pago?' },
    { field: 'hasAccessibilityFeatures', label: 'Tem Acessibilidade?' },
    { field: 'isAccessibilityFeaturesPaid', label: 'Acessibilidade é paga?' },
    { field: 'isPetFriendly', label: 'Aceita Pets?' },
    { field: 'isPetFriendlyPaid', label: 'Taxa para Pets?' }
  ];

  return (
    <div>
      <h5 className="mb-4">Comodidades do Hotel</h5>

      <div className="row">
        {comoditiesLabels.map(({ field, label }) => (
          <div className="col-md-6 mb-3" key={field}>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name={field}
                checked={commoditiesFormData[field]}
                onChange={handleChange}
              />
              <label className="form-check-label">{label}</label>
            </div>
          </div>
        ))}
      </div>

      <h6 className="mt-4">Serviços Adicionais</h6>
      {commoditiesFormData.commoditieServices.map((service, index) => (
        <div key={index} className="card p-3 mb-3">
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Serviço"
                value={service.name}
                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                value={service.description}
                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={service.isPaid}
                  onChange={(e) => handleServiceChange(index, 'isPaid', e.target.checked)}
                />
                <label className="form-check-label">Pago</label>
              </div>
            </div>
            <div className="col-md-6 mb-2 text-end">
              <button className="btn btn-danger" onClick={() => removeService(index)}>Remover Serviço</button>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary mb-4" onClick={addService}>Adicionar Serviço</button>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-primary" onClick={prevStep}>Voltar</button>
        <button className="btn btn-primary" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default HotelCommoditiesForm;
