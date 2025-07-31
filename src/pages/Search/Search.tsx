import 'bootstrap/dist/css/bootstrap.min.css';
import HotelCards from '../../components/cards/HotelCard/HotelCard';
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';
import TravelForm from '../../components/forms/TravelForm/TravelForm';

function SearchSection() {
  return (
    <section className="container-fluid text-dark pt-5 position-relative">

      {/* 🌄 Imagem de fundo visível apenas atrás do formulário */}
      <div
        className="position-absolute text-white w-100 start-0"
        style={{
          height: '300px', // altura controlada
          backgroundImage: 'url(/img/imgnav.jpg.jpg)', // caminho relativo à pasta public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          top: 0,
          zIndex: 0 // imagem por trás
        }}
      />

      {/* 🧳 Formulário sobreposto, mantendo o estilo */}
      <div className="container position-relative z-1 bg-dark bg-opacity-50 p-4 rounded mb-5">
        <div className="container mb-3 text-center">
          <h4 className="mb-3 text-light">Buscar hotéis</h4>
          <div className="d-flex justify-content-center">
            <TravelForm />
          </div>
        </div>
      </div>

      {/* 🎯 Filtros e cards de hotéis fora da área da imagem */}
      <div className="row px-4 align-items-start mt-4 position-relative z-1">
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
