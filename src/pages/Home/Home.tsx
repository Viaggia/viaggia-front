import { useEffect, useState } from "react";
import PackageCard from "../../components/cards/PackageCard/PackageCard";
import CardCarousel from "../../components/carousels/CardCarousel/CardCarousel";
import TravelForm from "../../components/forms/TravelForm/TravelForm";
import { PackageDTO } from "../../types/Package";
import { getPackages } from "../../services/packageService";
import { HotelDTO } from "../../types/Hotel";
import { getHotels } from "../../services/hotelService";
import HotelCard from "../../components/cards/HotelCard/HotelCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";

function Home() {
  const [packages, setPackages] = useState<PackageDTO[]>([]);
  const [hotels, setHotels] = useState<HotelDTO[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error("Erro ao buscar pacotes:", error);
      }
    };

    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (error) {
        console.error("Erro ao buscar hotéis:", error);
      }
    };

    fetchPackages();
    fetchHotels();
  }, []);

  const backendUrl = import.meta.env.VITE_API_URL;

  const carouselPackages = packages.map((pkg) => ({
    packageId: pkg.packageId,
    titulo: pkg.name,
    destino: pkg.destination,
    descricao: pkg.description,
    preco: pkg.basePrice,
    imagem: pkg.medias[0] ? backendUrl + pkg.medias[0].mediaUrl : "/img/default.jpg",
    datas:
      pkg.packageDates.length > 0
        ? `${pkg.packageDates[0].startDate} até ${pkg.packageDates[0].endDate}`
        : "Datas não informadas",
  }));

  const carouselHotels = hotels.map((hotel) => {
    const menorPreco =
      hotel.roomTypes && hotel.roomTypes.length > 0
        ? Math.min(...hotel.roomTypes.map((rt) => rt.price))
        : null;

    return {
      hotelId: hotel.hotelId,
      titulo: hotel.name,
      imagem: hotel.medias[0]
        ? backendUrl + hotel.medias[0].mediaUrl
        : "/img/default.jpg",
      preco: menorPreco !== null ? menorPreco : null,
      descricao: hotel.description,
      estrelas: hotel.starRating,
      cidade: hotel.city,
    };
  });

  return (
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

        {/* Carrosséis com EmptyState */}
        <div className="mt-5 pt-3">
          {carouselPackages.length > 0 ? (
            <CardCarousel
              items={carouselPackages}
              CardComponent={PackageCard}
              text={"Pacotes Exclusivos"}
            />
          ) : (
            <EmptyState message="Nenhum pacote disponível no momento." />
          )}
          
          {carouselHotels.length > 0 ? (
            <CardCarousel
              items={carouselHotels}
              CardComponent={HotelCard}
              text={"Hospedagens Recomendadas"}
            />
          ) : (
            <EmptyState message="Nenhum hotel disponível no momento." />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
