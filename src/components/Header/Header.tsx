import { Link } from 'react-router-dom'
import { FaPlaneDeparture } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-viaggia px-4">
        <Link to="/" className="navbar-brand d-flex align-items-center text-white">
          <FaPlaneDeparture className="me-2" />
          <strong>Viaggia</strong>
        </Link>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/search">Buscar</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/details">Detalhes</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/payment">Pagamento</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/pacotes">Pacotes</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/promocoes">Promoções</Link></li>
          </ul>
        </div>

        <div className="d-flex ms-auto">
          {user ? (
            <div className="text-white d-flex align-items-center gap-2">
              <span>Olá, {user.name}</span>
              <button className="btn btn-outline-light" onClick={() => navigate('/perfil')}>
                Minha Conta
              </button>

            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Cadastrar</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
