import { Link } from 'react-router-dom';

interface HotelCardProps {
  hotelId: number;
  titulo: string;
  imagem: string;
  preco: number | null;
  descricao?: string;
  estrelas?: number;
  cidade?: string;
}

function HotelCard({ hotelId, titulo, imagem, preco, descricao, estrelas, cidade }: HotelCardProps) {
  
  const precoFormatado = preco !== null && preco !== undefined
    ? preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Preço indisponível';


  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img
        src={imagem}
        className="card-img-top"
        alt={titulo}
        style={{ objectFit: 'cover', height: 180 }}
      />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        {estrelas && (
          <div className="mb-2">
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ color: '#FFD700', fontSize: '1.1em' }}>★</span>
            ))}
          </div>
        )}
        {cidade && <div className="text-muted mb-1">{cidade}</div>}
        {descricao && <p className="card-text" style={{ fontSize: '0.95rem' }}>{descricao}</p>}
        <p className="card-text mb-1">A partir de</p>
        <h2 className="text-primary">{precoFormatado}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>*Taxas não inclusas</p>
        <Link to={`/details/${hotelId}`} className="btn btn-success w-100">
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;