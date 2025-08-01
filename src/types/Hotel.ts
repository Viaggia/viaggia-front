import { CreateAddressDTO } from "./Address";
import { MediaDTO } from "./Media";
import { PackageDTO } from "./Package";
import { ReviewDTO } from "./Review";

export interface HotelDTO {
  hotelId: number;
  name: string;
  description?: string;
  starRating: number;
  checkInTime?: string;
  checkOutTime?: string;
  contactPhone?: string;
  contactEmail?: string;
  isActive: boolean;
  medias: MediaDTO[];
  roomTypes: HotelRoomType[];
  hotelDates: HotelDate[];
  addresses: CreateAddressDTO[];
  reviews: ReviewDTO[];
  packages: PackageDTO[];
  averageRating: number;
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
  description?: string;
  starRating: number;
  checkInTime?: string;
  checkOutTime?: string;
  contactPhone?: string;
  contactEmail?: string;
  isActive: boolean;
  roomTypes: HotelRoomType[];
  hotelDates: HotelDate[];
  mediaFiles: File[];
  commoditie: CreateCommoditieDTO;
}

