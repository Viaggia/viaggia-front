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
    <div>
      <div className="position-relative">
            {/* Imagem de fundo fixa */}
            <div
              className="hero-background"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "53vh",
                backgroundImage:
                  "url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/d0f4a590131921.5e0eb0ca39ce9.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            />
      
            {/* Conteúdo sobreposto */}
            <div
              className="container position-relative"
              style={{ paddingTop: "37vh", zIndex: 1 }}
            >
              <div>
                <h2 className="mb-4 text-center text-white fw-bold fs-1">
                  Escolha seu destino
                </h2>
                <div className="container bg-viaggia bg-opacity-100 rounded">
                  <TravelForm />
                </div>
              </div>
      
            </div>
          </div>
    
    <section className="container-fluid text-dark position-relative px-0">
      

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
  </div>
  );
}

export default Search;