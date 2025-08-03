import { useState } from 'react';
import { registerAdmin } from '../../../services/authService';
import { CreateAdminDTO } from '../../../types/User';
import { extractPhoneDigits, formatPhone, validateEmail } from '../../../utils/formatMask';
import ToastForm from '../../Toast/ToastForm';

function CreateAdminForm() {
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateAdminDTO>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      setFormData(prev => ({
        ...prev,
        phoneNumber: extractPhoneDigits(value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }

    if (formData.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length < 10 || formData.phoneNumber.length > 15) {
      setError('Informe um telefone válido (mínimo 10 e máximo 15 dígitos).');
      return;
    }

    try {
      await registerAdmin(formData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
      });
    } catch (error) {
      alert('Erro ao cadastrar admin. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="row m-0">
      {/* Faixa azul no topo */}
      <div className="col-12 bg-primary text-white py-3">
        <div className="container">
          <h4 className="mb-0">Cadastro de Administrador</h4>
        </div>
      </div>

      {/* Conteúdo do formulário */}
      <div className="col-12 py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="card shadow-sm rounded-4 border-0">
            <div className="card-body">
              <ToastForm
                show={showToast}
                message="Administrador cadastrado com sucesso!"
                onClose={() => setShowToast(false)}
              />
              <form onSubmit={handleSubmit} noValidate>
                {/* Nome Completo em linha única */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome Completo <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                {/* Email, Senha e Telefone na mesma linha */}
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="password" className="form-label">
                      Senha <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="phoneNumber" className="form-label">
                      Telefone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formatPhone(formData.phoneNumber)}
                      onChange={handleChange}
                      required
                      className="form-control"
                      maxLength={20}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-light text-primary fw-bold">
                    Cadastrar Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdminForm;