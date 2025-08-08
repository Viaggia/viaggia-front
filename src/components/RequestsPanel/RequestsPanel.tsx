import React, { useEffect, useState } from 'react';
import { getAllComplaints } from '../../services/hotelService';
import { useAuth } from '../../context/AuthContext';
import { ComplaintDTO } from '../../types/Hotel';

const RequestsPanel: React.FC = () => {
  const [complaints, setComplaints] = useState<ComplaintDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then(setComplaints)
      .finally(() => setLoading(false));
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
          <ul className="list-group">
            {complaints.map(c => (
              <li key={c.complaintId} className="list-group-item">
                <strong>Comentário:</strong> {c.comment}<br />
                <small className="text-muted">Enviado em: {new Date(c.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequestsPanel;