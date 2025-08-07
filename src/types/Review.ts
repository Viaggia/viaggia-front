export interface ReviewDTO {
  reviewId: number;
  userId: number;
  reviewType: string;
  hotelId?: number;
  rating: number;
  comment?: string;
  createdAt: string;
  isActive: boolean;
}