import { FaExclamationTriangle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaymentPeding() {
  return (
    <div className="container mt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Alerta de pagamento pendente */}
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <FaExclamationTriangle className="me-2" size={24} />
            <div>
              <h1 className="mb-0">Pagamento pendente</h1>
              <p className="mb-0">Por favor, efetue o pagamento para continuar.</p>
            </div>
          </div>

          {/* Informações do cliente */}
          <div className="mb-4">
            <h5 className="text-primary">Informações do Cliente</h5>
            <p><strong>Client ID ou CPF:</strong> Nome Client</p>
            <p><strong>Hotel ID ou CNPJ:</strong> Nome Hotel</p>
            <p><strong>Nome do pagante:</strong> Nome pagante</p>
            <p><strong>CPF do pagante:</strong> CPF pagante</p>
          </div>

          {/* Card de resumo do pedido */}
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Resumo do Pedido</h5>
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

          {/* Espaço extra no final */}
          <div className="mt-5" />
        </div>
      </div>
    </div>
  );
}

export default PaymentPeding;
