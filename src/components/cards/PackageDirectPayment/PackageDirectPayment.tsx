import 'bootstrap/dist/css/bootstrap.min.css'
import { iniciarPagamento } from '../../../services/stripe'

interface CreateReservationDto {
  PackageId: number
  RoomTypeId: number
  HotelID: number
  NumberGuests: number
  CheckInDate: Date | string
  CheckOutDate: Date | string
  TotalPrice: string
}

interface PacoteCardPagamentoProps extends CreateReservationDto {
  titulo: string
  imagem: string
}

export default function PacoteCardPagamento({
  titulo,
  imagem,
  PackageId,
  RoomTypeId,
  HotelID,
  NumberGuests,
  CheckInDate,
  CheckOutDate,
  TotalPrice,
}: PacoteCardPagamentoProps) {
  const precoPorPessoa = `R$ ${(parseFloat(TotalPrice) / NumberGuests).toFixed(2)}`
  const precoTotal = `R$ ${parseFloat(TotalPrice).toFixed(2)}`

  const handleCheckout = async () => {
    const reserva: CreateReservationDto = {
      PackageId,
      RoomTypeId,
      HotelID,
      NumberGuests,
      CheckInDate: new Date(CheckInDate), // garante o formato correto
      CheckOutDate: new Date(CheckOutDate),
      TotalPrice,
    }

    try {
      await iniciarPagamento(reserva)
    } catch (error) {
      console.error('Erro ao iniciar pagamento:', error)
      alert('Não foi possível iniciar o pagamento. Tente novamente.')
    }
  }

  return (
    <div className="card h-100 shadow-sm" style={{ minWidth: '250px' }}>
      <img src={imagem} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">
          {NumberGuests} pessoa(s) · 1 noite · {precoPorPessoa} por pessoa
        </p>
        <h2 className="text-primary">{precoTotal}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          *Taxas e impostos não inclusos
        </p>
        <button onClick={handleCheckout} className="btn btn-success w-100">
          Conferir oferta
        </button>
      </div>
    </div>
  )
}