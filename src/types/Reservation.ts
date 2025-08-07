import { Companion } from "./Companion"
import { Payment } from "./Payment"

export interface Reservation {
  reservationId: number
  userId: number
  packageId?: number
  roomTypeId?: number
  hotelId?: number
  startDate: string
  endDate: string
  totalPrice: number
  numberOfGuests: number
  status: string
  isActive: boolean
  payments: Payment[]
  companions: Companion[]
}
export interface ReservationCreateDTO {
  userId: number;
  packageId?: number;
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  numberOfGuests: number;
  status: string;
  isActive: boolean;
  reserveRooms: ReserveRoomCreateDTO[];
}

export interface  ReserveRoomCreateDTO
{
    RoomTypeId: number;
    Quantity: Number;
}
