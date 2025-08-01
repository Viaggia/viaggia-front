import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCreateDTO } from '../../../types/Package';
import { createPackage } from '../../../services/packageService';
//import { createPackage } from '../../services/packageService';

function CreatePackageForm() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState<PackageCreateDTO>({
    name: '',
    destination: '',
    description: '',
    basePrice: 0,
    hotelName: '',
    isActive: true,
    startDate: '',
    endDate: '',
    mediaFiles: []
  });

  const formatDateInput = (value: string) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let val: string | number = value;

    if (name === 'startDate' || name === 'endDate') {
      val = formatDateInput(value);
    } else if (type === 'number') {
      val = Number(value);
    }

    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFormData(prev => ({ ...prev, mediaFiles: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createPackage(formData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setFormData({
        name: '',
        destination: '',
        description: '',
        basePrice: 0,
        hotelName: '',
        isActive: true,
        startDate: '',
        endDate: '',
        mediaFiles: []
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar pacote. Verifique os dados e tente novamente.');
    }
  };


  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Cadastro de Pacote</h4>
              </div>
            <div className="card-body">
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
                      Pacote criado com sucesso!
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
                  { name: 'name', label: 'Nome do Pacote', type: 'text', required: true },
                  { name: 'destination', label: 'Destino', type: 'text', required: true },
                  { name: 'description', label: 'Descrição', type: 'textarea', required: false },
                  { name: 'basePrice', label: 'Preço Base', type: 'number', required: true },
                  { name: 'hotelName', label: 'Nome do Hotel', type: 'text', required: true },
                  { name: 'startDate', label: 'Data de Início (DD/MM/AAAA)', type: 'text', required: true },
                  { name: 'endDate', label: 'Data de Fim (DD/MM/AAAA)', type: 'text', required: true }
                ].map(({ name, label, type, required }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">
                      {label} {required && <span className="text-danger">*</span>}
                    </label>
                    {type === 'textarea' ? (
                      <textarea
                        name={name}
                        id={name}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className="form-control"
                        required={required}
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        id={name}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className="form-control"
                        required={required}
                      />
                    )}
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

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Cadastrar Pacote</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePackageForm;
