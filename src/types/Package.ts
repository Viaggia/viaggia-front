import { Media } from './Media'
import { Reservation } from './Reservation'

export interface Package {
  packageId: number
  name?: string
  destination?: string
  description?: string
  basePrice: number
  isActive: boolean
  medias: Media[]
  packageDates: PackageDate[]
  reservations?: Reservation[]
}

export interface PackageDate {
  packageDateId: number
  startDate: string
  endDate: string  
  packageId: number
  isActive: boolean
}

export interface PackageDateDTO {
  packageDateId: number;
  startDate: string;
  endDate: string;
  availableSlots: number;
  isActive: boolean;
}

export interface PackageCreateDTO {
  name: string;
  destination: string;
  description?: string;
  basePrice: number;
  hotelId: number;
  isActive: boolean;
  packageDates: PackageDateDTO[];
  mediaFiles: File[];
}
