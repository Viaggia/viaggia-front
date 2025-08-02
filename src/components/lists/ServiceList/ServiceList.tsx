import React from 'react';

interface ServiceListProps {
  title: string;
  items: string[];
}

const ServiceList: React.FC<ServiceListProps> = ({ title, items }) => (
  <div className="col">
    <h6 className="mb-1">{title}</h6>
    <ul className="list-unstyled small mb-0">
      {items.length > 0 ? items.map((s, i) => <li key={i}>{s}</li>) : <li>Nenhum</li>}
    </ul>
  </div>
);

export default ServiceList;