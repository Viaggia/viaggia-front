import React, { useState } from 'react';
import { CreateCommoditieDTO, CustomCommodityDTO } from '../../../types/Hotel';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';
import { formatCurrencyBRL, parseCurrencyBRL } from '../../../utils/formatMask';
import CurrencyInput from '../../Inputs/CurrencyInput';

interface Props {
  commoditiesFormData: Omit<CreateCommoditieDTO, 'HotelName'>;
  setCommoditiesFormData: React.Dispatch<React.SetStateAction<Omit<CreateCommoditieDTO, 'HotelName'>>>;
  nextStep: () => void;
  prevStep: () => void;
}

type BooleanFields = {
  [K in keyof CreateCommoditieDTO as CreateCommoditieDTO[K] extends boolean ? K : never]: boolean;
};

type FormCustomCommodity = Partial<CustomCommodityDTO> & {
  Name: string;
  IsPaid: boolean;
  Price?: number;
  Description?: string;
  IsActive: boolean;
};

const priceFields = [
  { paid: 'IsParkingPaid', price: 'ParkingPrice', label: 'Preço do Estacionamento', dep: 'HasParking' },
  { paid: 'IsBreakfastPaid', price: 'BreakfastPrice', label: 'Preço do Café da Manhã', dep: 'HasBreakfast' },
  { paid: 'IsLunchPaid', price: 'LunchPrice', label: 'Preço do Almoço', dep: 'HasLunch' },
  { paid: 'IsDinnerPaid', price: 'DinnerPrice', label: 'Preço do Jantar', dep: 'HasDinner' },
  { paid: 'IsSpaPaid', price: 'SpaPrice', label: 'Preço do Spa', dep: 'HasSpa' },
  { paid: 'IsPoolPaid', price: 'PoolPrice', label: 'Preço da Piscina', dep: 'HasPool' },
  { paid: 'IsGymPaid', price: 'GymPrice', label: 'Preço da Academia', dep: 'HasGym' },
  { paid: 'IsWiFiPaid', price: 'WiFiPrice', label: 'Preço do Wi-Fi', dep: 'HasWiFi' },
  { paid: 'IsAirConditioningPaid', price: 'AirConditioningPrice', label: 'Preço do Ar-condicionado', dep: 'HasAirConditioning' },
  { paid: 'IsAccessibilityFeaturesPaid', price: 'AccessibilityFeaturesPrice', label: 'Preço da Acessibilidade', dep: 'HasAccessibilityFeatures' },
  { paid: 'IsPetFriendlyPaid', price: 'PetFriendlyPrice', label: 'Preço para Pets', dep: 'IsPetFriendly' },
];

