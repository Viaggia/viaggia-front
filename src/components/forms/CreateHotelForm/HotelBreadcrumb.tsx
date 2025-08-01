import React from 'react';

interface Props {
  currentStep: number;
  setStep: (step: number) => void;
}

const HotelBreadcrumb: React.FC<Props> = ({ currentStep, setStep }) => {
  const steps = ['Informações Básicas', 'Tipos de Quarto', 'Revisar e Enviar'];

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="breadcrumb">
        {steps.map((label, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${currentStep === index + 1 ? 'active fw-bold' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setStep(index + 1)}
            aria-current={currentStep === index + 1 ? 'page' : undefined}
          >
            {label}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default HotelBreadcrumb;
