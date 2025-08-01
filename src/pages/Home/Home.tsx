import { useEffect, useState } from "react";
import PackageCard from "../../components/cards/PackageCard/PackageCard"
import PromotionCard from "../../components/cards/PromotionCard/PromotionCard";
import CardCarousel from "../../components/carousels/CardCarousel/CardCarousel"
import TravelForm from "../../components/forms/TravelForm/TravelForm"
import { PackageDTO } from "../../types/Package";
import { getPackages } from "../../services/packageService";
import { HotelDTO } from "../../types/Hotel";
import { getHotels } from "../../services/hotelService";
import HotelCardHome from "../../components/cards/HotelCard/HotelCard";

function Home() {

  const [packages, setPackages] = useState<PackageDTO[]>([]);
  const [hotels, setHotels] = useState<HotelDTO[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error('Erro ao buscar pacotes:', error);
      }
    };


    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
      }
    };

    fetchPackages();
    fetchHotels();

  }, []);

  const carouselPackages = packages.map((pkg) => ({

    titulo: pkg.name,
    imagem: pkg.medias[0]?.mediaUrl || '/img/default.jpg',
    preco: `R$ ${pkg.basePrice.toFixed(2)}`,
  }));

  const carouselHotels = hotels.map((hotel) => ({
    titulo: hotel.name,
    imagem: hotel.medias[0]?.mediaUrl || '/img/default.jpg',
    preco: hotel.roomTypes[0]?.price
      ? `R$ ${hotel.roomTypes[0].price.toFixed(2)}`
      : 'Preço indisponível',
  }));



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
        <CardCarousel items={carouselPackages} CardComponent={PackageCard} text={"Pacotes Exclusivos"} />
        <CardCarousel items={carouselHotels} CardComponent={HotelCardHome} text={"Hospedagens Recomendadas"} />

      </div>
    </section>
  );
}

export default Home;
