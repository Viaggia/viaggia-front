import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { searchHotels } from "../../services/hotelService";
import { HotelDTO, HotelSearchDTO } from "../../types/Hotel";
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';
import TravelForm from '../../components/forms/TravelForm/TravelForm';
import HotelCardList from '../../components/lists/HotelCardList/HotelCardList';

function Search() {
  const location = useLocation();
  const [hotels, setHotels] = useState<HotelDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams.entries()]);

  const hotelSearchParams: HotelSearchDTO = {
    city: params.city || '',
    checkInDate: params.checkInDate || '',
    checkOutDate: params.checkOutDate || '',
    numberOfPeople: params.numberOfPeople ? Number(params.numberOfPeople) : 1,
    numberOfRooms: params.numberOfRooms ? Number(params.numberOfRooms) : 1,
  };

  const initialValues = {
    city: params.city || '',
    checkInDate: params.checkInDate || '',
    checkOutDate: params.checkOutDate || '',
    numberOfPeople: params.numberOfPeople ? Number(params.numberOfPeople) : undefined,
    numberOfRooms: params.numberOfRooms ? Number(params.numberOfRooms) : undefined,
    children: params.children ? Number(params.children) : undefined,
  };

  // Função para ser passada para o TravelForm
  const handleSearch = useCallback(() => {
    setSearchKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (hotelSearchParams.city) {
      setLoading(true);
      setError(false);
      setHotels([]);
      searchHotels(hotelSearchParams)
        .then((result) => {
          setHotels(result);
          setError(result.length === 0);
        })
        .catch(() => {
          setHotels([]);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams.toString(), searchKey]);

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
            <TravelForm initialValues={initialValues} onSearch={handleSearch} />
          </div>
        </section>
      </section>

      {/* 🎯 Filtros e cards de hotéis fora da área da imagem */}
      <div className="row gx-0 align-items-start mt-4 position-relative z-1">
        <div className="col-md-3 mt-4">
          <FiltersSection />
        </div>
        <div className="col-md-9">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : (
            <HotelCardList hotels={hotels} error={error} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Search;