import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

interface PackageCardProps {
  titulo: string
  imagem: string
  preco: string
}

function PackageCard({ titulo, imagem, preco }: PackageCardProps) {
  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img src={imagem} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">1 noite, valor por pessoa</p>
        <h2 className="text-primary">{preco}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          *Taxas e impostos não inclusos
        </p>
        <Link to="/details" className="btn btn-success w-100">
          Conferir oferta
        </Link>
      </div>
    </div>
  )
}

export default PackageCard
