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
  hasParking: <LocalParkingIcon fontSize="small" />,
  hasBreakfast: <BreakfastDiningIcon fontSize="small" />,
  hasLunch: <LunchDiningIcon fontSize="small" />,
  hasDinner: <DinnerDiningIcon fontSize="small" />,
  hasSpa: <SpaIcon fontSize="small" />,
  hasPool: <PoolIcon fontSize="small" />,
  hasGym: <FitnessCenterIcon fontSize="small" />,
  hasWiFi: <WifiIcon fontSize="small" />,
  hasAirConditioning: <AcUnitIcon fontSize="small" />,
  hasAccessibilityFeatures: <AccessibleIcon fontSize="small" />,
  isPetFriendly: <PetsIcon fontSize="small" />,
};