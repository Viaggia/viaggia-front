import api from './api';

export const getReservationsByUserId = async (userId: number) => {
  const response = await api.get(`/api/Reserves/user/${userId}`);
  return response.data;
};