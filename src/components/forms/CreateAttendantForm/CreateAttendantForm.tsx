import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerAttendant } from '../../../services/authService'
import { CreateAttendantDTO } from '../../../types/User'
import 'bootstrap/dist/css/bootstrap.min.css'

function CreateAttendantForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<CreateAttendantDTO>({
    name: '',
    employerCompanyName: '',
    employeeId: '',
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
      const response = await registerAttendant(formData)
      console.log('Atendente cadastrado com sucesso:', response)
      navigate('/attendant-dashboard')
    } catch (error) {
      alert('Erro ao cadastrar atendente. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Cadastro de Atendente</h4>
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Nome Completo', type: 'text' },
                  { name: 'employerCompanyName', label: 'Empresa Empregadora', type: 'text' },
                  { name: 'employeeId', label: 'ID do Funcionário', type: 'text' },
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
                  <button type="submit" className="btn btn-primary">Cadastrar Atendente</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAttendantForm
