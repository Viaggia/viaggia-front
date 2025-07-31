import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewPassword() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h3 className="card-title text-center mb-4 text-primary fw-bold">
                  Defina sua nova senha
                </h3>
                <p className="text-center text-muted mb-4">
                  Digite sua nova senha abaixo e confirme para concluir a redefinição.
                </p>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      placeholder="Nova senha"
                      required
                    />
                    <label htmlFor="newPassword">Nova senha</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirme a nova senha"
                      required
                    />
                    <label htmlFor="confirmPassword">Confirme a nova senha</label>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Redefinir Senha
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center text-muted small">
                Certifique-se de que ambas as senhas coincidem antes de continuar.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
