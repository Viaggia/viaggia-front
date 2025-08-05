import { useEffect, useState } from 'react';
import { PackageCreateDTO } from '../../../types/Package';
import { createPackage } from '../../../services/packageService';
import ToastForm from '../../Toast/ToastForm';
import { getHotels } from '../../../services/hotelService';
import { formatCurrencyBRL, formatDateInput, parseCurrencyBRL } from '../../../utils/formatMask';

function CreatePackageForm() {
  const [showToast, setShowToast] = useState(false);
  const [hotels, setHotels] = useState<{ name: string }[]>([]);

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

  useEffect(() => {
    getHotels().then(hs => setHotels(hs));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let val: string | number = value;
    if (name === 'startDate' || name === 'endDate') {
      val = formatDateInput(value);
    } else if (name === 'basePrice') {
      val = parseCurrencyBRL(value);
    } else if (type === 'number') {
      val = Number(value);
    }
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, mediaFiles: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPackage(formData);
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
    <div className="row m-0">
      {/* Faixa azul no topo */}
      <div className="col-12 bg-primary text-white py-3">
        <div className="container">
          <h4 className="mb-0">Cadastro de Pacote</h4>
        </div>
      </div>

      {/* Conteúdo do formulário */}
      <div className="col-12 py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="card shadow-sm rounded-4 border-0">
            <div className="card-body">
              <ToastForm
                show={showToast}
                message="Pacote criado com sucesso!"
                onClose={() => setShowToast(false)}
              />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome do Pacote <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Linha: Destino, Data de Início, Data de Fim */}
                <div className="row mb-3">
                  <div className="col-md-4 mb-2 mb-md-0">
                    <label htmlFor="destination" className="form-label">
                      Destino <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="destination"
                      id="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-2 mb-md-0">
                    <label htmlFor="startDate" className="form-label">
                      Data de Início <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="endDate" className="form-label">
                      Data de Fim <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Linha: Hotel e Preço Base */}
                <div className="row mb-3">
                  <div className="col-md-8 mb-2 mb-md-0">
                    <label htmlFor="hotelName" className="form-label">
                      Hotel <span className="text-danger">*</span>
                    </label>
                    <select
                      name="hotelName"
                      id="hotelName"
                      value={formData.hotelName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Selecione um hotel</option>
                      {hotels.map(hotel => (
                        <option key={hotel.name} value={hotel.name}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basePrice" className="form-label">
                      Preço Base <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="basePrice"
                      id="basePrice"
                      value={formatCurrencyBRL(formData.basePrice)}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Upload de imagens */}
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
                  {/* Miniaturas das imagens selecionadas */}
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
                  <button type="submit" className="btn btn-light text-primary fw-bold">Cadastrar Pacote</button>
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