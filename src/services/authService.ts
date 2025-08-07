import api from './api'
import { CreateAdminDTO, CreateAttendantDTO, CreateClientDTO, CreateServiceProviderDTO, LoginRequest } from '../types/User'
import { ForgotPasswordRequestDTO, ResetPasswordRequestDTO, ValidateTokenRequestDTO } from '../types/Authentication'


export async function register(userData: CreateClientDTO) {
  console.log('Registering user:', userData)
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

export async function logoutGoogle() {
  await api.post('/api/Accounts/logout-google')
  localStorage.removeItem('token')
}


export async function forgotPassword(data: ForgotPasswordRequestDTO) {
  const response = await api.post('/api/Auth/forgot-password', data);
  return response.data;
}

export async function validateToken(data: ValidateTokenRequestDTO) {
  const response = await api.post('/api/Auth/validate-token', data);
  return response.data;
}

export async function resetPassword(data: ResetPasswordRequestDTO) {
  const response = await api.post('/api/Auth/reset-password', data);
  return response.data;
}


