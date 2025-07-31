import 'bootstrap/dist/css/bootstrap.min.css';
import FiltersSection from '../../components/Filters/FiltersSection/FiltersSection';
import TravelForm from '../../components/forms/TravelForm/TravelForm';
import HotelCardList from '../../components/lists/HotelCardList/HotelCardList';

function SearchSection() {



  const hotels = [
    {
      hotelId: 1,
      name: 'Café & Vista',
      description: 'Comece o dia com um café incrível e vista para o mar.',
      starRating: 4,
      medias: [
        { mediaId: 1, mediaUrl: '/img/coffemanha.jpg', mediaType: 'image' },
        { mediaId: 2, mediaUrl: '/img/hotelmar.jpg', mediaType: 'image' },
      ],
      roomTypes: [
        { roomTypeId: 1, name: 'Standard', price: 320, capacity: 2, bedType: 'Casal', hotelId: 1, isActive: true },
      ],
      hotelDates: [],
      addresses: [],
      reviews: [],
      packages: [],
      averageRating: 4.5,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      contactPhone: '81 99999-9999',
      contactEmail: 'contato@cafevista.com',
      isActive: true,
    },
    {
      hotelId: 2,
      name: 'Quarto com conforto',
      description: 'Relaxe em um quarto planejado para seu descanso.',
      starRating: 3,
      medias: [
        { mediaId: 3, mediaUrl: '/img/hotelquarto.jpg', mediaType: 'image' },
      ],
      roomTypes: [
        { roomTypeId: 2, name: 'Confort', price: 280, capacity: 2, bedType: 'Solteiro', hotelId: 2, isActive: true },
      ],
      hotelDates: [],
      addresses: [],
      reviews: [],
      packages: [],
      averageRating: 4.2,
      checkInTime: '13:00',
      checkOutTime: '11:00',
      contactPhone: '81 98888-8888',
      contactEmail: 'contato@conforto.com',
      isActive: true,
    },
    {
      hotelId: 3,
      name: 'Natureza & Luxo',
      description: 'Vista deslumbrante aliada a uma experiência sofisticada.',
      starRating: 5,
      medias: [
        { mediaId: 4, mediaUrl: '/img/hotelvista.jpg', mediaType: 'image' },
        { mediaId: 5, mediaUrl: '/img/hotelluxo.jpg', mediaType: 'image' },
      ],
      roomTypes: [
        { roomTypeId: 3, name: 'Luxo', price: 350, capacity: 2, bedType: 'King', hotelId: 3, isActive: true },
      ],
      hotelDates: [],
      addresses: [],
      reviews: [],
      packages: [],
      averageRating: 4.8,
      checkInTime: '15:00',
      checkOutTime: '12:00',
      contactPhone: '81 97777-7777',
      contactEmail: 'luxo@natureza.com',
      isActive: true,
    },
    {
      hotelId: 4,
      name: 'Diversão em família',
      description: 'Hospedagem perfeita para crianças e diversão.',
      starRating: 4,
      medias: [
        { mediaId: 6, mediaUrl: '/img/hotelkids.jpg', mediaType: 'image' },
      ],
      roomTypes: [
        { roomTypeId: 4, name: 'Familiar', price: 400, capacity: 4, bedType: 'Casal + Beliche', hotelId: 4, isActive: true },
      ],
      hotelDates: [],
      addresses: [],
      reviews: [],
      packages: [],
      averageRating: 4.6,
      checkInTime: '14:00',
      checkOutTime: '11:00',
      contactPhone: '81 96666-6666',
      contactEmail: 'familia@diversao.com',
      isActive: true,
    },
    {
      hotelId: 5,
      name: 'Refresco & Piscina',
      description: 'Relaxe em uma piscina rodeada de tranquilidade.',
      starRating: 3,
      medias: [
        { mediaId: 7, mediaUrl: '/img/hotelpiscina.jpg', mediaType: 'image' },
      ],
      roomTypes: [
        { roomTypeId: 5, name: 'Piscina', price: 300, capacity: 2, bedType: 'Casal', hotelId: 5, isActive: true },
      ],
      hotelDates: [],
      addresses: [],
      reviews: [],
      packages: [],
      averageRating: 4.0,
      checkInTime: '13:00',
      checkOutTime: '11:00',
      contactPhone: '81 95555-5555',
      contactEmail: 'piscina@refresco.com',
      isActive: true,
    },
    {
      hotelId: 6,
      name: 'Praia exclusiva',
      description: 'Acorde com o som das ondas em um lugar paradisíaco.',
      starRating: 5,
      medias: [
        { mediaId: 8, mediaUrl: '/img/hotelmar.jpg', mediaType: 'image' },
      ],
      roomTypes: [
        { roomTypeId: 6, name: 'Beira-mar', price: 420, capacity: 2, bedType: 'Queen', hotelId: 6, isActive: true },
      ],
      hotelDates: [],
      addresses: [],
      reviews: [],
      packages: [],
      averageRating: 4.9,
      checkInTime: '15:00',
      checkOutTime: '12:00',
      contactPhone: '81 94444-4444',
      contactEmail: 'praia@exclusiva.com',
      isActive: true,
    },
  ];


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

          <HotelCardList hotels={hotels} />

        </div>
      </div>
      
    </section>
  );
}

export default SearchSection;
