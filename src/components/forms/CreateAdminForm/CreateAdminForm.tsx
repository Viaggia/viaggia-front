import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../../../services/authService';
import { CreateAdminDTO } from '../../../types/User';

function CreateAdminForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateAdminDTO>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerAdmin(formData);
      console.log('Admin cadastrado com sucesso:', response);
      navigate('/admin-dashboard');
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
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Nome Completo', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'password', label: 'Senha', type: 'password' },
                  { name: 'phoneNumber', label: 'Telefone', type: 'tel', maxLength: 13 }
                ].map(({ name, label, type, maxLength }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      required
                      className="form-control"
                      maxLength={maxLength}
                    />
                  </div>
                ))}
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
