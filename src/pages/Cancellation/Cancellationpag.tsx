import React, { useState } from 'react';
import './cancellationpag.css';

const CancellationPag: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const reserva = {
    titular: 'João Silva',
    cpf: '123.456.789-00',
    hotel: 'Chalés do Sul',
    datas: '05 a 08 de Agosto de 2025',
    valorTotal: 840,
  };

  const handleCancelClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000); // 5 segundos
  };

  return (
    <div className="cancellationpag-container">
      <h2>Confirmar Cancelamento</h2>

      <div className="cancellationpag-info">
        <p><strong>Nome do Titular:</strong> {reserva.titular}</p>
        <p><strong>CPF:</strong> {reserva.cpf}</p>
        <p><strong>Hotel:</strong> {reserva.hotel}</p>
        <p><strong>Data da Reserva:</strong> {reserva.datas}</p>
      </div>

      <div className="cancellationpag-politicas">
        <h3>Política de Cancelamento</h3>
        <ul>
          <li>Cancelando até <strong>15 dias antes</strong> da reserva: reembolso de <strong>60%</strong>.</li>
          <li>Cancelando com menos de 15 dias: reembolso de <strong>15%</strong>.</li>
        </ul>

        <h3>Alteração de Data</h3>
        <p>A alteração está sujeita a taxa adicional que <em>varia de acordo com o hotel</em>.</p>

        {reserva.hotel === 'Chalés do Sul' && (
          <p><strong>Taxa aplicada para "{reserva.hotel}":</strong> 5% do valor da reserva (R${(reserva.valorTotal * 0.05).toFixed(2)}).</p>
        )}
      </div>

      <button className="cancellationpag-confirmar" onClick={handleCancelClick}>
        Confirmar Cancelamento
      </button>

      {showPopup && (
        <div className="popup-sucesso">
          Cancelamento de reserva feito com sucesso!
        </div>
      )}
    </div>
  );
};

export default CancellationPag;
