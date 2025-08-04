import api from './api'
import { UpdateUserDTO, User } from '../types/User'

export async function getUserById(id: number): Promise<User> {
  const response = await api.get(`/api/users/${id}`)
  return response.data.data
}

export async function updateUser(id: number, data: UpdateUserDTO, avatarFile?: File): Promise<User> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });
  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }
  const response = await api.put(`/api/users/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
}