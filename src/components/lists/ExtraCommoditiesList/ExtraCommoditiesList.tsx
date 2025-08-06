import React from 'react';
import { CommoditiesServiceDTO } from '../../../types/Hotel';

interface ExtraCommoditiesListProps {
  commoditieServices: CommoditiesServiceDTO[];
}

const ExtraCommoditiesList: React.FC<ExtraCommoditiesListProps> = ({ commoditieServices }) => (
  <div className="col">
    <h6 className="mb-1">Comodidades Extras</h6>
    <ul className="list-unstyled small mb-0">
      {commoditieServices.map((cs, i) => (
        <li key={i}>{cs.serviceName} {cs.isFree ? '(Pago)' : '(Grátis)'}</li>
      ))}
    </ul>
  </div>
);

export default ExtraCommoditiesList;