import React from 'react';
import { CustomCommodityDTO } from '../../../types/Hotel';

interface ExtraCommoditiesListProps {
  customCommodities: CustomCommodityDTO[];
}

const ExtraCommoditiesList: React.FC<ExtraCommoditiesListProps> = ({ customCommodities }) => (
  <div className="col">
    <h6 className="mb-1">Comodidades Extras</h6>
    <ul className="list-unstyled small mb-0">
      {customCommodities.map((cs, i) => (
        <li key={i}>{cs.name} {cs.isPaid ? '(Pago)' : '(Grátis)'}</li>
      ))}
    </ul>
  </div>
);

export default ExtraCommoditiesList;