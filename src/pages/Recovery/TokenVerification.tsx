
import 'bootstrap/dist/css/bootstrap.min.css';

function TokenVerification() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h3 className="card-title text-center mb-4 text-success fw-bold">
                  Verifique seu token
                </h3>
                <p className="text-center text-muted mb-4">
                  Digite o token que você recebeu por e-mail para continuar com a recuperação de senha.
                </p>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      id="token"
                      name="token"
                      className="form-control"
                      placeholder="Digite o token"
                      required
                    />
                    <label htmlFor="token">Token</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg">
                      Verificar Token
                    </button>
                    <a href="">reenviar token</a>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center text-muted small">
                Certifique-se de que o token está correto antes de enviar.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenVerification;
