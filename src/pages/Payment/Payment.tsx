import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row">
        {/* Coluna Esquerda: Informações e Forma de Pagamento */}
        <div className="col-md-6 mb-4">
          <div className="mb-4">
            <h5>Informações do Cliente</h5>
            <p><strong>Client ID ou CPF:</strong> Nome Client</p>
            <p><strong>Hotel ID ou CNPJ:</strong> Nome Hotel</p>
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="nomeCompleto" className="form-label">Nome Completo</label>
              <input type="text" className="form-control" id="nomeCompleto" placeholder="Nome Completo" required />
            </div>

            <div className="mb-3">
              <label htmlFor="cpforpassport" className="form-label">CPF ou Passport</label>
              <input type="text" className="form-control" id="cpforpassport" placeholder="CPF ou Passport" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Forma de Pagamento</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="formapagamento" id="boleto" value="boleto" />
                <label className="form-check-label" htmlFor="boleto">Boleto</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="formapagamento" id="pix" value="pix" />
                <label className="form-check-label" htmlFor="pix">Pix</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="formapagamento" id="cartao" value="cartao" />
                <label className="form-check-label" htmlFor="cartao">Cartão</label>
              </div>
            </div>
          </form>
        </div>

        {/* Coluna Direita: Resumo do Pagamento */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Resumo do Pagamento</h5>
            </div>
            <div className="card-body">
              <p><strong>Pacote:</strong> Nome do Pacote</p>
              <p><strong>Serviços:</strong> Detalhes dos serviços</p>
              <p><strong>Taxas:</strong> R$ 100,00</p>
              <p><strong>Total:</strong> R$ 1.000,00</p>
            </div>
            <div className="card-footer text-end">
              <button className="btn btn-success">Ir para o pagamento</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
 