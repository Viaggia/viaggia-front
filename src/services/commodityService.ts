import api from './api';
import { CreateCommoditieDTO } from '../types/Hotel';

export const createCommodities = async (data: CreateCommoditieDTO) => {
  const response = await api.post('/api/Commoditie', data);
  return response.data;
};
