import React from 'react';
import ReviewCard from '../../cards/ReviewCard/Review';
import { ReviewDTO } from '../../../types/Review';

interface ReviewListProps {
  reviews: ReviewDTO[];
  loading: boolean;
  userMap: { [userId: number]: { name: string } };
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading, userMap }) => (
  <div className="container mt-2">
    {loading && <p>Carregando avaliações...</p>}
    {!loading && reviews.length === 0 && (
      <div className="card border-0 shadow-sm my-4 text-center bg-light">
        <div className="card-body py-4">
          <i className="bi bi-chat-dots" style={{ fontSize: 40, color: "#0d6efd" }}></i>
          <h5 className="mt-3 mb-2 text-secondary">Nenhuma avaliação disponível</h5>
          <p className="mb-0 text-muted">
            Este hotel ainda não possui avaliações de hóspedes.<br />
            Seja o primeiro a compartilhar sua experiência!
          </p>
        </div>
      </div>
    )}
    <div className="row">
      {reviews.map(review => (
        <div key={review.reviewId} className="col-md-6 col-lg-4 mb-4">
          <ReviewCard
            review={{
              ...review,
              userName: userMap[review.userId]?.name || 'Usuário Anônimo'
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ReviewList;