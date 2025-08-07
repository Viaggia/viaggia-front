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
    <div className="card h-100 shadow-sm" style={{ display: 'flex', flexDirection: 'row', minWidth: '250px', borderRadius: '16px', overflow: 'hidden' }}>
      
      {/* Imagem */}
      <div style={{ flex: '1 1 50%', maxHeight: '100%', overflow: 'hidden' }}>
        <img
          src={imagem}
          alt={titulo}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Conteúdo */}
      <div className="card-body" style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
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
        </div>

        <div>
          <p className="card-text mb-1">A partir de</p>
          <h2 className="text-primary">{precoFormatado}</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>*Taxas não inclusas</p>
          <Link to={`/details/${hotelId}`} className="btn btn-success w-100">
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
