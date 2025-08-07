import { useNavigate } from "react-router-dom";

function PaymentOrder() {
  const navigate = useNavigate();
  const handleGoToPaymentPending = () => {
    navigate('/payment');
  };

  return (
    <div className="d-flex justify-content-center  vh-100">
      <div className="col-md-6">
        <div className="mb-4">
            <h5>Informações do Cliente</h5>
            <p><strong>Client ID ou CPF:</strong> Nome Client</p>
            <p><strong>Hotel ID ou CNPJ:</strong> Nome Hotel</p>
          </div>
        <div className="card">
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
            <button className="btn btn-success" onClick={handleGoToPaymentPending}>
              Ir para o pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentOrder;