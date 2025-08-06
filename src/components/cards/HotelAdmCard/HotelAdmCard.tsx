import { FaHotel, FaTrash, FaEdit, FaStar, FaRegStar } from 'react-icons/fa';
import { HotelDTO } from '../../../types/Hotel';

interface Props {
  hotel: HotelDTO;
  onEdit: (hotelId: number) => void;
  onDelete: (hotelId: number) => void;
  deleting: boolean;
}

function HotelAdmCard({ hotel, onEdit, onDelete, deleting }: Props) {
  return (
    <div className="card shadow-sm h-100">
      {/* Imagem de capa, se houver */}
      {hotel.medias && hotel.medias.length > 0 && (
        <img
          src={hotel.medias[0].mediaUrl}
          alt={hotel.name}
          className="card-img-top"
          style={{ objectFit: 'cover', height: 180 }}
        />
      )}
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <FaHotel className="me-2 text-primary" size={24} />
          <h5 className="card-title mb-0">{hotel.name}</h5>
        </div>
        {/* Estrelas */}
        <div className="mb-2">
          {[...Array(5)].map((_, i) =>
            i < hotel.starRating ? (
              <FaStar key={i} className="text-warning" />
            ) : (
              <FaRegStar key={i} className="text-warning" />
            )
          )}
          <span className="ms-2 text-muted">{hotel.starRating} estrelas</span>
        </div>
        <p className="mb-1"><strong>Cidade:</strong> {hotel.city}, {hotel.state}</p>
        <p className="mb-1"><strong>Endereço:</strong> {hotel.street}</p>
        <p className="mb-1"><strong>CNPJ:</strong> {hotel.cnpj}</p>
        <p className="mb-1"><strong>Status:</strong> {hotel.isActive ? 'Ativo' : 'Inativo'}</p>
        <p className="mb-1"><strong>Check-in:</strong> {hotel.checkInTime} <strong>Check-out:</strong> {hotel.checkOutTime}</p>
        <p className="mb-1"><strong>Telefone:</strong> {hotel.contactPhone}</p>
        <p className="mb-1"><strong>E-mail:</strong> {hotel.contactEmail}</p>
        <p className="mb-1"><strong>Descrição:</strong> {hotel.description}</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(hotel.hotelId)}
          >
            <FaEdit /> Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(hotel.hotelId)}
            disabled={deleting}
          >
            <FaTrash /> {deleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelAdmCard;