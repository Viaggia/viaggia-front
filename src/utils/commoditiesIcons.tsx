import React from 'react';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import SpaIcon from '@mui/icons-material/Spa';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PetsIcon from '@mui/icons-material/Pets';
import { CreateCommoditieDTO } from '../types/Hotel';

export const comoditiesIcons: Partial<Record<keyof Omit<CreateCommoditieDTO, 'hotelName'>, React.ReactNode>> = {
  HasParking: <LocalParkingIcon fontSize="small" />,
  HasBreakfast: <BreakfastDiningIcon fontSize="small" />,
  HasLunch: <LunchDiningIcon fontSize="small" />,
  HasDinner: <DinnerDiningIcon fontSize="small" />,
  HasSpa: <SpaIcon fontSize="small" />,
  HasPool: <PoolIcon fontSize="small" />,
  HasGym: <FitnessCenterIcon fontSize="small" />,
  HasWiFi: <WifiIcon fontSize="small" />,
  HasAirConditioning: <AcUnitIcon fontSize="small" />,
  HasAccessibilityFeatures: <AccessibleIcon fontSize="small" />,
  IsPetFriendly: <PetsIcon fontSize="small" />,
};