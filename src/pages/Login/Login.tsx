import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext'
import { getUserIdFromToken } from '../../utils/jwt';
import { getUserById } from '../../services/userService';

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login({ email, password })
      localStorage.setItem('token', response.token)
      console.log('Login realizado com sucesso!, token: ', response.token)


      const userId = getUserIdFromToken(response.token)
      console.log("userId: ", userId)
      if (userId) {
        const user = await getUserById(userId)
        setUser(user)
      }


      navigate('/')
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Email ou senha incorretos.')
    }
  }

  return (
    <div>
      <div className='login-container'>
        <div className="card-login">
          <div className="login-content">
            <form className="form-card" onSubmit={handleSubmit}>
              <p>Faça seu login</p>
              <div className="input-email">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="input-password">
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
              <a href="#" className="link-login">Esqueci a senha</a>
              <span>Ainda não tem conta? <a href="/register" className="link-login">Cadastre-se</a></span>
              <span>ou use uma das seguintes opções</span>
              <div className="img-link-login">
                <a href="https://google.com">
                  <img src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0" alt="Imagem 1" />
                </a>
                <a href="https://google.com">
                  <img src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0" alt="Imagem 2" />
                </a>
                <a href="https://google.com">
                  <img src="https://th.bing.com/th/id/R.9083a08e5078931279f9c07bd361b4f2?rik=wR6IQoBKiuF9Ww&pid=ImgRaw&r=0" alt="Imagem 3" />
                </a>
              </div>
            </form>



          </div>
        </div>
        <div className='img-login'>
          <img src="https://i.pinimg.com/736x/99/de/98/99de98eb4e7bd078d39db104da78444e.jpg" alt="imagem-login" />
        </div>
      </div>

    </div>
  );
}

export default Login;
