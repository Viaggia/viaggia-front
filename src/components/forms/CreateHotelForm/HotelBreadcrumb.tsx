import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

interface Props {
  currentStep: number;
  setStep: (step: number) => void;
}

const steps = [
  'Informações Básicas',
  'Tipos de Quarto',
  'Comodidades',
  'Revisar e Enviar'
];

const HotelBreadcrumb: React.FC<Props> = ({ currentStep, setStep }) => {
  return (
    <Stepper activeStep={currentStep - 1} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton color="inherit" onClick={() => setStep(index + 1)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

export default HotelBreadcrumb;