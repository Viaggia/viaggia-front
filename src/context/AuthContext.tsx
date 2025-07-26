import { createContext, useContext, useEffect, useState } from 'react'
import { getUserIdFromToken } from '../utils/jwt'
import { getUserById } from '../services/userService'
import { User } from '../types/User'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {} })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userId = getUserIdFromToken(token)
      if (userId) {
        getUserById(userId).then(setUser).catch(() => setUser(null))
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
