import React from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

const ToastForm: React.FC<ToastProps> = ({ show, message, onClose, type = 'success' }) => {
  if (!show) return null;
  
  const bgClass = type === 'error' ? 'bg-danger' : 'bg-success';
  
  return (
    <div
      className={`toast align-items-center text-white ${bgClass} border-0 position-fixed bottom-0 end-0 m-4 show`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 9999 }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default ToastForm;