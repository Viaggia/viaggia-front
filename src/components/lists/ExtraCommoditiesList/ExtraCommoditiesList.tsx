import React from 'react';
import { CommoditieServicesDTO } from '../../../types/Hotel';

interface ExtraCommoditiesListProps {
  commoditieServices: CommoditieServicesDTO[];
}

const ExtraCommoditiesList: React.FC<ExtraCommoditiesListProps> = ({ commoditieServices }) => (
  <div className="col">
    <h6 className="mb-1">Comodidades Extras</h6>
    <ul className="list-unstyled small mb-0">
      {commoditieServices.map((cs, i) => (
        <li key={i}>{cs.name} {cs.isPaid ? '(Pago)' : '(Grátis)'} - {cs.description}</li>
      ))}
    </ul>
  </div>
);

export default ExtraCommoditiesList;