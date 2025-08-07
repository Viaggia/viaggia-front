import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import { CreateClientDTO } from '../../types/User'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const userDataFromGoogle = location.state?.userData

  const [formData, setFormData] = useState<CreateClientDTO>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phoneNumber: '',
  })

  const formFields = [
    { name: 'name', label: 'Nome Completo', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Senha', type: 'password' },
    { name: 'cpf', label: 'CPF', type: 'text', maxLength: 14 },
    { name: 'phoneNumber', label: 'Telefone', type: 'tel', maxLength: 13 },
  ];


  useEffect(() => {
    if (userDataFromGoogle) {
      setFormData(prev => ({
        ...prev,
        name: userDataFromGoogle.name || '',
        email: userDataFromGoogle.email || '',
        phoneNumber: userDataFromGoogle.phoneNumber || '',
      }))
    }
  }, [userDataFromGoogle])

  function formatCpf(value: string): string {
    const digits = value.replace(/\D/g, '');
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14);
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formattedValue = name === 'cpf' ? formatCpf(value) : value;

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };


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
                {formFields.map(({ name, label, type, maxLength }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={formData[name as keyof typeof formData] || ''}
                      onChange={handleChange}
                      required={true}
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
      </div>
    </div>
  )
}

export default Register