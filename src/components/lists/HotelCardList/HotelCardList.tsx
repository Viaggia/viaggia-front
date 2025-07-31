import { HotelDTO } from '../../../types/Hotel';
import HotelCardSearch from '../../cards/HotelCardSearch/HotelCardSearch';

interface HotelCardListProps {
  hotels: HotelDTO[];
}

function HotelCardList({ hotels }: HotelCardListProps) {
  return (
    <div className="container py-5 d-flex flex-column align-items-end">
      {hotels.map((hotel) => (
        <HotelCardSearch key={hotel.hotelId} hotel={hotel} />
      ))}
    </div>
  );
}

export default HotelCardList;