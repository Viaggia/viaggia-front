import api from './api'
import { User } from '../types/User'

export async function getUserById(id: number): Promise<User> {
  const response = await api.get(`/api/users/${id}`)
  return response.data.data
}