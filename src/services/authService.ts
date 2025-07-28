import api from './api'
import { CreateClientDTO, LoginRequest } from '../types/User'


export async function register(userData: CreateClientDTO) {
  const response = await api.post('/api/users/client', userData)
  return response.data
}



export async function login(credentials: LoginRequest) {
  const response = await api.post('/api/Auth/login', credentials)
  return response.data
}
