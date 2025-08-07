import { ReservationCreateDTO } from '../types/Reservation';
import api from './api';
//import { loadStripe } from '@stripe/stripe-js';

//const STRIPE_PROMISE = loadStripe('pk_test_51RsS2MFNInJ77nZ5I1V4R003EqgiNL7M3IMuRlPU3g4rxOH9Qm3i8wvroOYbMGcMAlN3c9bMnrBjfcV9qCBOgeqy00dMNminnL');

export async function createPaymentIntent(data: ReservationCreateDTO): Promise<{ url: string }> {
  try {
    const response = await api.post("https://localhost:7164/api/Payments/create-payment-intent", data);

    if (!response.status || response.status !== 200) {
      throw new Error(`Erro na requisição ao backend. Status: ${response.status}`);
    }

    const { url } = response.data;

    if (!url) {
      throw new Error("URL de checkout não retornada pelo backend");
    }

    console.log("data do pagamento:", data);

    return { url }; // Retorna a URL para o componente usar
  } catch (error) {
    console.error("Erro ao iniciar pagamento:", error);
    throw error;
  }
}
