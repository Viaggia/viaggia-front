import React from 'react';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';

interface ServiceListProps {
  title: string;
  items: string[];
}

const labelToKey: Record<string, keyof typeof comoditiesIcons> = {
  'Estacionamento': 'hasParking',
  'Café da manhã': 'hasBreakfast',
  'Almoço': 'hasLunch',
  'Janta': 'hasDinner',
  'Spa': 'hasSpa',
  'Piscina': 'hasPool',
  'Academia': 'hasGym',
  'Wi-Fi': 'hasWiFi',
  'Ar-condicionado': 'hasAirConditioning',
  'Acessibilidade': 'hasAccessibilityFeatures',
  'Pet Friendly': 'isPetFriendly',
};

const ServiceList: React.FC<ServiceListProps> = ({ title, items }) => (
  <div className="col">
    <div
      className="d-flex align-items-center mb-2"
      style={{
        gap: 8,
        color: '#2563eb',
        fontWeight: 700,
        fontSize: '1.08em',
        letterSpacing: '0.5px'
      }}
    >
      <i className="bi bi-check2-circle" style={{ fontSize: '1.2em' }} />
      {title}
    </div>
    <div className="d-flex flex-wrap gap-3">
      {items.length > 0 ? (
        items.map((label, i) => {
          const key = labelToKey[label];
          return (
            <div
              key={i}
              className="d-flex flex-column align-items-center justify-content-center shadow-sm"
              style={{
                minWidth: 110,
                maxWidth: 160,
                padding: '12px 10px',
                borderRadius: '12px',
                background: '#f8fafc',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                marginBottom: '8px',
              }}
            >
              <div style={{ marginBottom: 6 }}>{comoditiesIcons[key]}</div>
              <span
                className="small text-center fw-semibold"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '1em',
                  maxWidth: 130,
                }}
                title={label}
              >
                {label}
              </span>
            </div>
          );
        })
      ) : (
        <span className="text-muted">Nenhum</span>
      )}
    </div>
  </div>
);

export default ServiceList;