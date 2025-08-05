import React from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ToastForm: React.FC<ToastProps> = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div
      className="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-4 show"
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