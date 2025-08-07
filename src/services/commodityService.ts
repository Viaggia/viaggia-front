import api from './api';
import { CreateCommoditieDTO } from '../types/Hotel';

export const createCommodities = async (data: CreateCommoditieDTO) => {
  const formData = new FormData();
  formData.append('HotelName', data.HotelName);

  // Mapeamento dos campos para PascalCase
  const fieldMap: Record<string, string> = {
    hasParking: 'HasParking',
    isParkingPaid: 'IsParkingPaid',
    parkingPrice: 'ParkingPrice',
    hasBreakfast: 'HasBreakfast',
    isBreakfastPaid: 'IsBreakfastPaid',
    breakfastPrice: 'BreakfastPrice',
    hasLunch: 'HasLunch',
    isLunchPaid: 'IsLunchPaid',
    lunchPrice: 'LunchPrice',
    hasDinner: 'HasDinner',
    isDinnerPaid: 'IsDinnerPaid',
    dinnerPrice: 'DinnerPrice',
    hasSpa: 'HasSpa',
    isSpaPaid: 'IsSpaPaid',
    spaPrice: 'SpaPrice',
    hasPool: 'HasPool',
    isPoolPaid: 'IsPoolPaid',
    poolPrice: 'PoolPrice',
    hasGym: 'HasGym',
    isGymPaid: 'IsGymPaid',
    gymPrice: 'GymPrice',
    hasWiFi: 'HasWiFi',
    isWiFiPaid: 'IsWiFiPaid',
    wiFiPrice: 'WiFiPrice',
    hasAirConditioning: 'HasAirConditioning',
    isAirConditioningPaid: 'IsAirConditioningPaid',
    airConditioningPrice: 'AirConditioningPrice',
    hasAccessibilityFeatures: 'HasAccessibilityFeatures',
    isAccessibilityFeaturesPaid: 'IsAccessibilityFeaturesPaid',
    accessibilityFeaturesPrice: 'AccessibilityFeaturesPrice',
    isPetFriendly: 'IsPetFriendly',
    isPetFriendlyPaid: 'IsPetFriendlyPaid',
    petFriendlyPrice: 'PetFriendlyPrice',
    isActive: 'IsActive'
  };

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'CustomCommodities' && fieldMap[key]) {
      formData.append(fieldMap[key], String(value));
    }
  });

  const response = await api.post('/api/Commodity', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

export const createCustomCommodity = async (data: {
  name: string;
  isPaid: boolean;
  price?: number;
  description?: string;
  isActive: boolean;
  hotelName: string;
}) => {
  const formData = new FormData();
  formData.append('Name', data.name);
  formData.append('IsPaid', String(data.isPaid));
  formData.append('Price', data.price ? String(data.price) : '0');
  formData.append('Description', data.description || '');
  formData.append('IsActive', String(data.isActive));
  formData.append('HotelName', data.hotelName);

  const response = await api.post('/api/CustomCommodity', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};