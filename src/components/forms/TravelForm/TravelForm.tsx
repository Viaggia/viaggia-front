import { useNavigate } from "react-router-dom";

export default function TravelForm() {

  
const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };


  return (
    <form className="row g-3 d-flex justify-content-center p-3 rounded" onSubmit={handleSubmit}>
      {/* Destino */}
      <div className="col-md-2">
        <label className="form-label text-white">Destino</label>
        <input type="text" className="form-control" placeholder="Digite o destino" />
      </div>

      {/* Data de Check-in */}
      <div className="col-md-2">
        <label className="form-label text-white">Check-in</label>
        <input type="date" className="form-control" />
      </div>

      {/* Data de Check-out */}
      <div className="col-md-2">
        <label className="form-label text-white">Check-out</label>
        <input type="date" className="form-control" />
      </div>

      {/* Adultos */}
      <div className="col-md-1">
        <label className="form-label text-white">Adultos</label>
        <input type="number" className="form-control" min="1" defaultValue={1} />
      </div>

      {/* Crianças */}
      <div className="col-md-1">
        <label className="form-label text-white">Crianças</label>
        <input type="number" className="form-control" min="0" defaultValue={0} />
      </div>

      {/* Quartos */}
      <div className="col-md-1">
        <label className="form-label text-white">Quartos</label>
        <input type="number" className="form-control" min="1" defaultValue={1} />
      </div>

      {/* Botão de busca */}
      <div className="col-md-1 d-flex align-items-end">
        <button type="submit" className="btn btn-info botao-buscar-grande px-4">Buscar</button>
      </div>
    </form>
  );
}
