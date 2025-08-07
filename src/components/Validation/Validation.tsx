import React from 'react';

export interface ValidationRule {
  isValid: boolean;
  message: string;
}

export interface ValidationProps {
  show: boolean;
  title: string;
  rules: ValidationRule[];
  examples?: string;
  className?: string;
}

const Validation: React.FC<ValidationProps> = ({ 
  show, 
  title, 
  rules, 
  examples, 
  className = "mt-2 p-2 bg-light rounded border" 
}) => {
  if (!show) return null;

  return (
    <div className={className}>
      <small className="text-muted d-block mb-1">{title}</small>
      <div className="d-flex flex-column gap-1">
        {rules.map((rule, index) => (
          <small key={index} className={rule.isValid ? 'text-success' : 'text-danger'}>
            {rule.isValid ? '✓' : '✗'} {rule.message}
          </small>
        ))}
      </div>
      {examples && (
        <small className="text-muted d-block mt-1">
          <strong>Exemplos:</strong> {examples}
        </small>
      )}
    </div>
  );
};

export default Validation;
export { Validation };
