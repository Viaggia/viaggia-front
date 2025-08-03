import { ReservationCreateDTO } from '../types/Reservation';
import api from './api';

export async function createPaymentIntent(data: ReservationCreateDTO) {
  const response = await api.post('/api/Payments/create-payment-intent', data);
  return response.data;
}