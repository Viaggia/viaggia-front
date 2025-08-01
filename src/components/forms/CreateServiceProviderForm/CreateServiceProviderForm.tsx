import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerServiceProvider } from '../../../services/authService'
import { CreateServiceProviderDTO } from '../../../types/User'
import 'bootstrap/dist/css/bootstrap.min.css'

function CreateServiceProviderForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<CreateServiceProviderDTO>({
    responsibleName: '',
    companyName: '',
    cnpj: '',
    companyLegalName: '',
    email: '',
    phoneNumber: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await registerServiceProvider(formData)
      console.log('Prestador de serviço cadastrado com sucesso:', response)
      navigate('/service-provider-dashboard')
    } catch (error) {
      alert('Erro ao cadastrar prestador de serviço. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Cadastro de Prestador de Serviço</h4>
              </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'responsibleName', label: 'Nome do Responsável', type: 'text' },
                  { name: 'companyName', label: 'Nome da Empresa', type: 'text' },
                  { name: 'cnpj', label: 'CNPJ', type: 'text', maxLength: 18 },
                  { name: 'companyLegalName', label: 'Razão Social', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phoneNumber', label: 'Telefone', type: 'tel', maxLength: 13 },
                  { name: 'password', label: 'Senha', type: 'password' }
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
                  <button type="submit" className="btn btn-primary">Cadastrar Prestador</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateServiceProviderForm
