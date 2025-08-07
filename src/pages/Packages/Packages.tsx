import 'bootstrap/dist/css/bootstrap.min.css'
import PackageCard from '../../components/cards/PackageCard/PackageCard'
import CardPackages from '../../components/ListPackages/CardPackages' 
import { PackageDTO } from '../../types/Package'
import { useEffect, useState } from 'react'
import { getPackages } from '../../services/packageService'
import TravelFormPackeges from '../../components/forms/TravelForm/TravelFormPackages'


const pacotes = [
  {
    titulo: 'Férias em Fernando de Noronha - PE',
    imagem: 'https://tse2.mm.bing.net/th/id/OIP.cqlmSi15LKX4OJof7v88bgHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    preco: 'R$ 1.200',
  },
  {
    titulo: 'Pacote Amazônia - AM',
    imagem: '/img/amazonia.jpg',
    preco: 'R$ 950',
  },
  {
    titulo: 'Tour Pantanal - MT',
    imagem: '/img/pantanal.jpg',
    preco: 'R$ 890',
  },
  {
    titulo: 'Chapada Diamantina - BA',
    imagem: '/img/chapada.jpg',
    preco: 'R$ 780',
  },
  {
    titulo: 'Lençóis Maranhenses - MA',
    imagem: '/img/lencois.jpg',
    preco: 'R$ 1.050',
  },
  {
    titulo: 'Bonito - MS',
    imagem: '/img/bonito.jpg',
    preco: 'R$ 970',
  },
  {
    titulo: 'Ilha Grande - RJ',
    imagem: '/img/ilhagrande.jpg',
    preco: 'R$ 820',
  },
  {
    titulo: 'Serra Gaúcha - RS',
    imagem: '/img/serragaucha.jpg',
    preco: 'R$ 880',
  },
  {
    titulo: 'Cataratas do Iguaçu - PR',
    imagem: '/img/cataratas.jpg',
    preco: 'R$ 910',
  },
]



function Packages() {
  const [packages, setPackages] = useState<PackageDTO[]>([]);
  
  const backendUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
      const fetchPackages = async () => {
        try {
          const data = await getPackages();
          setPackages(data);
        } catch (error) {
          console.error("Erro ao buscar pacotes:", error);
        }
      };
  
      fetchPackages();
    }, []);


  const cardsPackages = packages.map((pkg) => ({
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


  return (
    <>
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
                      <TravelFormPackeges />
                    </div>
                  </div>
          
                </div>
              </div>
    <div>
      <CardPackages items={cardsPackages} CardComponent={PackageCard} text={"Pacotes de viagem"} />
    </div>
    </div>
    </>
  )
}

export default Packages
