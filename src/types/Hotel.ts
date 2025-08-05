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
  CustomCommodities: CustomCommodityDTO[];
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
  CustomCommodities: CustomCommodityDTO[];
}

export interface CustomCommodityDTO {
  customCommodityId: number;
  hotelName: string;
  name: string;
  isPaid: boolean;
  price?: number;
  description?: string;
  isActive: boolean;
  commoditieId: number;
  hotelId: number;
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
  HotelName: string;
  HasParking: boolean;
  IsParkingPaid: boolean;
  ParkingPrice: number;
  HasBreakfast: boolean;
  IsBreakfastPaid: boolean;
  BreakfastPrice: number;
  HasLunch: boolean;
  IsLunchPaid: boolean;
  LunchPrice: number;
  HasDinner: boolean;
  IsDinnerPaid: boolean;
  DinnerPrice: number;
  HasSpa: boolean;
  IsSpaPaid: boolean;
  SpaPrice: number;
  HasPool: boolean;
  IsPoolPaid: boolean;
  PoolPrice: number;
  HasGym: boolean;
  IsGymPaid: boolean;
  GymPrice: number;
  HasWiFi: boolean;
  IsWiFiPaid: boolean;
  WiFiPrice: number;
  HasAirConditioning: boolean;
  IsAirConditioningPaid: boolean;
  AirConditioningPrice: number;
  HasAccessibilityFeatures: boolean;
  IsAccessibilityFeaturesPaid: boolean;
  AccessibilityFeaturesPrice: number;
  IsPetFriendly: boolean;
  IsPetFriendlyPaid: boolean;
  PetFriendlyPrice: number;
  IsActive: boolean;
  CustomCommodities: Omit<CustomCommodityDTO, 'customCommodityId' | 'commoditieId' | 'hotelId'>[];
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

export interface HotelSearchDTO {
  city: string;
  checkInDate: string; 
  checkOutDate: string;
  numberOfPeople: number;
  numberOfRooms: number;
}

export interface HotelFilterParams {
  commodities?: string[];
  CustomCommodities?: string[];
  roomTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
}