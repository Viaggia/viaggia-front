import React from 'react';
import { CustomCommodityDTO } from '../../../types/Hotel';

interface ExtraCommoditiesListProps {
  customCommodities: CustomCommodityDTO[];
}

const ExtraCommoditiesList: React.FC<ExtraCommoditiesListProps> = ({ 
  customCommodities = []
}) => {
  // Use customCommodities if available, otherwise fallback to commoditieServices
  const items = customCommodities.length > 0 ? customCommodities : [];

  return (
    <div className="col">
      <h6 className="mb-1">Comodidades Extras</h6>
      <ul className="list-unstyled small mb-0">
        {customCommodities.length > 0 ? (
          customCommodities.map((cs, i) => (
            <li key={i}>{cs.name} {cs.isPaid ? '(Pago)' : '(Grátis)'} {cs.description}</li>
          ))
        ) : (
          <li className="text-muted">Nenhuma comodidade extra disponível</li>
        )}
      </ul>
    </div>
  );
};

export default ExtraCommoditiesList;