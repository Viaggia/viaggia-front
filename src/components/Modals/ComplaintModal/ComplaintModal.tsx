import React, { useState } from 'react';

interface ComplaintModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({ show, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1050,
        minWidth: 350,
        maxWidth: 600,
        width: '90%',
      }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Solicitar alteração de reserva</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              placeholder="Descreva sua solicitação ou problema..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSubmit(comment);
                setComment('');
              }}
              disabled={!comment.trim()}
            >
              Enviar Solicitação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;