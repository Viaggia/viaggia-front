import { Role } from "./Role"
import { User } from "./User"

export interface UserRole {
  userId: number
  roleId: number
  user: User
  role: Role
}