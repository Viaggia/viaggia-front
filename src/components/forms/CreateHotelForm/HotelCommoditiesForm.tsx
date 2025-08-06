import React, { useState } from 'react';
import { CreateCommodityDTO, CommodityDTO, CustomCommodityDTO } from '../../../types/Hotel';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';
import { parseCurrencyBRL } from '../../../utils/formatMask';
import CurrencyInput from '../../Inputs/CurrencyInput';

type CommodityFormType = Omit<CreateCommodityDTO, 'hotelName'> | CommodityDTO;

interface Props<T extends CommodityFormType = CommodityFormType> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  nextStep: () => void;
  prevStep: () => void;
  setCustomCommodities?: React.Dispatch<React.SetStateAction<CustomCommodityDTO[]>>; // opcional para edição
  customCommoditiesOverride?: CustomCommodityDTO[];
}

type BooleanFields = {
  [K in keyof CreateCommodityDTO as CreateCommodityDTO[K] extends boolean ? K : never]: boolean;
};

type FormCustomCommodity = Partial<CustomCommodityDTO> & {
  name: string;
  isPaid: boolean;
  price?: number;
  description?: string;
  isActive: boolean;
};

const priceFields = [
  { paid: 'isParkingPaid', price: 'parkingPrice', label: 'Preço do Estacionamento', dep: 'hasParking' },
  { paid: 'isBreakfastPaid', price: 'breakfastPrice', label: 'Preço do Café da Manhã', dep: 'hasBreakfast' },
  { paid: 'isLunchPaid', price: 'lunchPrice', label: 'Preço do Almoço', dep: 'hasLunch' },
  { paid: 'isDinnerPaid', price: 'dinnerPrice', label: 'Preço do Jantar', dep: 'hasDinner' },
  { paid: 'isSpaPaid', price: 'spaPrice', label: 'Preço do Spa', dep: 'hasSpa' },
  { paid: 'isPoolPaid', price: 'poolPrice', label: 'Preço da Piscina', dep: 'hasPool' },
  { paid: 'isGymPaid', price: 'gymPrice', label: 'Preço da Academia', dep: 'hasGym' },
  { paid: 'isWiFiPaid', price: 'wiFiPrice', label: 'Preço do Wi-Fi', dep: 'hasWiFi' },
  { paid: 'isAirConditioningPaid', price: 'airConditioningPrice', label: 'Preço do Ar-condicionado', dep: 'hasAirConditioning' },
  { paid: 'isAccessibilityFeaturesPaid', price: 'accessibilityFeaturesPrice', label: 'Preço da Acessibilidade', dep: 'hasAccessibilityFeatures' },
  { paid: 'isPetFriendlyPaid', price: 'petFriendlyPrice', label: 'Preço para Pets', dep: 'isPetFriendly' },
];

