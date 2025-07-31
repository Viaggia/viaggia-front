import api from './api';
import { PackageDTO } from '../types/Package';

export async function getPackages(): Promise<PackageDTO[]> {
  const response = await api.get('/api/Packages');
  return response.data.data;
}
