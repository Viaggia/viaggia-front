import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stepper activeStep={currentStep - 1} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton color="inherit" onClick={() => setStep(index + 1)}>
            {!isMobile && label}
            {/* No mobile, só mostra o número do passo */}
            {isMobile && <span>{index + 1}</span>}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

export default HotelBreadcrumb;