
import 'bootstrap/dist/css/bootstrap.min.css';

function Recovery() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h3 className="card-title text-center mb-4 text-primary fw-bold">
                  Recupere sua senha
                </h3>
                <p className="text-center text-muted mb-4">
                  Insira seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
                </p>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Enviar solicitação
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center text-muted small">
                Você receberá um link de redefinição em seu e-mail.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
