import { HotelDTO } from '../../../types/Hotel';
import HotelCardSearch from '../../cards/HotelCardSearch/HotelCardSearch';

interface HotelCardListProps {
  hotels: HotelDTO[];
  error?: boolean;
}

function HotelCardList({ hotels, error }: HotelCardListProps) {
  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-muted">Nenhum hotel encontrado para os filtros selecionados.</h4>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex flex-column align-items-end">
      {hotels.map((hotel) => (
        <HotelCardSearch key={hotel.hotelId} hotel={hotel} />
      ))}
    </div>
  );
}

export default HotelCardList;