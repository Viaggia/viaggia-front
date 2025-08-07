
export interface ReviewDTO {
  reviewId: number;
  hotelId: number;
  userId: number;
  userName: string;
  rating: number; // nota da review (ex: 1 a 5)
  comment: string;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string, opcional
  isActive: boolean;
}

export interface CreateReviewDTO {
  hotelId: number;
  userId: number;
  rating: number; // nota da review (ex: 1 a 5)
  comment: string;
}
