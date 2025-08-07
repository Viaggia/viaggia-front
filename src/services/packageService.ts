import api from './api';
import { PackageDTO, PackageUpdateDTO } from '../types/Package';
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

export async function searchPackages(destination: string, startDate: string, endDate: string): Promise<PackageDTO[]> {
  console.log(destination, startDate, endDate)
  const response = await api.get('/api/Packages/search', {
    params: {
      destination,
      startDate,
      endDate,
    },
  });
  return response.data.data;
}

export async function getPackagesByUserId(): Promise<PackageDTO[]> {
  const response = await api.get('/api/Packages/my-packages');
  return response.data.data;
}

export const updatePackage = async (packageId: number, data: PackageUpdateDTO) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('destination', data.destination);
  formData.append('description', data.description || '');

  // Tratamento do campo basePrice: troca '.' por ','
  if (typeof data.basePrice === 'number') {
    formData.append('basePrice', data.basePrice.toString().replace('.', ','));
  } else {
    formData.append('basePrice', String(data.basePrice).replace('.', ','));
  }

  formData.append('hotelName', data.hotelName);
  formData.append('isActive', data.isActive.toString());
  if (data.startDate) formData.append('startDate', data.startDate);
  if (data.endDate) formData.append('endDate', data.endDate);

  data.mediaIdsToDelete.forEach(id => {
    formData.append('mediaIdsToDelete', id.toString());
  });

  data.newMediaFiles.forEach(file => {
    formData.append('newMediaFiles', file);
  });

  const response = await api.put(`/api/Packages/${packageId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deletePackage = async (packageId: number) => {
  const response = await api.delete(`/api/Packages/${packageId}`);
  return response.data;
};