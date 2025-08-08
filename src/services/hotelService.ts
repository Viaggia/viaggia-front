import api from './api';
import { ComplaintDTO, CreateComplaintDTO, CreateHotelDTO, HotelDTO, HotelFilterParams, HotelRoomTypeDTO, HotelSearchDTO, UpdateHotelDTO } from '../types/Hotel';

export async function getHotels(): Promise<HotelDTO[]> {
  const response = await api.get('/api/Hotel');
  return response.data.data;
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

  const response = await api.post('/api/Hotel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export async function getHotelById(id: number): Promise<HotelDTO> {
  const response = await api.get(`/api/Hotel/${id}`);
  return response.data.data;
}

export async function getAvailableRooms(
  hotelId: number,
  numberOfPeople: number,
  checkInDate: string,
  checkOutDate: string
): Promise<HotelRoomTypeDTO[]> {
  const response = await api.get(`/api/Hotel/${hotelId}/available-rooms`, {
    params: {
      numberOfPeople,
      checkInDate,
      checkOutDate,
    },
  });
  return response.data.data;
}

export async function searchHotels(search: HotelSearchDTO): Promise<HotelDTO[]> {
  try {
    const response = await api.get('/api/Hotel/search', { params: search });
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return [];
    }
    throw error;
  }
}

export async function filterHotels(params: HotelFilterParams): Promise<HotelDTO[]> {
  const response = await api.get('/api/Hotel/filter', { params });
  return response.data.data;
}

export async function getHotelsByUserId(userId: number): Promise<HotelDTO[]> {
  const response = await api.get(`/api/Hotel/user/${userId}`);
  return response.data.data;
}

export async function updateHotel(id: number, data: UpdateHotelDTO) {
  const formData = new FormData();
  formData.append('HotelId', data.hotelId.toString());
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
  if (data.roomTypesJson) formData.append('RoomTypesJson', data.roomTypesJson);
  if (data.mediaFiles) {
    data.mediaFiles.forEach(file => formData.append('MediaFiles', file));
  }

  const response = await api.put(`/api/Hotel/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export async function deleteHotel(id: number) {
  await api.delete(`/api/Hotel/${id}`);
}

export async function getAllComplaints(): Promise<ComplaintDTO[]> {
  const response = await api.get('/api/Hotel/complaints');
  return response.data.data;
}

export async function createComplaint(hotelId: number, data: CreateComplaintDTO) {
  const response = await api.post(`/api/Hotel/${hotelId}/complaints`, data);
  return response.data;
}