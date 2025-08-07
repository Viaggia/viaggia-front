import React, { useState } from 'react';
import { FaGift } from 'react-icons/fa';
import { formatCurrencyBRL } from '../../../utils/formatMask';

interface CustomCommodity {
  customCommodityId: number;
  name: string;
  description?: string;
  price?: number;
}

interface Props {
  customCommodities: CustomCommodity[];
}

const CustomCommodityCardList: React.FC<Props> = ({ customCommodities }) => {
  const [hoveredCustomCommodityId, setHoveredCustomCommodityId] = useState<number | null>(null);

  return (
    <>
      {customCommodities.map(custom => {
        const isFree = !custom.price || custom.price === 0;
        return (
          <div
            key={custom.customCommodityId}
            className="position-relative w-100 mb-1"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              minWidth: 120,
              maxWidth: '100%',
            }}
            onMouseEnter={() => setHoveredCustomCommodityId(custom.customCommodityId)}
            onMouseLeave={() => setHoveredCustomCommodityId(null)}
          >
            <FaGift className="me-1 text-success" />
            <span
              style={{
                fontWeight: 500,
                fontSize: '0.97em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flexGrow: 1,
                minWidth: 0,
                marginRight: 8,
              }}
              title={custom.name}
            >
              {custom.name}
            </span>
            <span
              style={{
                background: isFree ? '#e8f5e9' : '#e3f2fd',
                color: isFree ? '#388e3c' : '#1976d2',
                fontWeight: 600,
                fontSize: '0.95em',
                padding: '2px 5px',
                borderRadius: 6,
                border: isFree ? '1px solid #c8e6c9' : '1px solid #bbdefb',
                display: 'inline-block',
                minWidth: 38,
                maxWidth: 80,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {isFree ? 'Grátis' : formatCurrencyBRL(custom.price ?? 0)}
            </span>
            {hoveredCustomCommodityId === custom.customCommodityId && (
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
                <div style={{ fontWeight: 600, wordBreak: 'break-word', marginBottom: 4 }}>
                  {custom.name}
                </div>
                <div style={{ fontSize: '0.93em', color: '#555', marginBottom: 6 }}>
                  {custom.description}
                </div>
                <span
                  style={{
                    background: isFree ? '#e8f5e9' : '#e3f2fd',
                    color: isFree ? '#388e3c' : '#1976d2',
                    fontWeight: 600,
                    fontSize: '0.95em',
                    padding: '2px 5px',
                    borderRadius: 6,
                    border: isFree ? '1px solid #c8e6c9' : '1px solid #bbdefb',
                    display: 'inline-block',
                    minWidth: 38,
                    maxWidth: 80,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isFree ? 'Grátis' : formatCurrencyBRL(custom.price ?? 0)}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CustomCommodityCardList;