import React, { useState } from 'react';

interface Props {
  commodities: any;
  comoditiesIcons: Record<string, React.ReactNode>;
  comoditiesLabels: Record<string, string>;
  formatCurrencyBRL: (value: number) => string;
}

const HotelCommoditiesIcons: React.FC<Props> = ({
  commodities,
  comoditiesIcons,
  comoditiesLabels,
  formatCurrencyBRL,
}) => {
  const [hoveredCommodity, setHoveredCommodity] = useState<string | null>(null);

  return (
    <>
      {Object.entries(comoditiesIcons)
        .filter(([key]) => commodities[key])
        .map(([key, icon]) => {
          let priceKey = key.replace(/^has/, '').replace(/^is/, '');
          priceKey = priceKey.charAt(0).toLowerCase() + priceKey.slice(1) + 'Price';
          const price = commodities[priceKey];
          return (
            <span
              key={key}
              className="me-2 position-relative"
              style={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                marginBottom: 0,
              }}
              onMouseEnter={() => setHoveredCommodity(key)}
              onMouseLeave={() => setHoveredCommodity(null)}
            >
              {icon}
              {hoveredCommodity === key && (
                <div
                  className="shadow rounded p-2"
                  style={{
                    position: 'absolute',
                    top: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    minWidth: 'max-content',
                    maxWidth: 260,
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    fontSize: '0.95em',
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    padding: '12px 16px',
                  }}
                >
                  <div style={{ fontWeight: 600, wordBreak: 'break-word' }}>
                    {comoditiesLabels[key] || key}
                  </div>
                  {price !== undefined && price !== null && price > 0 && (
                    <span
                      style={{
                        background: '#e3f2fd',
                        color: '#1976d2',
                        fontWeight: 600,
                        fontSize: '0.95em',
                        padding: '2px 5px',
                        borderRadius: 6,
                        border: '1px solid #bbdefb',
                        display: 'inline-block',
                        minWidth: 38,
                        maxWidth: 80,
                        textAlign: 'center',
                        marginTop: 8,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatCurrencyBRL(price)}
                    </span>
                  )}
                </div>
              )}
            </span>
          );
        })}
    </>
  );
};

export default HotelCommoditiesIcons;