import { UserRole } from "./UserRole"

export interface Role {
  id: number
  name: string
  userRoles: UserRole[]
}