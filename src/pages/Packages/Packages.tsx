import 'bootstrap/dist/css/bootstrap.min.css'
import PackageCard from '../../components/cards/PackageCard/PackageCard'
import CardPackages from '../../components/ListPackages/CardPackages' 
import TravelForm from '../../components/forms/TravelForm/TravelForm'


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
  return (
    <>
    <div>
    <section
      className="search-section text-white py-5"
      style={{
        backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/d0f4a590131921.5e0eb0ca39ce9.jpg)',
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
        <div className="container bg-viaggia bg-opacity-100 p-4 rounded">
          <h2 className="mb-4 text-center">Escolha seu destino</h2>
          <TravelForm/>
        </div>
      </section>

    </section>
    <div>
      <CardPackages items={pacotes} CardComponent={PackageCard} text={"Pacotes de viagem"} />
    </div>
    </div>
    </>
  )
}

export default Packages
