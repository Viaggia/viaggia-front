import { useEffect, useState } from 'react';
import { PackageCreateDTO, PackageDTO, PackageUpdateDTO } from '../../../types/Package';
import { createPackage, updatePackage } from '../../../services/packageService';
import ToastForm from '../../Toast/ToastForm';
import { getHotels } from '../../../services/hotelService';
import { formatCurrencyBRL, formatDateInput, parseCurrencyBRL } from '../../../utils/formatMask';

type FormMode = 'create' | 'edit';

interface CreatePackageFormProps {
  mode?: FormMode;
  initialData?: PackageCreateDTO | PackageUpdateDTO;
  packageId?: number;
  onClose?: () => void;
  onSubmitSuccess?: (updatedPackage?: PackageDTO) => void;
}

function CreatePackageForm({
  mode = 'create',
  initialData,
  packageId,
  onClose,
  onSubmitSuccess,
}: CreatePackageFormProps) {
  const [showToast, setShowToast] = useState(false);
  const [hotels, setHotels] = useState<{ name: string }[]>([]);
  const [formData, setFormData] = useState<PackageCreateDTO | PackageUpdateDTO>(
    initialData ??
    (mode === 'create'
      ? {
        name: '',
        destination: '',
        description: '',
        basePrice: 0,
        hotelName: '',
        isActive: true,
        startDate: '',
        endDate: '',
        mediaFiles: [],
      }
      : {
        name: '',
        destination: '',
        description: '',
        basePrice: 0,
        hotelName: '',
        isActive: true,
        startDate: '',
        endDate: '',
        mediaIdsToDelete: [],
        newMediaFiles: [],
      })
  );

  useEffect(() => {
    getHotels().then(hs => setHotels(hs));
  }, []);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      if (mode === 'create') {
        setFormData(prev => ({ ...prev, mediaFiles: Array.from(files) }));
      } else {
        setFormData(prev => ({ ...prev, newMediaFiles: Array.from(files) }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await createPackage(formData as PackageCreateDTO);
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
          mediaFiles: [],
        });
      } else {
        if (!packageId) return;
        const result = await updatePackage(packageId, formData as PackageUpdateDTO);
        setShowToast(true);
        if (onSubmitSuccess) onSubmitSuccess(result.data); // Passe o pacote atualizado
        setTimeout(() => setShowToast(false), 4000);
      }
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar/editar pacote. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="row m-0">
      <div className="col-12 bg-primary text-white py-3">
        <div className="container">
          <h4 className="mb-0">{mode === 'create' ? 'Cadastro de Pacote' : 'Editar Pacote'}</h4>
        </div>
      </div>
      <div className="col-12 py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="card shadow-sm rounded-4 border-0">
            <div className="card-body">
              <ToastForm
                show={showToast}
                message={mode === 'create' ? 'Pacote criado com sucesso!' : 'Pacote atualizado com sucesso!'}
                onClose={() => setShowToast(false)}
              />
              <form onSubmit={handleSubmit}>
                {/* Campos comuns */}
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
                    name={mode === 'create' ? 'mediaFiles' : 'newMediaFiles'}
                    id="mediaFiles"
                    multiple
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {/* Miniaturas das imagens selecionadas */}
                  {mode === 'create' &&
                    'mediaFiles' in formData &&
                    Array.isArray(formData.mediaFiles) &&
                    formData.mediaFiles.length > 0 && (
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
                  {mode === 'edit' &&
                    'newMediaFiles' in formData &&
                    Array.isArray(formData.newMediaFiles) &&
                    formData.newMediaFiles.length > 0 && (
                      <div className="mt-2 d-flex flex-wrap gap-2">
                        {formData.newMediaFiles.map((file: File, idx: number) => (
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
                  <button type="submit" className="btn btn-light text-primary fw-bold">
                    {mode === 'create' ? 'Cadastrar Pacote' : 'Salvar Alterações'}
                  </button>
                  {onClose && (
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                      Cancelar
                    </button>
                  )}
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