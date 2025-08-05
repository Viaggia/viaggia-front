import api from './api';
import { PackageDTO } from '../types/Package';
import { PackageCreateDTO } from '../types/Package';

export async function getPackages(): Promise<PackageDTO[]> {
  const response = await api.get('/api/Packages');
  return response.data.data;
}

export async function getPackageById(packageId: number): Promise<PackageDTO> {
  const response = await api.get(`/api/Packages/${packageId}`);
  return response.data.data;
}

export const createPackage = async (data: PackageCreateDTO) => {
  const formData = new FormData();

  formData.append('Name', data.name);
  formData.append('Destination', data.destination);
  formData.append('Description', data.description || '');
  formData.append('BasePrice', data.basePrice.toString());
  formData.append('HotelName', data.hotelName);
  formData.append('IsActive', data.isActive.toString());
  formData.append('StartDate', data.startDate);
  formData.append('EndDate', data.endDate);

  data.mediaFiles.forEach(file => {
    formData.append('MediaFiles', file);
  });

  const response = await api.post('/api/Packages', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
