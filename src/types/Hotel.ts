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
  commodities: CommodityDTO[];
  customCommodities: CustomCommodityDTO[];
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

export interface CommodityDTO {
  commodityId: number;
  hotelId: number;
  hotelName?: string;
  hasParking: boolean;
  isParkingPaid: boolean;
  parkingPrice: number;
  hasBreakfast: boolean;
  isBreakfastPaid: boolean;
  breakfastPrice: number;
  hasLunch: boolean;
  isLunchPaid: boolean;
  lunchPrice: number;
  hasDinner: boolean;
  isDinnerPaid: boolean;
  dinnerPrice: number;
  hasSpa: boolean;
  isSpaPaid: boolean;
  spaPrice: number;
  hasPool: boolean;
  isPoolPaid: boolean;
  poolPrice: number;
  hasGym: boolean;
  isGymPaid: boolean;
  gymPrice: number;
  hasWiFi: boolean;
  isWiFiPaid: boolean;
  wiFiPrice: number;
  hasAirConditioning: boolean;
  isAirConditioningPaid: boolean;
  airConditioningPrice: number;
  hasAccessibilityFeatures: boolean;
  isAccessibilityFeaturesPaid: boolean;
  accessibilityFeaturesPrice: number;
  isPetFriendly: boolean;
  isPetFriendlyPaid: boolean;
  petFriendlyPrice: number;
  isActive: boolean;
  customCommodities: CustomCommodityDTO[];
}

export interface CustomCommodityDTO {
  customCommodityId: number;
  name: string;
  description?: string;
  isPaid: boolean;
  price: number;
  isActive: boolean;
  hotelName: string;
  commoditieId?: number;
  hotelId?: number;
}

export interface HotelDate {
  hotelDateId: number;
  startDate: string;
  endDate: string;
  availableRooms: number;
  roomTypeId: number;
  hotelId: number;
  isActive: boolean;
}

export interface HotelRoomType {
  roomTypeId: number;
  name: string;
  description?: string;
  price: number;
  capacity: number;
  bedType: string;
  hotelId: number;
  isActive: boolean;
}

export interface CreateCommodityDTO {
  hotelName: string;
  hasParking: boolean;
  isParkingPaid: boolean;
  parkingPrice: number;
  hasBreakfast: boolean;
  isBreakfastPaid: boolean;
  breakfastPrice: number;
  hasLunch: boolean;
  isLunchPaid: boolean;
  lunchPrice: number;
  hasDinner: boolean;
  isDinnerPaid: boolean;
  dinnerPrice: number;
  hasSpa: boolean;
  isSpaPaid: boolean;
  spaPrice: number;
  hasPool: boolean;
  isPoolPaid: boolean;
  poolPrice: number;
  hasGym: boolean;
  isGymPaid: boolean;
  gymPrice: number;
  hasWiFi: boolean;
  isWiFiPaid: boolean;
  wiFiPrice: number;
  hasAirConditioning: boolean;
  isAirConditioningPaid: boolean;
  airConditioningPrice: number;
  hasAccessibilityFeatures: boolean;
  isAccessibilityFeaturesPaid: boolean;
  accessibilityFeaturesPrice: number;
  isPetFriendly: boolean;
  isPetFriendlyPaid: boolean;
  petFriendlyPrice: number;
  isActive: boolean;
  customCommodities: Omit<CustomCommodityDTO, 'customCommodityId' | 'commoditieId' | 'hotelId'>[];
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
  name: RoomTypeEnum;
  description: string;
  price: number;
  capacity: number;
  bedType: string;
  totalRooms: number;
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
  customCommodities?: string[];
  roomTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
}

export interface UpdateHotelDTO {
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
  mediaFiles?: File[];
  roomTypesJson?: string;
}

export interface UpdateCommodityDTO {
  hotelName: string;
  hasParking: boolean;
  isParkingPaid: boolean;
  parkingPrice: number;
  hasBreakfast: boolean;
  isBreakfastPaid: boolean;
  breakfastPrice: number;
  hasLunch: boolean;
  isLunchPaid: boolean;
  lunchPrice: number;
  hasDinner: boolean;
  isDinnerPaid: boolean;
  dinnerPrice: number;
  hasSpa: boolean;
  isSpaPaid: boolean;
  spaPrice: number;
  hasPool: boolean;
  isPoolPaid: boolean;
  poolPrice: number;
  hasGym: boolean;
  isGymPaid: boolean;
  gymPrice: number;
  hasWiFi: boolean;
  isWiFiPaid: boolean;
  wiFiPrice: number;
  hasAirConditioning: boolean;
  isAirConditioningPaid: boolean;
  airConditioningPrice: number;
  hasAccessibilityFeatures: boolean;
  isAccessibilityFeaturesPaid: boolean;
  accessibilityFeaturesPrice: number;
  isPetFriendly: boolean;
  isPetFriendlyPaid: boolean;
  petFriendlyPrice: number;
  isActive: boolean;
}

export interface UpdateCustomCommodityDTO {
  name: string;
  hotelName: string;
  isPaid: boolean;
  price: number;
  description?: string;
  isActive: boolean;
}

export interface ComplaintDTO {
  complaintId: number;
  userId: number;
  hotelId: number;
  comment: string;
  createdAt: string;
  isActive: boolean;
}