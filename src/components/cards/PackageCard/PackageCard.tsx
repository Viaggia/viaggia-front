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

function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function PackageCard({ packageId, titulo, destino, descricao, preco, imagem, datas }: PackageCardProps) {
  const precoFormatado = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div
      className="card h-100 shadow-sm"
      style={{
        minWidth: '250px',
        maxWidth: '300px',
        height: '470px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={imagem}
        className="card-img-top"
        alt={titulo}
        style={{ objectFit: 'cover', height: 180 }}
      />
      <div className="card-body d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
        <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {titulo}
        </h5>
        <div className="mb-2 text-muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {destino}
        </div>
        {descricao && (
          <p
            className="card-text"
            style={{
              fontSize: '0.95rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              minHeight: '4.5em',
              maxHeight: '4.5em',
              lineHeight: '1.5em',
            }}
            title={descricao}
          >
            {truncateText(descricao, 120)}
          </p>
        )}
        <div className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>{datas}</div>
        <p className="card-text mb-1">A partir de</p>
        <h2 className="text-primary">{precoFormatado}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          *Taxas e impostos não inclusos
        </p>
        <div style={{ marginTop: 'auto' }}>
          <Link to={`/package-details/${packageId}`} className="btn btn-success w-100">
            Conferir oferta
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PackageCard