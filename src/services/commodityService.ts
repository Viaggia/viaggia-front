import api from './api';
import { CreateCommodityDTO, UpdateCommodityDTO, UpdateCustomCommodityDTO } from '../types/Hotel';

export const createCommodities = async (data: CreateCommodityDTO) => {
  const formData = new FormData();
  formData.append('hotelName', data.hotelName);

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'CustomCommodities' && key !== 'hotelName') {
      formData.append(key, String(value));
    }
  });

  const response = await api.post('/api/Commodity', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

export const createCustomCommodity = async (data: {
  name: string;
  isPaid: boolean;
  price?: number;
  description?: string;
  isActive: boolean;
  hotelName: string;
}) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('isPaid', String(data.isPaid));
  formData.append('price', data.price ? String(data.price) : '0');
  formData.append('description', data.description || '');
  formData.append('isActive', String(data.isActive));
  formData.append('hotelName', data.hotelName);

  const response = await api.post('/api/CustomCommodity', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

export async function updateCommodity(id: number, data: UpdateCommodityDTO) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'number') {
      formData.append(key, value.toString().replace('.', ','));
    } else {
      formData.append(key, String(value));
    }
  });

  const response = await api.put(`/api/Commodity/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export async function updateCustomCommodity(id: number, data: UpdateCustomCommodityDTO) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'number') {
      formData.append(key, value.toString().replace('.', ','));
    } else {
      formData.append(key, String(value));
    }
  });

  const response = await api.put(`/api/CustomCommodity/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}