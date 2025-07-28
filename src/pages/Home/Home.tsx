import HospedagemCards from "../../components/cards/HospedagemCards/HospedagemCards";
import TravelForm from "../../components/forms/TravelForm/TravelForm";
import PromotionCard from "../../components/cards/Promotion/PromotionCard"; // ajuste conforme o seu caminho

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
        <HospedagemCards />

        {/* Promoções */}
        <div className="mt-5">
          <h3 className="text-white mb-4 text-center">Promoções em Destaque</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {promotions.map((promo, index) => (
              <div className="col" key={index}>
                <PromotionCard {...promo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
