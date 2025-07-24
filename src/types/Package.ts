import { Media } from './Media'
import { PackageDate } from './PackageDate'
import { Reservation } from './Reservation'

export interface Package {
  packageId: number
  name?: string
  destination?: string
  description?: string
  basePrice: number
  isActive: boolean
  medias: Media[]
  packageDates: PackageDate[]
  reservations?: Reservation[]
}