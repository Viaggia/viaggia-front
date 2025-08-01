import api from './api';
import { CreateHotelDTO, HotelDTO } from '../types/Hotel';

export async function getHotels(): Promise<HotelDTO[]> {
  const response = await api.get('/api/Hotel/getAll');
  return response.data;
}

export const createHotel = async (data: CreateHotelDTO) => {
  const formData = new FormData();

  formData.append('Name', data.name);
  formData.append('Cnpj', data.cnpj);
  formData.append('Street', data.street);
  formData.append('City', data.city);
  formData.append('State', data.state);
  formData.append('ZipCode', data.zipCode);
  formData.append('Description', data.description || '');
  formData.append('StarRating', data.starRating.toString());
  formData.append('CheckInTime', data.checkInTime || '');
  formData.append('CheckOutTime', data.checkOutTime || '');
  formData.append('ContactPhone', data.contactPhone || '');
  formData.append('ContactEmail', data.contactEmail || '');
  formData.append('IsActive', data.isActive.toString());

  formData.append('RoomTypesJson', data.roomTypesJson);


  data.mediaFiles.forEach((file) => {
    formData.append('MediaFiles', file);
  });

  const response = await api.post('/api/Hotel/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

