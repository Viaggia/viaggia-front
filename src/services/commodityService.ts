import api from './api';
import { CreateCommoditieDTO } from '../types/Hotel';

export const createCommodities = async (data: CreateCommoditieDTO) => {
  const formData = new FormData();

  formData.append('HotelName', data.hotelName);

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'commoditieServices') {
      (value as CreateCommoditieDTO['commoditieServices']).forEach((service, index) => {
        formData.append(`CommoditieServices[${index}].Name`, service.name);
        formData.append(`CommoditieServices[${index}].IsPaid`, String(service.isPaid));
        formData.append(`CommoditieServices[${index}].Description`, service.description || '');
        formData.append(`CommoditieServices[${index}].IsActive`, String(service.isActive));
        formData.append(`CommoditieServices[${index}].HotelName`, data.hotelName);
      });
    } else if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
      formData.append(key, String(value));
    }
  });

  const response = await api.post('/api/Commoditie', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};