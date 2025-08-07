import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { searchHotels } from "../../services/hotelService";
import { HotelDTO, HotelSearchDTO } from "../../types/Hotel";
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';
import TravelForm from '../../components/forms/TravelForm/TravelForm';
import HotelCardList from '../../components/lists/HotelCardList/HotelCardList';
import { FiltrosProps } from "../../types/Filters";

function getRoomPrices(hotels: HotelDTO[]) {
  const prices: number[] = [];
  hotels.forEach(hotel => {
    hotel.roomTypes?.forEach(room => {
      if (typeof room.price === 'number') prices.push(room.price);
    });
  });
  return prices;
}

function filterHotels(hotels: HotelDTO[], filtros: FiltrosProps) {
  return hotels.filter(hotel => {
    // Preço
    const hasRoomInRange = hotel.roomTypes?.some(room =>
      room.price >= filtros.precoMin && room.price <= filtros.precoMax
    );
    if (!hasRoomInRange) return false;

    // Refeições
    if (filtros.cafe && !hotel.commodities?.some(c => c.hasBreakfast)) return false;
    if (filtros.almoco && !hotel.commodities?.some(c => c.hasLunch)) return false;
    if (filtros.jantar && !hotel.commodities?.some(c => c.hasDinner)) return false;

    // Comodidades
    if (filtros.acessibilidade && !hotel.commodities?.some(c => c.hasAccessibilityFeatures)) return false;
    if (filtros.academia && !hotel.commodities?.some(c => c.hasGym)) return false;
    if (filtros.arcondicionado && !hotel.commodities?.some(c => c.hasAirConditioning)) return false;
    if (filtros.cancelamento && !hotel.isActive) return false;
    if (filtros.estacionamento && !hotel.commodities?.some(c => c.hasParking)) return false;
    if (filtros.petfriendly && !hotel.commodities?.some(c => c.isPetFriendly)) return false;
    if (filtros.piscina && !hotel.commodities?.some(c => c.hasPool)) return false;
    if (filtros.SPA && !hotel.commodities?.some(c => c.hasSpa)) return false;
    if (filtros.wifi && !hotel.commodities?.some(c => c.hasWiFi)) return false;

    return true;
  });
}

function Search() {
  const location = useLocation();
  const [hotels, setHotels] = useState<HotelDTO[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams.entries()]);

  const [minPreco, setMinPreco] = useState(30);
  const [maxPreco, setMaxPreco] = useState(50000);

  const hotelSearchParams: HotelSearchDTO = {
    city: params.city || '',
    checkInDate: params.checkInDate || '',
    checkOutDate: params.checkOutDate || '',
    numberOfPeople: params.numberOfPeople ? Number(params.numberOfPeople) : 1,
    numberOfRooms: params.numberOfRooms ? Number(params.numberOfRooms) : 1,
  };

  // Estado dos filtros (apenas campos válidos)
  const [filtros, setFiltros] = useState<FiltrosProps>({
    precoMin: 30,
    precoMax: 50000,
    cafe: false,
    almoco: false,
    jantar: false,
    cancelamento: false,
    estacionamento: false,
    SPA: false,
    piscina: false,
    academia: false,
    wifi: false,
    arcondicionado: false,
    acessibilidade: false,
    petfriendly: false,
  });

  // Atualiza os hotéis e inicializa o filtro de preço
  useEffect(() => {
    if (hotelSearchParams.city) {
      setLoading(true);
      setError(false);
      setHotels([]);
      searchHotels(hotelSearchParams)
        .then((result) => {
          setHotels(result);
          setError(result.length === 0);

          // Inicializa o filtro de preço com base nos quartos recebidos
          const prices = getRoomPrices(result);
          if (prices.length > 0) {
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setMinPreco(min);
            setMaxPreco(max);
            setFiltros(f => ({
              ...f,
              precoMin: min,
              precoMax: max,
            }));
          }
        })
        .catch(() => {
          setHotels([]);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams.toString(), searchKey]);

  // Aplica os filtros sempre que hotéis ou filtros mudam
  useEffect(() => {
    setFilteredHotels(filterHotels(hotels, filtros));
  }, [hotels, filtros]);

  // Função para ser passada para o TravelForm
  const handleSearch = useCallback(() => {
    setSearchKey((prev) => prev + 1);
  }, []);

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
        <div className="row gx-0 align-items-start mt-4 position-relative z-1">
          <div className="col-md-3 mt-4">
            <FiltersSection
              filtros={filtros}
              setFiltros={setFiltros}
              minPreco={minPreco}
              maxPreco={maxPreco}
            />
          </div>
          <div className="col-md-9">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : (
              <HotelCardList hotels={filteredHotels} error={error} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;