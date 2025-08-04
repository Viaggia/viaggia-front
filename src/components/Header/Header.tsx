import { Link } from 'react-router-dom'
import { FaPlaneDeparture } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/authService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faInfoCircle, faCreditCard, faBoxOpen, faTags, faClipboardList, faBan } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      setUser(null)
      navigate('/login')
    }
  }

  return (
    <header>
      <div className='navbar navbar-expand-lg navbar-dark bg-viaggia px-4'>
        <Link to="/" className="navbar-brand d-flex align-items-center text-white">
          <FaPlaneDeparture className="me-2" />
          <strong>Viaggia</strong>
        </Link>
        <div className="d-flex ms-auto">
          {user ? (
            <div className="text-white d-flex align-items-center gap-2">
              <span>Olá, {user.name}</span>
              <button className="btn btn-outline-light" onClick={() => navigate('/profile')}>
                Minha Conta
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Cadastrar</Link>
            </>
          )}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-viaggia px-4">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/search">
                <FontAwesomeIcon icon={faSearch} /> Buscar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/details">
                <FontAwesomeIcon icon={faInfoCircle} /> Detalhes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/payment">
                <FontAwesomeIcon icon={faCreditCard} /> Pagamento
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/packages">
                <FontAwesomeIcon icon={faBoxOpen} /> Pacotes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/promotion">
                <FontAwesomeIcon icon={faTags} /> Promoções
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/my-reservations">
                <FontAwesomeIcon icon={faClipboardList} /> Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cancel-reservation">
                <FontAwesomeIcon icon={faBan} /> Cancelamento
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
