import { Link } from 'react-router-dom'
import { FaPlaneDeparture } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logout, logoutGoogle } from '../../services/authService'

declare global {
  interface Window {
    bootstrap: any;
  }
}

function Header() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const closeNavbar = () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };


  const handleLogout = async () => {
    try {
      if (user?.isGoogleAccount) {
        await logoutGoogle()
      } else {
        await logout()
      }
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

        {/* Botão hamburguer */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu colapsável */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/" onClick={closeNavbar}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/packages" onClick={closeNavbar}>Pacotes</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/promotion" onClick={closeNavbar}>Promoções</Link></li>
          </ul>

          <div className="d-flex">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Olá, {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate('/profile');
                        closeNavbar();
                      }}
                    >
                      Minha Conta
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        handleLogout();
                        closeNavbar();
                      }}
                    >
                      Sair
                    </button>
                  </li>
                </ul>

              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-outline-light">Cadastrar</Link>
              </>
            )}
          </div>
        </div>
      </div>

    

    </header>
  )
}

export default Header
