import api from './api';
import { CreateHotelDTO, HotelDTO } from '../types/Hotel';

// Buscar todos os hotéis
export async function getHotels(): Promise<HotelDTO[]> {
  const response = await api.get('/api/Hotel');
  return response.data.data;
}

// Criar um novo hotel com multipart/form-data
export const createHotel = async (data: CreateHotelDTO) => {
  const formData = new FormData();

  formData.append('Name', data.name);
  formData.append('Cnpj', data.cnpj);
  formData.append('Description', data.description || '');
  formData.append('StarRating', data.starRating.toString());
  formData.append('CheckInTime', data.checkInTime || '');
  formData.append('CheckOutTime', data.checkOutTime || '');
  formData.append('ContactPhone', data.contactPhone || '');
  formData.append('ContactEmail', data.contactEmail || '');
  formData.append('IsActive', data.isActive.toString());

  formData.append('RoomTypesJson', JSON.stringify(data.roomTypes));
  formData.append('HotelDatesJson', JSON.stringify(data.hotelDates));
  formData.append('CommoditieJson', JSON.stringify(data.commoditie));

  data.mediaFiles.forEach((file) => {
    formData.append('MediaFiles', file);
  });

  const response = await api.post('/api/Hotel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
