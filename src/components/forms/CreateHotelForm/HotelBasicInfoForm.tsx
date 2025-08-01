import React from 'react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const HotelBasicInfoForm: React.FC<Props> = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev: any) => ({ ...prev, mediaFiles: Array.from(files) }));
    }
  };

  return (
    <form>
      <h5 className="mb-4">Informações Básicas do Hotel</h5>
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
      ].map(({ name, label, type, required }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="form-control"
            required={required}
          />
        </div>
      ))}
      <div className="mb-3">
        <label className="form-label">Imagens</label>
        <input type="file" multiple onChange={handleFileChange} className="form-control" />
      </div>
      <div className="d-grid gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const form = document.querySelector('form');
            if (form && form.checkValidity()) {
              nextStep();
            } else {
              form?.reportValidity();
            }
          }}
        >
          Próximo
        </button>
      </div>
    </form>
  );
};

export default HotelBasicInfoForm;