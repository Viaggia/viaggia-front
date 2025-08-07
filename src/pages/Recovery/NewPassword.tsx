import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';

function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      console.log("token", token)
      console.log("newpassword, ", newPassword )
      await resetPassword({ token, newPassword, confirmPassword });
      navigate('/login');
    } catch (err) {
      setError('Erro ao redefinir a senha.');
    }
  };

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
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      placeholder="Nova senha"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirme a nova senha</label>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Redefinir Senha
                    </button>
                  </div>
                </form>
                {error && <p className="text-danger text-center mt-3">{error}</p>}
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
