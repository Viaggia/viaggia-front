import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import {ReviewDTO} from '../../../types/Review';

interface ReviewCardProps {
  review: ReviewDTO;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const CARD_HEIGHT = 180;

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <div
      className="shadow-sm mb-4 mx-2"
      style={{
        borderRadius: 16,
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#fff',
        minHeight: CARD_HEIGHT,
        height: CARD_HEIGHT,
        width: '100%',
      }}
    >
      {/* Avatar ou placeholder */}
      <div
        style={{
          width: '20%',
          flexShrink: 0,
          height: '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          color: '#666',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          userSelect: 'none',
        }}
        title={review.userName}
      >
        {review.userName.charAt(0).toUpperCase()}
      </div>

      {/* Conteúdo */}
      <div
        style={{
          width: '80%',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          {/* Nome do usuário */}
          <h5 className="fw-bold mb-1">{review.userName}</h5>

          {/* Avaliação com estrelas */}
          <div className="d-flex align-items-center mb-2">
            {stars.map((filled, idx) =>
              filled ? (
                <StarIcon key={idx} style={{ color: '#FFC107' }} />
              ) : (
                <StarIcon key={idx} style={{ color: '#ddd' }} />
              )
            )}
            <span className="text-muted ms-2">{review.rating} / 5</span>
          </div>

          {/* Comentário */}
          <p style={{ fontSize: 14, color: '#333' }}>{review.comment}</p>
        </div>

        {/* Data */}
        <div style={{ fontSize: 12, color: '#888', textAlign: 'right' }}>
          {formatDate(review.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
