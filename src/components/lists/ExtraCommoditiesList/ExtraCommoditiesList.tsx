import React from 'react';
import { CustomCommodityDTO } from '../../../types/Hotel';

interface ExtraCommoditiesListProps {
  customCommodities: CustomCommodityDTO[];
}

const ExtraCommoditiesList: React.FC<ExtraCommoditiesListProps> = ({
  customCommodities = []
}) => {

  return (
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
        <i className="bi bi-gift" style={{ fontSize: '1.2em' }} />
        Comodidades Extras
      </div>
      <div className="d-flex flex-wrap gap-3">
        {customCommodities.length > 0 ? (
          customCommodities.map((cs, i) => (
            <div
              key={i}
              className="d-flex flex-column align-items-center justify-content-center shadow-sm"
              style={{
                minWidth: 110,
                maxWidth: 220,
                padding: '12px 10px',
                borderRadius: '12px',
                background: '#f8fafc',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                marginBottom: '8px',
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <i className="bi bi-gift" style={{ fontSize: '1.3em', color: '#6366f1' }} />
              </div>
              <span
                className="small text-center fw-semibold"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '1em',
                  maxWidth: 160,
                }}
                title={cs.name}
              >
                {cs.name}
              </span>
              <span
                className="small text-center"
                style={{
                  color: cs.isPaid ? '#eab308' : '#22c55e',
                  fontWeight: 500,
                  fontSize: '0.95em',
                  marginTop: 2,
                }}
              >
                {cs.isPaid ? `${cs.price ? `R$ ${Number(cs.price).toFixed(2)}` : ''}` : 'Grátis'}
              </span>
              {cs.description && (
                <span
                  className="text-muted small text-center"
                  style={{
                    fontSize: '0.92em',
                    marginTop: 2,
                    maxWidth: 160,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={cs.description}
                >
                  {cs.description}
                </span>
              )}
            </div>
          ))
        ) : (
          <span className="text-muted">Nenhuma comodidade extra disponível</span>
        )}
      </div>
    </div>
  );
};

export default ExtraCommoditiesList;