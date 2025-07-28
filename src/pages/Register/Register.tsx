import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import { CreateClientDTO } from '../../types/User'
import 'bootstrap/dist/css/bootstrap.min.css'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<CreateClientDTO>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phoneNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await register(formData)
      console.log('Cadastro realizado com sucesso:', response)
      navigate('/login')
    } catch (error) {
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Faça seu Cadastro</h4>
              <form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Nome Completo', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'password', label: 'Senha', type: 'password' },
                  { name: 'cpf', label: 'CPF', type: 'text', maxLength: 11 },
                  { name: 'phoneNumber', label: 'Telefone', type: 'tel', maxLength: 13 },
                  { name: 'addressStreet', label: 'Rua', type: 'text' },
                  { name: 'addressCity', label: 'Cidade', type: 'text' },
                  { name: 'addressState', label: 'Estado', type: 'text', maxLength: 2 },
                  { name: 'addressZipCode', label: 'CEP', type: 'text', maxLength: 8 }
                ].map(({ name, label, type, maxLength }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      required={name !== 'addressStreet' && name !== 'addressCity' && name !== 'addressState' && name !== 'addressZipCode'}
                      className="form-control"
                      maxLength={maxLength}
                    />
                  </div>
                ))}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
                <p className="mt-3 text-center">
                  Já é cadastrado? <a href="/login" className="text-decoration-none text-primary">Fazer Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-center">
          <img src="https://i.pinimg.com/736x/99/de/98/99de98eb4e7bd078d39db104da78444e.jpg" alt="imagem-register" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  )
}

export default Register