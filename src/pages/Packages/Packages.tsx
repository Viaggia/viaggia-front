import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const pacotes = [
  {
    titulo: 'Férias em Fernando de Noronha - PE',
    imagem: '/img/noronha.jpg',
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
      <h2 className="text-center mb-4 mt-4">Pacotes de viagem imperdíveis</h2>

      <section className="container py-5">
        <div className="row">
          {pacotes.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img src={item.imagem} className="card-img-top" alt={item.titulo} />
                <div className="card-body">
                  <h5 className="card-title">{item.titulo}</h5>
                  <p className="card-text">Pacote completo por pessoa</p>
                  <h2 className="text-primary">{item.preco}</h2>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    *Taxas e impostos não inclusos
                  </p>
                  <Link to="/details" className="btn btn-success w-100">
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Packages
