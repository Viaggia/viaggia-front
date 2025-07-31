import { MediaDTO } from "./Media";

export interface PackageDateDTO {
  packageDateId: number;
  startDate: string;
  endDate: string;
}

export interface PackageDTO {
  packageId: number;
  name: string;
  destination: string;
  description?: string;
  basePrice: number;
  hotelId: number;
  hotelName: string;
  isActive: boolean;
  medias: MediaDTO[];
  packageDates: PackageDateDTO[];
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
