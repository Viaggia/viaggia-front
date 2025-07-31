import React from 'react';

type PromotionCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
};

const PromotionCard: React.FC<PromotionCardProps> = ({ title, description, imageUrl, price }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <span className="fw-bold text-danger mt-auto">{price}</span>
      </div>
    </div>
  );
};

export default PromotionCard;
