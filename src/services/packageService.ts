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

  formData.append('name', data.name);
  formData.append('destination', data.destination);
  formData.append('description', data.description || '');
  formData.append('basePrice', data.basePrice.toString());
  formData.append('hotelName', data.hotelName);
  formData.append('isActive', data.isActive.toString());
  formData.append('startDate', data.startDate);
  formData.append('endDate', data.endDate);

  data.mediaFiles.forEach(file => {
    formData.append('mediaFiles', file);
  });

  const response = await api.post('/api/Packages', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
