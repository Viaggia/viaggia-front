import { Companion } from "./Companion"
import { Payment } from "./Payment"

export interface Reservation {
  reservationId: number;
  userId: number;
  packageId?: number;
  roomTypeId?: number;
  hotelId?: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  numberOfGuests: number;
  status: string;
  isActive: boolean;
  payments: Payment[];
  companions: Companion[];
}

export interface ReserveDTO {
  reserveId: number;
  userNameReservation?: string;
  userId: number;
  packageId?: number;
  roomTypeId?: number;
  hotelId?: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  numberOfPeople: number;
  numberOfRooms: number;
  createdAt: string;
  status: string;
  isActive: boolean;
}

export interface ReservationCreateDTO {
  userId: number;
  userNameReservation?: string;
  packageId?: number;
  roomTypeId?: number;
  hotelId?: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  numberOfGuests: number;
  status: string;
  isActive: boolean;
}