const HotelCommoditiesForm = <T extends CommodityFormType = CommodityFormType>({
  data,
  setData,
  nextStep,
  prevStep,
  setCustomCommodities, 
  customCommoditiesOverride,
}: Props<T>) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [serviceDraft, setServiceDraft] = useState<FormCustomCommodity>({
    name: '',
    isPaid: false,
    price: undefined,
    description: '',
    isActive: true,
  });

  // Helper para garantir que customCommodities nunca é undefined
  const getCustomCommodities = () =>
    (customCommoditiesOverride ?? data.customCommodities ?? []) as CustomCommodityDTO[];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData(prev => ({ ...prev, [name]: checked }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: parseCurrencyBRL(value)
    }));
  };

  const handleServiceDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setServiceDraft(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditService = (index: number) => {
    setEditingIndex(index);
    const service = getCustomCommodities()[index];
    setServiceDraft({
      name: service.name ?? '',
      isPaid: service.isPaid ?? false,
      price: service.price,
      description: service.description ?? '',
      isActive: service.isActive ?? true,
      customCommodityId: service.customCommodityId,
      commoditieId: service.commoditieId,
      hotelId: service.hotelId,
      hotelName: service.hotelName ?? '',
    });
    setIsAdding(true);
  };

  const handleSaveService = () => {
    if (!serviceDraft.name.trim()) {
      alert('O nome do serviço é obrigatório.');
      return;
    }
    if (serviceDraft.isPaid && (!serviceDraft.price || serviceDraft.price <= 0)) {
      alert('Informe o preço do serviço pago.');
      return;
    }

    const newService: CustomCommodityDTO = {
      customCommodityId: serviceDraft.customCommodityId ?? 0,
      name: serviceDraft.name,
      isPaid: serviceDraft.isPaid,
      price: serviceDraft.isPaid ? (serviceDraft.price ?? 0) : 0,
      description: serviceDraft.description ?? '',
      hotelName: serviceDraft.hotelName ?? '',
      isActive: serviceDraft.isActive ?? true,
      ...(typeof serviceDraft.commoditieId === 'number' ? { commoditieId: serviceDraft.commoditieId } : {}),
      ...(typeof serviceDraft.hotelId === 'number' ? { hotelId: serviceDraft.hotelId } : {}),
    };

    let updated: CustomCommodityDTO[];
    if (editingIndex !== null) {
      updated = [...getCustomCommodities()];
      updated[editingIndex] = newService;
    } else {
      updated = [...getCustomCommodities(), newService];
    }

    setData(prev => ({
      ...prev,
      customCommodities: updated,
    }));

    // Se veio o setter extra, atualize também!
    if (setCustomCommodities) setCustomCommodities(updated);

    setServiceDraft({
      name: '',
      isPaid: false,
      price: undefined,
      description: '',
      isActive: true,
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleCancelService = () => {
    setServiceDraft({
      name: '',
      isPaid: false,
      price: undefined,
      description: '',
      isActive: true,
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const removeService = (index: number) => {
    const updated = getCustomCommodities().filter((_, i) => i !== index);
    setData(prev => ({ ...prev, customCommodities: updated }));
    if (setCustomCommodities) setCustomCommodities(updated);
    if (editingIndex === index) {
      handleCancelService();
    }
  };

  // Dependências entre comodidades e suas opções pagas
  const dependencies: Record<string, string> = {
    isParkingPaid: 'hasParking',
    isBreakfastPaid: 'hasBreakfast',
    isLunchPaid: 'hasLunch',
    isDinnerPaid: 'hasDinner',
    isSpaPaid: 'hasSpa',
    isPoolPaid: 'hasPool',
    isGymPaid: 'hasGym',
    isWiFiPaid: 'hasWiFi',
    isAirConditioningPaid: 'hasAirConditioning',
    isAccessibilityFeaturesPaid: 'hasAccessibilityFeatures',
    isPetFriendlyPaid: 'isPetFriendly'
  };

  const comoditiesLabels: { field: keyof BooleanFields; label: string }[] = [
    { field: 'hasParking', label: 'Estacionamento' },
    { field: 'isParkingPaid', label: 'Estacionamento é pago?' },
    { field: 'hasBreakfast', label: 'Café da Manhã' },
    { field: 'isBreakfastPaid', label: 'Café da Manhã é pago?' },
    { field: 'hasLunch', label: 'Almoço' },
    { field: 'isLunchPaid', label: 'Almoço é pago?' },
    { field: 'hasDinner', label: 'Jantar' },
    { field: 'isDinnerPaid', label: 'Jantar é pago?' },
    { field: 'hasSpa', label: 'Spa' },
    { field: 'isSpaPaid', label: 'Spa é pago?' },
    { field: 'hasPool', label: 'Piscina' },
    { field: 'isPoolPaid', label: 'Piscina é paga?' },
    { field: 'hasGym', label: 'Academia' },
    { field: 'isGymPaid', label: 'Academia é paga?' },
    { field: 'hasWiFi', label: 'Wi-Fi' },
    { field: 'isWiFiPaid', label: 'Wi-Fi é pago?' },
    { field: 'hasAirConditioning', label: 'Ar-condicionado' },
    { field: 'isAirConditioningPaid', label: 'Ar-condicionado é pago?' },
    { field: 'hasAccessibilityFeatures', label: 'Acessibilidade' },
    { field: 'isAccessibilityFeaturesPaid', label: 'Acessibilidade é paga?' },
    { field: 'isPetFriendly', label: 'Aceita Pets' },
    { field: 'isPetFriendlyPaid', label: 'Taxa para Pets?' }
  ];

  return (
    <div>
      <h5 className="mb-4">Comodidades do Hotel</h5>

      <div className="row">
        {comoditiesLabels.map(({ field, label }) => {
          const dependency = dependencies[field as string];
          const isDisabled = dependency ? !data[dependency as keyof BooleanFields] : false;
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
                    checked={!!data[field]}
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
                      value={data[priceField.price as keyof typeof data] as number}
                      onChange={(val) =>
                        setData((prev) => ({
                          ...prev,
                          [priceField.price]: val,
                        }))
                      }
                      disabled={
                        !data[priceField.dep as keyof typeof data] ||
                        !data[priceField.paid as keyof typeof data]
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
      {getCustomCommodities().length === 0 && !isAdding && (
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
                name="name"
                value={serviceDraft.name}
                onChange={handleServiceDraftChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                name="description"
                value={serviceDraft.description}
                onChange={handleServiceDraftChange}
              />
            </div>
            <div className="col-md-2 mb-2 d-flex align-items-center">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isPaid"
                  checked={serviceDraft.isPaid}
                  onChange={handleServiceDraftChange}
                />
                <label className="form-check-label ms-1">Pago</label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <CurrencyInput
                name="price"
                value={serviceDraft.price}
                onChange={(val) =>
                  setServiceDraft((prev) => ({ ...prev, price: val }))
                }
                disabled={!serviceDraft.isPaid}
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
      {getCustomCommodities().map((service, index) => (
        <div key={index} className="card p-3 mb-3">
          <div className="row align-items-center">
            <div className="col-md-4 mb-2">
              <strong>{service.name}</strong>
              <div className="text-muted small">{service.description}</div>
            </div>
            <div className="col-md-2 mb-2">
              <span className={`badge ${service.isPaid ? 'bg-warning text-dark' : 'bg-success'}`}>
                {service.isPaid ? 'Pago' : 'Grátis'}
              </span>
              {service.isPaid && service.price ? (
                <span className="ms-2 text-muted small">R$ {Number(service.price).toFixed(2)}</span>
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