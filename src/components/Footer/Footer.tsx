import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-light text-dark py-5 border-top">
      <div className="container">
        <div className="row">

          {/* Nome do site e slogan */}
          <div className="col-md-4 mb-3 text-center text-md-start">
            <h5 className="fw-bold">Viaggia</h5>
            <p className="text-muted">Sua jornada começa aqui</p>
          </div>

          {/* Links úteis */}

          <div className="col-md-4 mb-3 text-center">
            <h6 className="fw-semibold">Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-decoration-none text-muted">Sobre nós</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-muted">Contato</Link></li>
              <li><Link to="/privacy" className="text-decoration-none text-muted">Termos e privacidade</Link></li>
            </ul>
          </div>

          {/* Redes sociais */}
          <div className="col-md-4 mb-3 text-center text-md-end">
            <h6 className="fw-semibold">Redes sociais</h6>
            <a href="#" className="text-muted me-3">Instagram</a>
            <a href="#" className="text-muted me-3">Facebook</a>
            <a href="#" className="text-muted">Twitter</a>
          </div>
        </div>

        {/* Linha inferior */}
        <hr />
        <div className="text-center text-muted" style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Viaggia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
