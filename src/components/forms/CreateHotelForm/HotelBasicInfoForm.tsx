import React from 'react';
import {
  formatCNPJ,
  extractCNPJDigits,
  validateCNPJ,
  formatPhone,
  extractPhoneDigits,
  validateEmail,
  formatTime,
  formatCEP,
  extractCEPDigits
} from '../../../utils/formatMask';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const HotelBasicInfoForm: React.FC<Props> = ({ formData, setFormData, nextStep }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let val: any = type === 'checkbox' ? checked : value;

    if (name === 'cnpj') {
      val = extractCNPJDigits(value); // salva sem formatação
    }
    if (name === 'zipCode') {
      val = extractCEPDigits(value); // idem para CEP
    }
    if (name === 'contactPhone') {
      val = extractPhoneDigits(value); // idem para telefone
    }
    if (name === 'checkInTime' || name === 'checkOutTime') {
      val = formatTime(value); // aqui pode manter a formatação
    }

    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev: any) => ({ ...prev, mediaFiles: Array.from(files) }));
    }
  };

  const handleNext = () => {
    if (!formData.name) return alert('Nome do hotel é obrigatório.');

    if (!formData.cnpj || !validateCNPJ(formatCNPJ(formData.cnpj))) {
      return alert('CNPJ inválido.');
    }

    if (!formData.street) return alert('Rua é obrigatória.');
    if (!formData.city) return alert('Cidade é obrigatória.');
    if (!formData.state) return alert('Estado é obrigatório.');
    if (!formData.zipCode || extractCEPDigits(formData.zipCode).length !== 8) return alert('CEP inválido.');
    if (formData.contactEmail && !validateEmail(formData.contactEmail)) return alert('Email inválido.');
    nextStep();
  };

  return (
    <form>
      <h5 className="mb-4 mt-4">Informações Básicas do Hotel</h5>
      {/* Nome, CNPJ e Classificação */}
      <div className="row">
        <div className="mb-3 col-md-5">
          <label className="form-label">
            Nome do Hotel <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label">
            CNPJ <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="cnpj"
            value={formatCNPJ(formData.cnpj)}
            onChange={handleChange}
            className="form-control"
            required
            maxLength={18}
            placeholder="12.345.678/0001-99"
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">
            Classificação (1 a 5) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="starRating"
            value={formData.starRating}
            onChange={handleChange}
            className="form-control"
            required
            min={1}
            max={5}
          />
        </div>
      </div>
      {/* Rua, Cidade, Estado e CEP */}
      <div className="row">
        <div className="mb-3 col-md-4">
          <label className="form-label">
            Logradouro <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">
            Cidade <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">
            Estado <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">
            CEP <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="zipCode"
            value={formatCEP(formData.zipCode)}
            onChange={handleChange}
            className="form-control"
            required
            maxLength={9}
            placeholder="00000-000"
          />
        </div>
      </div>
      {/* Descrição */}
      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      {/* Check-in, Check-out, Telefone, Email */}
      <div className="row">
        <div className="mb-3 col-md-3">
          <label className="form-label">Check-in</label>
          <input
            type="text"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            className="form-control"
            placeholder="14:00"
            maxLength={5}
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Check-out</label>
          <input
            type="text"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            className="form-control"
            placeholder="12:00"
            maxLength={5}
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Telefone de Contato</label>
          <input
            type="text"
            name="contactPhone"
            value={formatPhone(formData.contactPhone)}
            onChange={handleChange}
            className="form-control"
            maxLength={20}
            inputMode="numeric"
          />
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Email de Contato</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      {/* Imagens */}
      <div className="mb-3">
        <label className="form-label">Imagens</label>
        <input type="file" multiple onChange={handleFileChange} className="form-control" />
        {/* Lista visual dos arquivos selecionados com miniatura */}
        {formData.mediaFiles && formData.mediaFiles.length > 0 && (
          <div className="mt-2 d-flex flex-wrap gap-2">
            {formData.mediaFiles.map((file: File, idx: number) => (
              <div key={idx} className="d-flex flex-column align-items-center" style={{ width: 80 }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }}
                />
                <span className="small text-truncate" style={{ maxWidth: 70 }}>{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="d-grid gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNext}
        >
          Próximo
        </button>
      </div>
    </form>
  );
};

export default HotelBasicInfoForm;