import api from './api';
import { BalanceResponse } from '../types/Balance'

export async function GraphicService(): Promise<BalanceResponse> {
  try {
    const response = await api.get("/api/payments/Balance");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar dados de balanço:", error);
    throw error;
  }
}