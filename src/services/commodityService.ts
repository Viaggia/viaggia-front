import api from './api';
import { CreateCommodityDTO, UpdateCommodityDTO, UpdateCustomCommodityDTO } from '../types/Hotel';

export const createCommodities = async (data: CreateCommodityDTO) => {
  const formData = new FormData();
  formData.append('HotelName', data.hotelName);

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'CustomCommodities' && key !== 'HotelName') {
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
  formData.append('Name', data.name);
  formData.append('IsPaid', String(data.isPaid));
  formData.append('Price', data.price ? String(data.price) : '0');
  formData.append('Description', data.description || '');
  formData.append('IsActive', String(data.isActive));
  formData.append('HotelName', data.hotelName);

  const response = await api.post('/api/CustomCommodity', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

export async function updateCommodity(id: number, data: UpdateCommodityDTO) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key.charAt(0).toUpperCase() + key.slice(1), String(value));
  });
  const response = await api.put(`/api/Commodity/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export async function updateCustomCommodity(id: number, data: UpdateCustomCommodityDTO) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key.charAt(0).toUpperCase() + key.slice(1), String(value));
  });
  const response = await api.put(`/api/CustomCommodity/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}