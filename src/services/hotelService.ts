import api from './api';
import { HotelDTO } from '../types/Hotel';

export async function getHotels(): Promise<HotelDTO[]> {
  const response = await api.get('/api/Hotel');
  return response.data.data;
}