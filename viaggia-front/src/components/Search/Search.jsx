import 'bootstrap/dist/css/bootstrap.min.css'

function SearchSection() {
  return (
    <section className="search-section text-white py-5" style={{ backgroundImage: 'url(/public/img/imgnav.jpg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container bg-dark bg-opacity-50 p-4 rounded">
        <h2 className="mb-4 text-center">Escolha seu destino</h2>

        <form className="row g-3">
          {/* Destino */}
          <div className="col-md-2">
            <label className="form-label">Destino</label>
            <input type="text" className="form-control" placeholder="Digite o destino" />
          </div>

          {/* Data de Check-in */}
          <div className="col-md-2">
            <label className="form-label">Check-in</label>
            <input type="date" className="form-control" />
          </div>

          {/* Data de Check-out */}
          <div className="col-md-2">
            <label className="form-label">Check-out</label>
            <input type="date" className="form-control" />
          </div>

          {/* Adultos */}
          <div className="col-md-1">
            <label className="form-label">Adultos</label>
            <input type="number" className="form-control" min="1" defaultValue={1} />
          </div>

          {/* Crianças */}
          <div className="col-md-1">
            <label className="form-label">Crianças</label>
            <input type="number" className="form-control" min="0" defaultValue={0} />
          </div>

          {/* Quartos */}
          <div className="col-md-1">
            <label className="form-label">Quartos</label>
            <input type="number" className="form-control" min="1" defaultValue={1} />
          </div>

          {/* Botão de busca */}
          <div className="col-6 text-center mt-3">
            <button type="submit" className="btn btn-primary">Buscar</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SearchSection