const HotelCommoditiesForm: React.FC<Props> = ({
  commoditiesFormData,
  setCommoditiesFormData,
  nextStep,
  prevStep
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [serviceDraft, setServiceDraft] = useState<FormCustomCommodity>({
    Name: '',
    IsPaid: false,
    Price: undefined,
    Description: '',
    IsActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCommoditiesFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommoditiesFormData(prev => ({
      ...prev,
      [name]: parseCurrencyBRL(value)
    }));
  };

  const handleServiceDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setServiceDraft(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'Price' ? Number(value) : value
    }));
  };

  const handleEditService = (index: number) => {
    setEditingIndex(index);
    const service = commoditiesFormData.CustomCommodities[index];
    setServiceDraft({
      Name: service.Name ?? '',
      IsPaid: service.IsPaid ?? false,
      Price: service.Price,
      Description: service.Description ?? '',
      IsActive: service.IsActive ?? true,
    });
    setIsAdding(true);
  };

  const handleSaveService = () => {
    if (!serviceDraft.Name.trim()) {
      alert('O nome do serviço é obrigatório.');
      return;
    }
    if (serviceDraft.IsPaid && (!serviceDraft.Price || serviceDraft.Price <= 0)) {
      alert('Informe o preço do serviço pago.');
      return;
    }

    const newService: Omit<CustomCommodityDTO, 'CustomCommodityId' | 'CommoditieId' | 'HotelId'> = {
      Name: serviceDraft.Name,
      IsPaid: serviceDraft.IsPaid,
      Price: serviceDraft.IsPaid ? serviceDraft.Price : undefined,
      Description: serviceDraft.Description,
      IsActive: serviceDraft.IsActive,
      HotelName: '', // pode ser preenchido no backend
    };

    if (editingIndex !== null) {
      const updated = [...commoditiesFormData.CustomCommodities];
      updated[editingIndex] = newService;
      setCommoditiesFormData(prev => ({
        ...prev,
        CustomCommodities: updated,
      }));
    } else {
      setCommoditiesFormData(prev => ({
        ...prev,
        CustomCommodities: [
          ...prev.CustomCommodities,
          newService,
        ],
      }));
    }
    setServiceDraft({
      Name: '',
      IsPaid: false,
      Price: undefined,
      Description: '',
      IsActive: true,
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleCancelService = () => {
    setServiceDraft({
      Name: '',
      IsPaid: false,
      Price: undefined,
      Description: '',
      IsActive: true,
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const removeService = (index: number) => {
    const updated = commoditiesFormData.CustomCommodities.filter((_, i) => i !== index);
    setCommoditiesFormData(prev => ({ ...prev, CustomCommodities: updated }));
    if (editingIndex === index) {
      handleCancelService();
    }
  };

  // Dependências entre comodidades e suas opções pagas
  const dependencies: Record<string, string> = {
    IsParkingPaid: 'HasParking',
    IsBreakfastPaid: 'HasBreakfast',
    IsLunchPaid: 'HasLunch',
    IsDinnerPaid: 'HasDinner',
    IsSpaPaid: 'HasSpa',
    IsPoolPaid: 'HasPool',
    IsGymPaid: 'HasGym',
    IsWiFiPaid: 'HasWiFi',
    IsAirConditioningPaid: 'HasAirConditioning',
    IsAccessibilityFeaturesPaid: 'HasAccessibilityFeatures',
    IsPetFriendlyPaid: 'IsPetFriendly'
  };

  const comoditiesLabels: { field: keyof BooleanFields; label: string }[] = [
    { field: 'HasParking', label: 'Estacionamento' },
    { field: 'IsParkingPaid', label: 'Estacionamento é pago?' },
    { field: 'HasBreakfast', label: 'Café da Manhã' },
    { field: 'IsBreakfastPaid', label: 'Café da Manhã é pago?' },
    { field: 'HasLunch', label: 'Almoço' },
    { field: 'IsLunchPaid', label: 'Almoço é pago?' },
    { field: 'HasDinner', label: 'Jantar' },
    { field: 'IsDinnerPaid', label: 'Jantar é pago?' },
    { field: 'HasSpa', label: 'Spa' },
    { field: 'IsSpaPaid', label: 'Spa é pago?' },
    { field: 'HasPool', label: 'Piscina' },
    { field: 'IsPoolPaid', label: 'Piscina é paga?' },
    { field: 'HasGym', label: 'Academia' },
    { field: 'IsGymPaid', label: 'Academia é paga?' },
    { field: 'HasWiFi', label: 'Wi-Fi' },
    { field: 'IsWiFiPaid', label: 'Wi-Fi é pago?' },
    { field: 'HasAirConditioning', label: 'Ar-condicionado' },
    { field: 'IsAirConditioningPaid', label: 'Ar-condicionado é pago?' },
    { field: 'HasAccessibilityFeatures', label: 'Acessibilidade' },
    { field: 'IsAccessibilityFeaturesPaid', label: 'Acessibilidade é paga?' },
    { field: 'IsPetFriendly', label: 'Aceita Pets' },
    { field: 'IsPetFriendlyPaid', label: 'Taxa para Pets?' }
  ];

  return (
    <div>
      <h5 className="mb-4">Comodidades do Hotel</h5>

      <div className="row">
        {comoditiesLabels.map(({ field, label }) => {
          const dependency = dependencies[field as string];
          const isDisabled = dependency ? !commoditiesFormData[dependency as keyof BooleanFields] : false;
          const isPaidField = field.endsWith('Paid');
          const icon = !isPaidField ? comoditiesIcons[field as keyof typeof comoditiesIcons] : null;
          const priceField = priceFields.find(p => p.paid === field);

          return (
            <div className="col-md-6 mb-3" key={field}>
              <div className="d-flex align-items-center">
                <div className="form-check form-switch d-flex align-items-center m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={field}
                    checked={commoditiesFormData[field]}
                    onChange={handleChange}
                    disabled={isDisabled}
                    id={`switch-${field}`}
                  />
                  <label className="form-check-label ms-2 d-flex align-items-center gap-2" htmlFor={`switch-${field}`}>
                    {icon && <span>{icon}</span>}
                    {label}
                  </label>
                </div>
                {/* Campo de valor alinhado à direita */}
                {priceField && (
                  <div className="ms-auto d-flex flex-column align-items-start" style={{ width: 140 }}>
                    <CurrencyInput
                      name={priceField.price}
                      label="Preço"
                      value={commoditiesFormData[priceField.price as keyof typeof commoditiesFormData] as number}
                      onChange={(val) =>
                        setCommoditiesFormData((prev) => ({
                          ...prev,
                          [priceField.price]: val,
                        }))
                      }
                      disabled={
                        !commoditiesFormData[priceField.dep as keyof typeof commoditiesFormData] ||
                        !commoditiesFormData[priceField.paid as keyof typeof commoditiesFormData]
                      }
                      inputStyle={{ width: 100 }}
                    />

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <h6 className="mt-4">Serviços Adicionais</h6>
      {commoditiesFormData.CustomCommodities.length === 0 && !isAdding && (
        <div className="alert alert-light border mb-3">
          Nenhum serviço adicional cadastrado ainda.
        </div>
      )}

      {/* Formulário de adicionar/editar serviço */}
      {isAdding && (
        <div className="card p-3 mb-3">
          <div className="row">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Serviço"
                name="Name"
                value={serviceDraft.Name}
                onChange={handleServiceDraftChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                name="Description"
                value={serviceDraft.Description}
                onChange={handleServiceDraftChange}
              />
            </div>
            <div className="col-md-2 mb-2 d-flex align-items-center">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="IsPaid"
                  checked={serviceDraft.IsPaid}
                  onChange={handleServiceDraftChange}
                />
                <label className="form-check-label ms-1">Pago</label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <CurrencyInput
                name="Price"
                value={serviceDraft.Price}
                onChange={(val) =>
                  setServiceDraft((prev) => ({ ...prev, Price: val }))
                }
                disabled={!serviceDraft.IsPaid}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-success" type="button" onClick={handleSaveService}>
              Salvar
            </button>
            <button className="btn btn-secondary" type="button" onClick={handleCancelService}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de serviços já cadastrados */}
      {commoditiesFormData.CustomCommodities.map((service, index) => (
        <div key={index} className="card p-3 mb-3">
          <div className="row align-items-center">
            <div className="col-md-4 mb-2">
              <strong>{service.Name}</strong>
              <div className="text-muted small">{service.Description}</div>
            </div>
            <div className="col-md-2 mb-2">
              <span className={`badge ${service.IsPaid ? 'bg-warning text-dark' : 'bg-success'}`}>
                {service.IsPaid ? 'Pago' : 'Grátis'}
              </span>
              {service.IsPaid && service.Price ? (
                <span className="ms-2 text-muted small">R$ {Number(service.Price).toFixed(2)}</span>
              ) : null}
            </div>
            <div className="col-md-6 mb-2 text-end">
              <button
                className="btn btn-outline-primary btn-sm me-2"
                type="button"
                onClick={() => handleEditService(index)}
              >
                Editar
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                type="button"
                onClick={() => removeService(index)}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      ))}

      {!isAdding && (
        <button className="btn btn-secondary mb-4" type="button" onClick={() => setIsAdding(true)}>
          Adicionar Serviço
        </button>
      )}

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-primary" type="button" onClick={prevStep}>Voltar</button>
        <button className="btn btn-primary" type="button" onClick={nextStep}>Próximo</button>
      </div>
    </div>
  );
};

export default HotelCommoditiesForm;