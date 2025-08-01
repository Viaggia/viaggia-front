import { CreateAddressDTO } from "./Address";
import { MediaDTO } from "./Media";
import { PackageDTO } from "./Package";
import { ReviewDTO } from "./Review";

export interface HotelDTO {
  hotelId: number;
  name: string;
  cnpj: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  description?: string;
  starRating: number;
  checkInTime?: string;
  checkOutTime?: string;
  contactPhone?: string;
  contactEmail?: string;
  isActive: boolean;
  averageRating: number;
  roomTypes: HotelRoomTypeDTO[];
  medias: MediaDTO[];
  reviews: ReviewDTO[];
  packages: PackageDTO[];
  commodities: CommoditieDTO[];
  commoditieServices: CommoditieServicesDTO[];
}

export interface HotelRoomTypeDTO {
  roomTypeId: number;
  name: RoomTypeEnum;
  description?: string;
  price: number;
  capacity: number;
  bedType?: string;
  totalRooms: number;
  availableRooms: number;
  isActive: boolean;
}

export interface CommoditieDTO {
  commoditieId: number;
  hotelId: number;
  hasParking: boolean;
  isParkingPaid: boolean;
  hasBreakfast: boolean;
  isBreakfastPaid: boolean;
  hasLunch: boolean;
  isLunchPaid: boolean;
  hasDinner: boolean;
  isDinnerPaid: boolean;
  hasSpa: boolean;
  isSpaPaid: boolean;
  hasPool: boolean;
  isPoolPaid: boolean;
  hasGym: boolean;
  isGymPaid: boolean;
  hasWiFi: boolean;
  isWiFiPaid: boolean;
  hasAirConditioning: boolean;
  isAirConditioningPaid: boolean;
  hasAccessibilityFeatures: boolean;
  isAccessibilityFeaturesPaid: boolean;
  isPetFriendly: boolean;
  isPetFriendlyPaid: boolean;
  isActive: boolean;
  commoditieServices: CommoditieServicesDTO[];
}

export interface CommoditieServicesDTO {
  commoditieServicesId: number;
  name: string;
  isPaid: boolean;
  description?: string;
  isActive: boolean;
  commoditieId: number;
}


export interface HotelDate {
  hotelDateId: number
  startDate: string
  endDate: string
  availableRooms: number
  roomTypeId: number
  hotelId: number
  isActive: boolean
}

export interface HotelRoomType {
  roomTypeId: number
  name: string
  description?: string
  price: number
  capacity: number
  bedType: string
  hotelId: number
  isActive: boolean
}


export interface CommoditiesServiceDTO {
  serviceName: string;
  isFree: boolean;
  isActive: boolean;
}


export interface CreateCommoditieDTO {
  hotelId: number;
  hasParking: boolean;
  isParkingFree: boolean;
  hasBreakfast: boolean;
  isBreakfastFree: boolean;
  hasLunch: boolean;
  isLunchFree: boolean;
  hasDinner: boolean;
  isDinnerFree: boolean;
  hasSpa: boolean;
  isSpaFree: boolean;
  hasPool: boolean;
  isPoolFree: boolean;
  hasGym: boolean;
  isGymFree: boolean;
  hasWiFi: boolean;
  isWiFiFree: boolean;
  hasAirConditioning: boolean;
  isAirConditioningFree: boolean;
  hasAccessibilityFeatures: boolean;
  isAccessibilityFeaturesFree: boolean;
  isPetFriendly: boolean;
  isPetFriendlyFree: boolean;
  commoditiesServices: CommoditiesServiceDTO[];
}

export interface CreateHotelDTO {
  name: string;
  cnpj: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  description?: string;
  starRating: number;
  checkInTime?: string;
  checkOutTime?: string;
  contactPhone?: string;
  contactEmail?: string;
  isActive: boolean;
  mediaFiles: File[];
  roomTypesJson: string;
}


export type RoomTypeEnum = 'Single' | 'Double' | 'Suite' | 'Deluxe' | 'Family';

export interface CreateHotelRoomTypeDTO {
  Name: RoomTypeEnum;
  Description: string;
  Price: number;
  Capacity: number;
  BedType: string;
  TotalRooms: number;
}


