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