import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const services = [
  'Passeio de Buggy', 'Almoço', 'Janta ou Café da Manhã', 'Passeio Turístico',
  'Wi-Fi grátis', 'Aceita animais', 'Tem piscina', 'Sala de jogo', 'Spa',
  'Academia', 'Estacionamento', 'Acessibilidade'
];

const pricePerNight = 200;
const serviceValues: { [key: string]: number } = {
  'Passeio de Buggy': 150,
  'Almoço': 50,
  'Janta ou Café da Manhã': 40,
  'Passeio Turístico': 120,
  'Wi-Fi grátis': 0,
  'Aceita animais': 0,
  'Tem piscina': 0,
  'Sala de jogo': 30,
  'Spa': 90,
  'Academia': 40,
  'Estacionamento': 20,
  'Acessibilidade': 0,
};

const AdditionalServicesCard: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const handleServiceChange = (service: string, isChecked: boolean) => {
    setSelectedServices(prev =>
      isChecked ? [...prev, service] : prev.filter(s => s !== service)
    );
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = calculateNights(checkIn, checkOut);
      const extras = selectedServices.reduce(
        (acc, cur) => acc + (serviceValues[cur] || 0),
        0
      );
      setTotalPrice(nights * pricePerNight + extras);
    } else {
      setTotalPrice(null);
    }
  }, [checkIn, checkOut, selectedServices]);

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const cardStyle = {
    backgroundColor: '#e0f0ff',
    border: '1px solid #a5c9ea',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
  };

  const titleStyle = {
    color: '#000000ff',
  };

  return (
    <div className="container my-4">
      
      {/* Datas */}
      <div style={cardStyle} className="mb-3">
        <h5 style={titleStyle}>Selecione suas datas</h5>
        <div className="row mb-2">
          <div className="col-md-6">
            <label>Check-in:</label>
            <input type="date" className="form-control" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label>Check-out:</label>
            <input type="date" className="form-control" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
        </div>
        <p className="text-muted mt-2">
          Cancelamentos com pelo menos uma semana de antecedência terão reembolso integral. 
          Após isso, apenas 50% será reembolsado.
        </p>
      </div>

      {/* Card de serviços adicionais */}
      <div style={cardStyle}>
        <h5 style={titleStyle}>Serviços Adicionais</h5>
        <form>
          <div className="row">
            {services.map((service, index) => (
              <div className="col-md-6" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`service${index}`}
                    onChange={e => handleServiceChange(service, e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={`service${index}`}>
                    {service}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>

      {/* Valor total + botão */}
      {totalPrice !== null && (
        <div className="mt-4 text-end">
          <h5 style={titleStyle}>Total: R$ {totalPrice.toFixed(2)}</h5>
          <button className="btn btn-primary mt-2">Confirmar Compra</button>
        </div>
      )}
    </div>
  );
};

export default AdditionalServicesCard;
