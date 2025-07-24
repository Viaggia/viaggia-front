export interface Hotel {
  hotelId: number
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  description?: string
  starRating: number
  hasParking: boolean
  hasBreakfast: boolean
  hasLunch: boolean
  hasDinner: boolean
  hasSpa: boolean
  hasPool: boolean
  hasGym: boolean
  hasWiFi: boolean
  isPetFriendly: boolean
  checkInTime?: string
  checkOutTime?: string
  contactPhone?: string
  contactEmail?: string
  isActive: boolean
}