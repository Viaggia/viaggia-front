import 'bootstrap/dist/css/bootstrap.min.css'

import { Carousel } from 'react-bootstrap';

function Details() {
  return (
    <section className="container-fluid mt-5">
      <div className="row">

        {/* Filtro lateral esquerdo */}
        <aside className="col-md-3 px-4">
          <h5 className="mb-3 fw-semibold">Filtrar destinos</h5>
          <select className="form-select mb-4">
            <option value="">Todos os destinos</option>
            <option value="PE">Praia dos Carneiros - PE</option>
            <option value="AL">Maragogi - AL</option>
            {/* Adicione mais opções conforme necessário */}
          </select>

          <h6 className="fw-semibold">Filtrar por valor</h6>
          <input
            type="range"
            className="form-range mt-2"
            min="200"
            max="500"
            step="10"
            defaultValue="350"
          />
          <span className="text-muted">Arraste para ajustar</span>
        </aside>

        {/* Cards alinhados à direita */}
        <div className="col-md-9">

          {[1, 2, 3].map((index) => (
            <div className="card mb-4 ms-md-auto" style={{ maxWidth: '600px', height: '280px' }} key={index}>
              <div className="row g-0 h-100">
                <div className="col-md-6">
                  <Carousel>
                    <Carousel.Item>
                      <img src="/img/foto1.jpg" className="d-block w-100 h-100 object-fit-cover" alt="..." />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src="/img/foto2.jpg" className="d-block w-100 h-100 object-fit-cover" alt="..." />
                    </Carousel.Item>
                    {/* Adicione mais imagens conforme desejar */}
                  </Carousel>
                </div>
                <div className="col-md-6 p-3 d-flex flex-column justify-content-between">
                  <h5 className="card-title">Título da hospedagem</h5>
                  <p className="card-text">Descrição breve do local e benefícios</p>
                  <h6 className="text-primary">R$ 320</h6>
                  <button className="btn btn-success mt-auto w-100">Conferir oferta</button>
                </div>
              </div>
            </div>
          ))}

          {/* Seção "Veja mais ofertas" */}
          <div className="mt-5">
            <h4 className="mb-4">Veja mais ofertas</h4>

            {[4, 5, 6].map((index) => (
              <div className="card mb-4 ms-md-auto" style={{ maxWidth: '600px', height: '280px' }} key={index}>
                <div className="row g-0 h-100">
                  <div className="col-md-6">
                    <Carousel>
                      <Carousel.Item>
                        <img src="/img/foto3.jpg" className="d-block w-100 h-100 object-fit-cover" alt="..." />
                      </Carousel.Item>
                      {/* Imagens aqui também */}
                    </Carousel>
                  </div>
                  <div className="col-md-6 p-3 d-flex flex-column justify-content-between">
                    <h5 className="card-title">Nova oferta</h5>
                    <p className="card-text">Explore outras opções incríveis</p>
                    <h6 className="text-primary">R$ 280</h6>
                    <button className="btn btn-success mt-auto w-100">Ver detalhes</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Details
