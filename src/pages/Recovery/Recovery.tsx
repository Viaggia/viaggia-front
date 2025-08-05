import { useState } from 'react'
import { forgotPassword } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

function Recovery() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await forgotPassword({ email })
      setMessage('Verifique seu e-mail para redefinir sua senha.')
      setError('')
      setTimeout(() => navigate('/recovery/token'), 2000); 
    } catch (err) {
      setError('Erro ao enviar solicitação. Verifique o e-mail informado.')
      setMessage('')
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h3 className="card-title text-center mb-4 text-primary fw-bold">
                  Recupere sua senha
                </h3>
                <p className="text-center text-muted mb-4">
                  Insira seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Enviar solicitação
                    </button>
                  </div>
                </form>
                {message && <p className="text-success text-center mt-3">{message}</p>}
                {error && <p className="text-danger text-center mt-3">{error}</p>}
              </div>
              <div className="card-footer text-center text-muted small">
                Você receberá um link de redefinição em seu e-mail.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery
