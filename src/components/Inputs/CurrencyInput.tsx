import React from 'react';
import { formatCurrencyBRL, parseCurrencyBRL } from '../../utils/formatMask';

interface CurrencyInputProps {
  name?: string;
  label?: string;
  value: number | undefined;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder = 'R$ 0,00',
  disabled = false,
  inputClassName = 'form-control',
  labelClassName = 'form-label mb-1',
  wrapperClassName = 'd-flex flex-column align-items-start',
  inputStyle,
  labelStyle,
}) => {
  const displayValue = typeof value === 'number' && !isNaN(value) ? formatCurrencyBRL(value) : '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseCurrencyBRL(e.target.value));
  };

  return (
    <div className={wrapperClassName}>
      {label && <label className={labelClassName} style={labelStyle}>{label}</label>}
      <input
        type="text"
        name={name}
        className={inputClassName}
        value={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        inputMode="numeric"
        style={inputStyle}
      />
    </div>
  );
};

export default CurrencyInput;
