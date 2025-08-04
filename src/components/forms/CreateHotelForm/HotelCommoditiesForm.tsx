import React, { useState } from 'react';
import { CreateCommoditieDTO } from '../../../types/Hotel';
import { comoditiesIcons } from '../../../utils/commoditiesIcons'; // importe o utilitário de ícones

interface Props {
  commoditiesFormData: Omit<CreateCommoditieDTO, 'hotelName'>;
  setCommoditiesFormData: React.Dispatch<React.SetStateAction<Omit<CreateCommoditieDTO, 'hotelName'>>>;
  nextStep: () => void;
  prevStep: () => void;
}

// Define apenas os campos booleanos
type BooleanFields = {
  [K in keyof CreateCommoditieDTO as CreateCommoditieDTO[K] extends boolean ? K : never]: boolean;
};

// Tipo correto para serviços adicionais do formulário
type FormCommoditieService = {
  name: string;
  isPaid: boolean;
  description: string;
  isActive: boolean;
};

const HotelCommoditiesForm: React.FC<Props> = ({
  commoditiesFormData,
  setCommoditiesFormData,
  nextStep,
  prevStep
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [serviceDraft, setServiceDraft] = useState<FormCommoditieService>({
    name: '',
    isPaid: false,
    description: '',
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCommoditiesFormData(prev => ({ ...prev, [name]: checked }));
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
    const service = commoditiesFormData.commoditieServices[index];
    setServiceDraft({
      name: service.name,
      isPaid: service.isPaid,
      description: service.description,
      isActive: service.isActive,
    });
    setIsAdding(true);
  };

  const handleSaveService = () => {
    if (!serviceDraft.name.trim()) {
      alert('O nome do serviço é obrigatório.');
      return;
    }
    if (editingIndex !== null) {
      // Editando serviço existente
      const updated = [...commoditiesFormData.commoditieServices];
      updated[editingIndex] = { ...serviceDraft };
      setCommoditiesFormData(prev => ({
        ...prev,
        commoditieServices: updated,
      }));
    } else {
      // Adicionando novo serviço
      setCommoditiesFormData(prev => ({
        ...prev,
        commoditieServices: [
          ...prev.commoditieServices,
          { ...serviceDraft },
        ],
      }));
    }
    setServiceDraft({
      name: '',
      isPaid: false,
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
      description: '',
      isActive: true,
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const removeService = (index: number) => {
    const updated = commoditiesFormData.commoditieServices.filter((_, i) => i !== index);
    setCommoditiesFormData(prev => ({ ...prev, commoditieServices: updated }));
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

  // Agora só o nome e o ícone, sem "Tem ...?"
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
          const isDisabled = dependency ? !commoditiesFormData[dependency as keyof BooleanFields] : false;
          const isPaidField = field.endsWith('Paid');
          const icon = !isPaidField ? comoditiesIcons[field as keyof typeof comoditiesIcons] : null;

          return (
            <div className="col-md-6 mb-3" key={field}>
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
            </div>
          );
        })}
      </div>

      <h6 className="mt-4">Serviços Adicionais</h6>
      {/* Empty state */}
      {commoditiesFormData.commoditieServices.length === 0 && !isAdding && (
        <div className="alert alert-light border mb-3">
          Nenhum serviço adicional cadastrado ainda.
        </div>
      )}

      {/* Formulário de adicionar/editar serviço */}
      {isAdding && (
        <div className="card p-3 mb-3">
          <div className="row">
            <div className="col-md-5 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Serviço"
                name="name"
                value={serviceDraft.name}
                onChange={handleServiceDraftChange}
              />
            </div>
            <div className="col-md-5 mb-2">
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
      {commoditiesFormData.commoditieServices.map((service, index) => (
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