import api from './api'
import { LoginRequest, User } from '../types/User'

export async function register(userData: Partial<User>) {
  const response = await api.post('/api/users/client', userData)
  return response.data
}


export async function login(credentials: LoginRequest) {
  const response = await api.post('/api/Auth/login', credentials)
  return response.data
}
