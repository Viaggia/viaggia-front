import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerAdmin } from '../../../services/authService'
import { CreateAdminDTO } from '../../../types/User'
import 'bootstrap/dist/css/bootstrap.min.css'

function CreateAdminForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<CreateAdminDTO>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await registerAdmin(formData)
      console.log('Admin cadastrado com sucesso:', response)
      navigate('/admin-dashboard')
    } catch (error) {
      alert('Erro ao cadastrar admin. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Cadastro de Administrador</h4>
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
                  <button type="submit" className="btn btn-primary">Cadastrar Admin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default CreateAdminForm
