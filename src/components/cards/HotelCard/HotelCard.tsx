import { Link } from 'react-router-dom';

interface HotelCardProps {
  titulo: string;
  imagem: string;
  preco: string;
}

function HotelCard({ titulo, imagem, preco }: HotelCardProps) {
  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img src={imagem} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">Diária por pessoa</p>
        <h2 className="text-primary">{preco}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          *Taxas não inclusas
        </p>
        <Link to="/details" className="btn btn-success w-100">
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;