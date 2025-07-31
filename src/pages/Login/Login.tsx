import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { getUserIdFromToken } from '../../utils/jwt';
import { getUserById } from '../../services/userService';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      console.log('Login realizado com sucesso!, token: ', response.token);

      const userId = getUserIdFromToken(response.token);
      console.log("userId: ", userId);
      if (userId) {
        const user = await getUserById(userId);
        setUser(user);
      }

      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div>
      {/* Corpo */}
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          {/* Formulário */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">Faça seu login</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-control" 
                      placeholder="Email" 
                      required 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      placeholder="Senha" 
                      required 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>

                  <p className="mt-3 text-center">
                    <a href="#" className="text-decoration-none text-primary">Esqueci a senha</a>
                  </p>
                  <p className="text-center">
                    Ainda não tem conta? <a href="/register" className="text-decoration-none text-primary">Cadastre-se</a>
                  </p>
                  <p className="text-center">ou use uma das seguintes opções</p>

                  {/* Ícones de login alternativo */}
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    {[1, 2, 3].map((i) => (
                      <a key={i} href="https://localhost:7164/api/Accounts/login-google">
                        <img
                          src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0"
                          alt={"Login com Google"}
                          className="rounded-circle"
                          style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                        />
                      </a>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Imagem lateral */}
          <div className="col-lg-6 text-center">
            <img
              src="https://i.pinimg.com/736x/99/de/98/99de98eb4e7bd078d39db104da78444e.jpg"
              alt="imagem-login"
              className="img-fluid rounded mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;