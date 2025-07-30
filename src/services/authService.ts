import api from './api'
import { CreateAdminDTO, CreateAttendantDTO, CreateClientDTO, CreateServiceProviderDTO, LoginRequest } from '../types/User'


export async function register(userData: CreateClientDTO) {
  const response = await api.post('/api/users/client', userData)
  return response.data
}

export async function registerAdmin(userData: CreateAdminDTO) {
  const response = await api.post('/api/users/admin', userData)
  return response.data
}


export async function registerAttendant(userData: CreateAttendantDTO) {
  const response = await api.post('/api/users/attendant', userData)
  return response.data
}

export async function registerServiceProvider(userData: CreateServiceProviderDTO) {
  const response = await api.post('/api/users/service-provider', userData)
  return response.data
}


export async function login(credentials: LoginRequest) {
  const response = await api.post('/api/Auth/login', credentials)
  return response.data
}


export async function logout() {
  const token = localStorage.getItem('token')
  if (!token) return

  await api.post('/api/Auth/logout-default', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  localStorage.removeItem('token')
}

