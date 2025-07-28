import PackageCard from "../../components/cards/PackageCard/PackageCard"
import CardCarousel from "../../components/carousels/CardCarousel/CardCarousel"
import TravelForm from "../../components/forms/TravelForm/TravelForm"


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
      price: 'R$ 1.299,00',
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
         
      </div>
    </section>
  );
}

export default Home;
