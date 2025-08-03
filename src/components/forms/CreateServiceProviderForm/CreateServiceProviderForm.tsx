import { useState } from 'react'
import { registerServiceProvider } from '../../../services/authService'
import { CreateServiceProviderDTO } from '../../../types/User'
import { extractPhoneDigits, formatCNPJ, formatPhone, validateCNPJ, validateEmail } from '../../../utils/formatMask'
import ToastForm from '../../Toast/ToastForm'

function CreateServiceProviderForm() {
  const [showToast, setShowToast] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    if (name === 'phoneNumber') {
      setFormData(prev => ({ ...prev, phoneNumber: extractPhoneDigits(value) }))
    } else if (name === 'cnpj') {
      setFormData(prev => ({ ...prev, cnpj: formatCNPJ(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.responsibleName) {
      setError('Nome do responsável é obrigatório.')
      return
    }
    if (!formData.companyName) {
      setError('Nome da empresa é obrigatório.')
      return
    }
    if (!formData.cnpj || !validateCNPJ(formData.cnpj)) {
      setError('Informe um CNPJ válido (ex: 12.345.678/0001-99).')
      return
    }
    if (!formData.companyLegalName) {
      setError('Razão social é obrigatória.')
      return
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setError('Informe um e-mail válido.')
      return
    }
    if (!formData.phoneNumber || formData.phoneNumber.length < 10 || formData.phoneNumber.length > 15) {
      setError('Informe um telefone válido (mínimo 10 e máximo 15 dígitos).')
      return
    }
    if (!formData.password || formData.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    try {
      await registerServiceProvider(formData)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
      setFormData({
        responsibleName: '',
        companyName: '',
        cnpj: '',
        companyLegalName: '',
        email: '',
        phoneNumber: '',
        password: '',
      })
    } catch (error) {
      alert('Erro ao cadastrar prestador de serviço. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="row m-0">
      {/* Faixa azul no topo */}
      <div className="col-12 bg-primary text-white py-3">
        <div className="container">
          <h4 className="mb-0">Cadastro de Prestador de Serviço</h4>
        </div>
      </div>

      {/* Conteúdo do formulário */}
      <div className="col-12 py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="card shadow-sm rounded-4 border-0">
            <div className="card-body">
              <ToastForm
                show={showToast}
                message="Prestador de serviço cadastrado com sucesso!"
                onClose={() => setShowToast(false)}
              />
              <form onSubmit={handleSubmit} noValidate>
                {/* Nome do Responsável */}
                <div className="mb-3">
                  <label htmlFor="responsibleName" className="form-label">
                    Nome do Responsável <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="responsibleName"
                    id="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                {/* Empresa, CNPJ e Razão Social na mesma linha */}
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label htmlFor="companyName" className="form-label">
                      Nome da Empresa <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="cnpj" className="form-label">
                      CNPJ <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="cnpj"
                      id="cnpj"
                      value={formatCNPJ(formData.cnpj)}
                      onChange={handleChange}
                      required
                      className="form-control"
                      maxLength={18}
                      placeholder="12.345.678/0001-99"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="companyLegalName" className="form-label">
                      Razão Social <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyLegalName"
                      id="companyLegalName"
                      value={formData.companyLegalName}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
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
                    Cadastrar Prestador
                  </button>
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