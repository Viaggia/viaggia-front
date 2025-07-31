import 'bootstrap/dist/css/bootstrap.min.css';
import HotelCards from '../../components/cards/HotelCard/HotelCard';
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';
import TravelForm from '../../components/forms/TravelForm/TravelForm'; // ajuste o path se necessário

function SearchSection() {
  return (
    <section
      className="container-fluid text-dark py-5"
      style={{ backgroundImage: 'url(/public/img/imgnav.jpg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* 🧳 TravelForm centralizado */}
      <div className="container bg-dark bg-opacity-50 p-4 rounded">
      <div className="container mb-3 text-center">
        <h4 className="mb-3">Buscar hotéis</h4>
        <div className="d-flex justify-content-center">
          <TravelForm />
        </div>
      </div>
      </div>

      {/* Cards e filtros alinhados */}
      <div className="row px-4 align-items-start mt-4">
        <div className="col-md-3 mt-4">
          <FiltersSection />
        </div>
        <div className="col-md-9">
          <HotelCards />
        </div>
      </div>
    </section>
  );
}

export default SearchSection;