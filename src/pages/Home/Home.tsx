import { useEffect, useState } from "react";
import PackageCard from "../../components/cards/PackageCard/PackageCard"
import PromotionCard from "../../components/cards/PromotionCard/PromotionCard";
import CardCarousel from "../../components/carousels/CardCarousel/CardCarousel"
import TravelForm from "../../components/forms/TravelForm/TravelForm"
import { PackageDTO } from "../../types/Package";
import { getPackages } from "../../services/packageService";
import { HotelDTO } from "../../types/Hotel";
import { getHotels } from "../../services/hotelService";
import HotelCard from "../../components/cards/HotelCard/HotelCard";

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

  const backendUrl = import.meta.env.VITE_API_URL;

  console.log("hotels, ", hotels)

  const carouselPackages = packages.map((pkg) => ({
    packageId: pkg.packageId,
    titulo: pkg.name,
    destino: pkg.destination,
    descricao: pkg.description,
    preco: pkg.basePrice,
    imagem: pkg.medias[0] ? backendUrl + pkg.medias[0].mediaUrl : '/img/default.jpg',
    datas: pkg.packageDates.length > 0
      ? `${pkg.packageDates[0].startDate} até ${pkg.packageDates[0].endDate}`
      : 'Datas não informadas',
  }));

  const carouselHotels = hotels.map((hotel) => {
    const menorPreco = hotel.roomTypes && hotel.roomTypes.length > 0
      ? Math.min(...hotel.roomTypes.map(rt => rt.price))
      : null;

    return {
      hotelId: hotel.hotelId,
      titulo: hotel.name,
      imagem: hotel.medias[0]
        ? backendUrl + hotel.medias[0].mediaUrl
        : '/img/default.jpg',
      preco: menorPreco !== null
        ? menorPreco
        : null,
      descricao: hotel.description,
      estrelas: hotel.starRating,
      cidade: hotel.city,
    };
  });


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
    <div>
    <section
      className="search-section text-white py-5"
      style={{
        backgroundImage: 'url(https://www.budgetair.ie/media/1253/flights-brazil-rio-de-janeiro.jpg?center=0.41,0.47&mode=crop&quality=75&width=1920&height=560&rnd=132211480730000000)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
          <TravelForm />
        </div>
      </section>

    </section>
    <div>
      <CardCarousel items={carouselPackages} CardComponent={PackageCard} text={"Pacotes Exclusivos"} />
        <CardCarousel items={carouselHotels} CardComponent={HotelCard} text={"Hospedagens Recomendadas"} />
    </div>
    </div>
    
  );
}

export default Home;
