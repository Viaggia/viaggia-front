export interface CreateAddressDTO {
  addressId: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isActive: boolean;
  hotelId: number;
}
