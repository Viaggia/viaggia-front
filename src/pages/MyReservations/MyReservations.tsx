import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyReservations.css';

interface Reservation {
  id: string;
  titular: string;
  telefone: string;
  cpf: string;
  hotel: string;
  endereco: string;
  datas: string;
  quarto: string;
  servicos: string[];
  valoresServicos: number;
}

const reservas: Reservation[] = [
  {
    id: 'reserva1',
    titular: 'João Silva',
    telefone: '(81) 91234-5678',
    cpf: '123.456.789-00',
    hotel: 'Chalés do Sul',
    endereco: 'Rua das Montanhas, 123 - Gramado, RS',
    datas: '05 a 08 de Agosto de 2025',
    quarto: 'Chalé 07',
    servicos: ['Café da manhã (+R$40/dia)', 'Massagem (+R$120)'],
    valoresServicos: 240,
  },
];

const diaria = 200;

const MyReservations: React.FC = () => {
  const [detalheAberto, setDetalheAberto] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleDetalhes = (id: string) => {
    setDetalheAberto(detalheAberto === id ? null : id);
  };

  return (
    <div className="reservepag-container">
      <h2 className="reservepag-title">Minhas Reservas</h2>

      {reservas.map((reserva) => {
        const totalDiarias = 3 * diaria;
        const totalCompra = totalDiarias + reserva.valoresServicos;

        return (
          <div className="reservepag-card" key={reserva.id}>
            <button className="reservepag-toggle" onClick={() => toggleDetalhes(reserva.id)}>
              <span className="reservepag-toggle-text">Reserva - {reserva.hotel}</span>
              <span className="reservepag-seta">▼</span>
            </button>

            {detalheAberto === reserva.id && (
              <div className="reservepag-detalhes">
                <p><strong>Nome do Titular:</strong> {reserva.titular}</p>
                <p><strong>Telefone:</strong> {reserva.telefone}</p>
                <p><strong>CPF:</strong> {reserva.cpf}</p>
                <p><strong>Hotel:</strong> {reserva.hotel}</p>
                <hr />
                <p><strong>Endereço:</strong> {reserva.endereco}</p>
                <p><strong>Datas Reservadas:</strong> {reserva.datas}</p>
                <p><strong>Quarto:</strong> {reserva.quarto}</p>
                <p><strong>Serviços Adicionais:</strong> {reserva.servicos.join(', ')}</p>
                <p><strong>Resumo de Compra:</strong></p>
                <ul>
                  <li>Diária (3 noites): R${totalDiarias}</li>
                  <li>Serviços: R${reserva.valoresServicos}</li>
                  <li><strong>Total:</strong> R${totalCompra}</li>
                </ul>

                <div className="reservepag-cancel-wrapper">
                  <button className="reservepag-cancelar" onClick={() => navigate('/cancellationpag')}>
                    Cancelar minha reserva
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="reservepag-whatsapp">
        <a href="https://wa.me/558196631476" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="reservepag-whatsapp-icon"
          />
        </a>
      </div>
    </div>
  );
};

export default MyReservations;
