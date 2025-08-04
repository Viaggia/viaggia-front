import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchHotels } from "../../services/hotelService";
import { HotelDTO } from "../../types/Hotel";
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';
import TravelForm from '../../components/forms/TravelForm/TravelForm';
import HotelCardList from '../../components/lists/HotelCardList/HotelCardList';

function SearchSection() {
   const location = useLocation();
  const [hotels, setHotels] = useState<HotelDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = location.state || {};

  useEffect(() => {
    if (searchParams && searchParams.city) {
      setLoading(true);
      searchHotels(searchParams)
        .then(setHotels)
        .catch(() => setHotels([]))
        .finally(() => setLoading(false));
    }
  }, [location.state]);

  return (
    <section className="container-fluid text-dark position-relative px-0">
      <section
        className="search-img text-white py-5 w-100 m-0"
        style={{
          backgroundImage: 'url(https://www.budgetair.ie/media/1253/flights-brazil-rio-de-janeiro.jpg?center=0.41,0.47&mode=crop&quality=75&width=1920&height=560&rnd=132211480730000000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '100vw',
        }}
      >
        <section
          className="search-section text-white py-5"
          style={{
            display: 'flex',
            justifyContent: 'center',

          }}
        >
          <div className="container bg-primary bg-opacity-100 p-4 rounded">
        <h2 className="mb-4 text-center">Escolha seu destino</h2>
        <TravelForm initialValues={searchParams} />
      </div>
        </section>
      </section>

      {/* 🎯 Filtros e cards de hotéis fora da área da imagem */}
      <div className="row gx-0 align-items-start mt-4 position-relative z-1">
        <div className="col-md-3 mt-4">
          <FiltersSection />
        </div>
        <div className="col-md-9">
          {loading ? <div>Carregando hotéis...</div> : <HotelCardList hotels={hotels} />}
        </div>
      </div>
    </section>
  );

}

export default SearchSection;
