import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

interface PackageCardProps {
  packageId: number
  titulo: string
  destino: string
  descricao?: string
  preco: number
  imagem: string
  datas: string
}

function PackageCard({ packageId, titulo, destino, descricao, preco, imagem, datas }: PackageCardProps) {
  const precoFormatado = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img src={imagem} className="card-img-top" alt={titulo} style={{ objectFit: 'cover', height: 180 }} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <div className="mb-2 text-muted">{destino}</div>
        {descricao && <p className="card-text" style={{ fontSize: '0.95rem' }}>{descricao}</p>}
        <div className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>{datas}</div>
        <p className="card-text mb-1">A partir de</p>
        <h2 className="text-primary">{precoFormatado}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          *Taxas e impostos não inclusos
        </p>
        <Link to={`/details/${packageId}`} className="btn btn-success w-100">
          Conferir oferta
        </Link>
      </div>
    </div>
  )
}

export default PackageCard