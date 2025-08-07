// services/review.ts
import api from './api';
import { ReviewDTO, CreateReviewDTO } from '../types/Review';

/**
 * Retorna todas as reviews de um hotel pelo hotelId
 */
export async function getReviewsByHotel(hotelId: number): Promise<ReviewDTO[]> {
  const response = await api.get(`/api/Hotel/${hotelId}/reviews`);
  return response.data.data;
}

/**
 * Cria uma nova review para um hotel
 */
export async function createReview(reviewData: CreateReviewDTO): Promise<ReviewDTO> {
  const response = await api.post(`/api/Hotel/${reviewData.hotelId}/reviews`, reviewData);
  return response.data.data;
}

/**
 * Atualiza uma review existente pelo reviewId
 */
export async function updateReview(reviewId: number, reviewData: CreateReviewDTO): Promise<ReviewDTO> {
  const response = await api.put(`/api/Hotel/reviews/${reviewId}`, reviewData);
  return response.data.data;
}

/**
 * Deleta uma review pelo reviewId
 */
export async function deleteReview(reviewId: number): Promise<void> {
  await api.delete(`/api/Hotel/reviews/${reviewId}`);
}
