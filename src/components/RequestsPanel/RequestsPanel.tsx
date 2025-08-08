import React, { useEffect, useState } from 'react';
import { getAllComplaints } from '../../services/hotelService';
import { getUserById } from '../../services/userService';
import { ComplaintDTO } from '../../types/Hotel';

interface ComplaintWithUser extends ComplaintDTO {
  userName?: string;
}

const RequestsPanel: React.FC = () => {
  const [complaints, setComplaints] = useState<ComplaintWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaintsWithUsers() {
      const complaintsList = await getAllComplaints();
      const complaintsWithUser = await Promise.all(
        complaintsList.map(async (c) => {
          try {
            const user = await getUserById(c.userId);
            return { ...c, userName: user.name };
          } catch {
            return { ...c, userName: 'Usuário desconhecido' };
          }
        })
      );
      setComplaints(complaintsWithUser);
      setLoading(false);
    }
    fetchComplaintsWithUsers();
  }, []);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <i className="bi bi-inbox me-2" style={{ fontSize: 24 }}></i>
        <h4 className="mb-0">Solicitações</h4>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <div className="mt-3">Carregando chamados...</div>
          </div>
        ) : complaints.length === 0 ? (
          <div className="alert alert-info text-center my-5">
            <i className="bi bi-info-circle me-2"></i>
            Nenhum chamado para atendimento no momento.<br />
            Quando houver solicitações de clientes, elas aparecerão aqui para você gerenciar.
          </div>
        ) : (
          <div className="row g-3">
            {complaints.map(c => (
              <div key={c.complaintId} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-primary">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-person-circle text-primary me-2" style={{ fontSize: 22 }}></i>
                      <span className="fw-bold">Usuário: {c.userName || c.userId}</span>
                    </div>
                    <p className="mb-2">
                      <strong>Comentário:</strong><br />
                      <span className="text-dark">{c.comment}</span>
                    </p>
                  </div>
                  <div className="card-footer bg-light border-top">
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      Enviado em: {new Date(c.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPanel;