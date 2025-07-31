type PromotionCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  onConfirm?: () => void;
};

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  description,
  imageUrl,
  price,
  onConfirm,
}) => {
  return (
    <div
  className="card h-100 shadow-sm"
  style={{
    minHeight: "380px", // altura levemente maior
    width: "320px",     // largura levemente maior
  }}
>
      <img
        src={imageUrl}
        className="card-img-top"
        alt={title}
        style={{
          height: "160px",           // imagem mais compacta
          objectFit: "cover",        // corte proporcional
          borderRadius: "0.4rem",    // bordas suaves
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p
          className="card-text flex-grow-1"
          style={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3, // limita a 3 linhas
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </p>
        <span className="fw-bold text-danger">{price}</span>
        <button className="btn btn-success mt-3" onClick={onConfirm}>
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default PromotionCard;
