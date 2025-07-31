import { loadStripe } from "@stripe/stripe-js";
import api from "./api";
const stripePromise = loadStripe("pk_test_51RfqM54fuTTJj8yY7Yf1w5Y3GdSkPqN3oqxGic9MqxoZfzM0z5dFultcMmVNl3mzp5mNtRCLWeSITx3FbbRYqolS00Fnqh9ATU");

export async function iniciarPagamento(reserva: any) {
   try {
      const response = await api.post("https://localhost:7164/api/Payments/create-payment-intent", reserva);

      if (!response.status || response.status !== 200) {
         throw new Error(`Erro na requisição ao backend. Status: ${response.status}`);
      }
      const { url } = response.data;

      if (!url) {
         throw new Error("URL de checkout não retornada pelo backend");
      }

      // Redireciona diretamente para a URL do checkout
      window.location.href = url;

   } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
   }
}