import HospedagemCards from "../../components/cards/HospedagemCards/HospedagemCards"
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
   return (
    <section className="search-section text-white py-5" style={{ backgroundImage: 'url(/public/img/imgnav.jpg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container bg-dark bg-opacity-50 p-4 rounded">
        <h2 className="mb-4 text-center">Escolha seu destino</h2>
        <TravelForm />
        <CardCarousel items={hospedagens} CardComponent={PackageCard} />
         
      </div>
      
     
    </section>
  )
}
export default Home