import { Payment } from "./Payment"
import { Reservation } from "./Reservation"
import { UserRole } from "./UserRole"

export interface User {
  id: number
  name: string
  email: string
  password: string
  phoneNumber: string
  createDate: string
  isActive: boolean

  // CLIENT
  cpf?: string
  addressStreet?: string
  addressCity?: string
  addressState?: string
  addressZipCode?: string

  // SERVICE_PROVIDER
  companyName?: string
  cnpj?: string
  companyLegalName?: string

  // ATTENDANT
  employerCompanyName?: string
  employeeId?: string

  userRoles: UserRole[]
  reservations: Reservation[]
  payments: Payment[]
}