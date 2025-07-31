import PackageCard from "../../components/cards/PackageCard/PackageCard"
import CardCarousel from "../../components/carousels/CardCarousel/CardCarousel"
import TravelForm from "../../components/forms/TravelForm/TravelForm"
import PacoteCardPagamento from "../../components/cards/PackageDirectPayment/PackageDirectPayment"

const hospedagens = [
  {
    titulo: 'Praia dos Carneiros - PE',
    imagem: '/img/hotelmar.jpg',
    preco: 'R$ 320',
  },
  {
    titulo: 'Maragogi - AL',
    imagem: '/img/praia2.jpg',
    preco: 'R$ 280',
  },
  {
    titulo: 'Jericoacoara - CE',
    imagem: '/img/hotelmar.jpg',
    preco: 'R$ 350',
  },
  {
    titulo: 'Porto de Galinhas - PE',
    imagem: '/img/vistahotel.jpg',
    preco: 'R$ 300',
  },
  {
    titulo: 'Pipa - RN',
    imagem: '/img/praia2.jpg',
    preco: 'R$ 270',
  },
  {
    titulo: 'São Miguel do Gostoso - RN',
    imagem: '/img/vistahotel.jpg',
    preco: 'R$ 290',
  },
]

const pacotes = [
  {
    titulo: 'Praia dos Carneiros - PE',
    imagem: '/img/hotelmar.jpg',
    PackageId: 1,
    RoomTypeId: 2,
    HotelID: 10,
    NumberGuests: 2,
    CheckInDate: new Date('2025-08-01'),
    CheckOutDate: new Date('2025-08-02'),
    TotalPrice: '640',
  },
  {
    titulo: 'Maragogi - AL',
    imagem: '/img/praia2.jpg',
    PackageId: 2,
    RoomTypeId: 1,
    HotelID: 12,
    NumberGuests: 2,
    CheckInDate: new Date('2025-08-05'),
    CheckOutDate: new Date('2025-08-06'),
    TotalPrice: '560.00',
  },
  {
    titulo: 'Jericoacoara - CE',
    imagem: '/img/hotelmar.jpg',
    PackageId: 3,
    RoomTypeId: 2,
    HotelID: 14,
    NumberGuests: 2,
    CheckInDate: new Date('2025-08-10'),
    CheckOutDate: new Date('2025-08-11'),
    TotalPrice: '700.00',
  },
  {
    titulo: 'Pipa - RN',
    imagem: '/img/praia2.jpg',
    PackageId: 4,
    RoomTypeId: 1,
    HotelID: 15,
    NumberGuests: 2,
    CheckInDate: new Date('2025-08-15'),
    CheckOutDate: new Date('2025-08-16'),
    TotalPrice: '580.00',
  },
]


function Home() {
  const promotions = [
    {
      title: 'Desconto no Nordeste',
      description: 'Pacotes incríveis com até 50% OFF!',
      imageUrl: '/public/img/hotelquarto.jpg',
      price: 'R$ 899,90',
    },
    {
      title: 'Explore o Sul',
      description: 'Paisagens encantadoras e preços especiais!',
      imageUrl: '/public/img/hotelmar.jpg',
      price: '1299,00',
    },
    {
      title: 'Promoção Relâmpago',
      description: 'Voe já com até 60% de desconto!',
      imageUrl: '/public/img/relampago.jpg',
      price: 'R$ 499,90',
    },
  ];


  return (
    <section
      className="search-section text-white py-5"
      style={{
        backgroundImage: 'url(/public/img/imgnav.jpg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container bg-dark bg-opacity-50 p-4 rounded">
        <h2 className="mb-4 text-center">Escolha seu destino</h2>
        <TravelForm />
        <CardCarousel items={hospedagens} CardComponent={PackageCard} />
        <CardCarousel items={pacotes} CardComponent={PacoteCardPagamento} />
      </div>
    </section>
  );
}

export default Home;
