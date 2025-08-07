import React from 'react';
import { CustomCommodityDTO, CommoditiesServiceDTO } from '../../../types/Hotel';

interface ExtraCommoditiesListProps {
  customCommodities?: CustomCommodityDTO[];
  commoditieServices?: CommoditiesServiceDTO[];
}

const ExtraCommoditiesList: React.FC<ExtraCommoditiesListProps> = ({ 
  customCommodities = [], 
  commoditieServices = [] 
}) => {
  // Use customCommodities if available, otherwise fallback to commoditieServices
  const items = customCommodities.length > 0 ? customCommodities : commoditieServices;
  
  return (
    <div className="col">
      <h6 className="mb-1">Comodidades Extras</h6>
      <ul className="list-unstyled small mb-0">
        {customCommodities.length > 0 ? (
          customCommodities.map((cs, i) => (
            <li key={i}>{cs.name} {cs.isPaid ? '(Pago)' : '(Grátis)'} {cs.description}</li>
          ))
        ) : (
          commoditieServices.map((cs, i) => (
            <li key={i}>{cs.serviceName} {cs.isFree ? '(Grátis)' : '(Pago)'}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ExtraCommoditiesList;