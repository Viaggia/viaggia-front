import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCreateDTO } from '../../../types/Package';
//import { createPackage } from '../../services/packageService';

function CreatePackageForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PackageCreateDTO>({
    name: '',
    destination: '',
    description: '',
    basePrice: 0,
    hotelId: 0,
    isActive: true,
    packageDates: [],
    mediaFiles: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
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
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'mediaFiles') {
          (value as File[]).forEach(file => form.append('mediaFiles', file));
        } else {
          form.append(key, JSON.stringify(value));
        }
      });

      //const response = await createPackage(form);
      //console.log('Pacote criado com sucesso:', response);
      navigate('/packages');
    } catch (error) {
      alert('Erro ao cadastrar pacote. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Cadastro de Pacote</h4>
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Nome do Pacote', type: 'text' },
                  { name: 'destination', label: 'Destino', type: 'text' },
                  { name: 'description', label: 'Descrição', type: 'textarea' },
                  { name: 'basePrice', label: 'Preço Base', type: 'number' },
                  { name: 'hotelId', label: 'ID do Hotel', type: 'number' }
                ].map(({ name, label, type }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    {type === 'textarea' ? (
                      <textarea
                        name={name}
                        id={name}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        id={name}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className="form-control"
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
